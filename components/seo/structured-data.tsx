import { StructuredData } from "@/types/seo";

interface StructuredDataProps {
  data: StructuredData | StructuredData[];
}

export const StructuredDataComponent = ({ data }: StructuredDataProps) => {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          suppressHydrationWarning
        />
      ))}
    </>
  );
};

