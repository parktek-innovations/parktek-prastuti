import assert from "node:assert/strict";
import test from "node:test";

import { contactQueryContext } from "../lib/contact-query-context.mjs";

test("FASTag query context prefills the contact enquiry", () => {
  const context = contactQueryContext("service=fastag&vehicle=UP16AB1234");

  assert.deepEqual(context, {
    message: "Service: FASTag enquiry\nVehicle registration number: UP16AB1234",
    requirement: "Support",
    source: "FASTag enquiry",
  });
});

test("E-Challan query context preserves vehicle and optional reference", () => {
  const context = contactQueryContext("service=e-challan&vehicle=DL01AA0001&challan=CH-2026-42");

  assert.deepEqual(context, {
    message: "Service: E-Challan enquiry\nVehicle registration number: DL01AA0001\nChallan reference: CH-2026-42",
    requirement: "Support",
    source: "E-Challan enquiry",
  });
});

test("contact query context rejects unknown services and normalizes controls", () => {
  assert.equal(contactQueryContext("service=unknown&vehicle=UP16AB1234"), null);
  assert.equal(
    contactQueryContext("service=fastag&vehicle=%20UP16%0AAB1234%20").message,
    "Service: FASTag enquiry\nVehicle registration number: UP16 AB1234"
  );
});
