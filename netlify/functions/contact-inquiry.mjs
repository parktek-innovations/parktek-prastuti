import {
  buildProjectContext,
  validateLead,
} from "../../lib/lead-form-contract.mjs";

export const config = {
  path: "/api/contact-inquiry",
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};

function jsonResponse(status, body) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function upstreamUrl() {
  const value = process.env.CONTACT_INQUIRY_API_URL;
  if (!value) return null;
  const url = new URL(value);
  if (!/^https?:$/.test(url.protocol)) throw new Error("Unsupported contact endpoint protocol.");
  return url.toString();
}

export default async function contactInquiry(request) {
  if (request.method !== "POST") {
    return jsonResponse(405, { message: "Method not allowed." });
  }

  let values;
  try {
    values = await request.json();
  } catch {
    return jsonResponse(400, { message: "Send a valid JSON request." });
  }

  if (!values || typeof values !== "object" || Array.isArray(values)) {
    return jsonResponse(422, { message: "Send the enquiry fields as a JSON object." });
  }

  if (values.website) {
    return jsonResponse(400, { message: "Unable to accept this request." });
  }

  const errors = validateLead(values);
  if (Object.keys(errors).length) {
    return jsonResponse(422, {
      message: "Review the highlighted fields and try again.",
      errors: Object.entries(errors).map(([field, message]) => ({ field, message })),
    });
  }

  const submittedAt = new Date();
  const upstreamPayload = {
    fullName: values.fullName.trim(),
    phoneNumber: values.phoneNumber.trim(),
    emailAddress: values.emailAddress.trim(),
    companyName: values.companyName.trim(),
    projectContext: buildProjectContext(values, values.source, submittedAt),
  };

  let endpoint;
  try {
    endpoint = upstreamUrl();
  } catch {
    return jsonResponse(503, {
      message: "The enquiry service is not configured correctly. Please email support@parktek.in.",
    });
  }

  if (!endpoint) {
    return jsonResponse(503, {
      message: "The enquiry service is not configured. Please email support@parktek.in.",
    });
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: process.env.PUBLIC_SITE_ORIGIN || "https://parktek.in",
      },
      body: JSON.stringify(upstreamPayload),
      signal: AbortSignal.timeout(10000),
    });
    const payload = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      return jsonResponse(upstream.status, {
        message: payload?.message || "The enquiry service could not accept this request.",
        errors: Array.isArray(payload?.errors) ? payload.errors : undefined,
      });
    }

    return jsonResponse(200, {
      message: payload?.message || "Your request was received. The ParkTek team will follow up shortly.",
    });
  } catch {
    return jsonResponse(502, {
      message: "We could not reach the enquiry service. Please try again or email support@parktek.in.",
    });
  }
}
