import { generateSchema, SchemaOptions } from "@/lib/schema-generator";

interface SchemaRendererProps {
  schema: SchemaOptions;
}

export function SchemaRenderer({ schema }: SchemaRendererProps) {
  const jsonLd = generateSchema(schema);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
