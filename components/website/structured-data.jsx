function serialize(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
export default function StructuredData({ data }) {
  const entries = (Array.isArray(data) ? data : [data]).filter(Boolean);

  return entries.map((entry, index) => (
    <script
      key={entry["@id"] || `${entry["@type"]}-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(entry) }}
    />
  ));
}
