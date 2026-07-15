import assert from "node:assert/strict";
import test from "node:test";

import contactInquiry, { config } from "../netlify/functions/contact-inquiry.mjs";

const validLead = {
  fullName: "QA Browser",
  phoneNumber: "+91 99999 99999",
  emailAddress: "qa-browser@example.invalid",
  companyName: "ParkTek QA",
  city: "Noida",
  requirement: "Residential",
  gates: "2",
  parkingCapacity: "150",
  existingEquipment: "Boom barrier and RFID reader",
  timeline: "Within 30 days",
  message: "Synthetic adapter test submission for validation only.",
  consent: true,
  website: "",
  source: "Automated adapter test",
};

function request(body) {
  return new Request("https://parktek.in/api/contact-inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("contact adapter has a per-IP Netlify rate limit", () => {
  assert.equal(config.path, "/api/contact-inquiry");
  assert.equal(config.rateLimit.windowLimit, 5);
  assert.deepEqual(config.rateLimit.aggregateBy, ["ip", "domain"]);
});

test("contact adapter rejects bypassed client validation", async () => {
  const response = await contactInquiry(request({ ...validLead, city: "", consent: false }));
  const payload = await response.json();

  assert.equal(response.status, 422);
  assert.ok(payload.errors.some((error) => error.field === "city"));
  assert.ok(payload.errors.some((error) => error.field === "consent"));
});

test("contact adapter rejects non-object JSON without throwing", async () => {
  for (const body of [null, [], "not an enquiry"]) {
    const response = await contactInquiry(request(body));
    const payload = await response.json();

    assert.equal(response.status, 422);
    assert.match(payload.message, /JSON object/i);
  }
});

test("contact adapter never reports success without an upstream", async () => {
  delete process.env.CONTACT_INQUIRY_API_URL;
  const response = await contactInquiry(request(validLead));
  const payload = await response.json();

  assert.equal(response.status, 503);
  assert.match(payload.message, /not configured/i);
});

test("contact adapter records consent and forwards the legacy Kendra contract", async () => {
  const originalFetch = globalThis.fetch;
  let forwarded;
  process.env.CONTACT_INQUIRY_API_URL = "https://backend.example/api/contact-inquiries";

  globalThis.fetch = async (url, options) => {
    forwarded = { url, options, body: JSON.parse(options.body) };
    return Response.json({ message: "Accepted for QA." }, { status: 200 });
  };

  try {
    const response = await contactInquiry(request(validLead));
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.message, "Accepted for QA.");
    assert.equal(forwarded.url, "https://backend.example/api/contact-inquiries");
    assert.equal(forwarded.options.headers.Origin, "https://parktek.in");
    assert.deepEqual(Object.keys(forwarded.body).sort(), [
      "companyName",
      "emailAddress",
      "fullName",
      "phoneNumber",
      "projectContext",
    ]);
    assert.match(forwarded.body.projectContext, /Contact consent: Yes/);
    assert.match(forwarded.body.projectContext, /Requirement: Residential/);
    assert.match(forwarded.body.projectContext, /City: Noida/);
  } finally {
    globalThis.fetch = originalFetch;
    delete process.env.CONTACT_INQUIRY_API_URL;
  }
});
