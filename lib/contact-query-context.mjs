const SERVICE_CONTEXT = {
  fastag: {
    label: "FASTag enquiry",
    source: "FASTag enquiry",
  },
  "e-challan": {
    label: "E-Challan enquiry",
    source: "E-Challan enquiry",
  },
};

function cleanQueryValue(value, maximumLength) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maximumLength);
}

export function contactQueryContext(input) {
  const params = input instanceof URLSearchParams
    ? input
    : new URLSearchParams(typeof input === "string" ? input : "");
  const service = cleanQueryValue(params.get("service"), 40).toLowerCase();
  const context = SERVICE_CONTEXT[service];

  if (!context) return null;

  const vehicle = cleanQueryValue(params.get("vehicle"), 80);
  const lines = [
    `Service: ${context.label}`,
    `Vehicle registration number: ${vehicle || "Not provided"}`,
  ];

  if (service === "e-challan") {
    const challan = cleanQueryValue(params.get("challan"), 120);
    lines.push(`Challan reference: ${challan || "Not provided"}`);
  }

  return {
    message: lines.join("\n"),
    requirement: "Support",
    source: context.source,
  };
}
