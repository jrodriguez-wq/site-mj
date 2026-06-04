import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getPageKeywords } from "@/lib/seo/keyword-utils";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { generateModelsItemListSchema } from "@/lib/seo/models-structured-data";

export const metadata = generateMetadata({
  title: "New Homes for Sale | Floor Plans LaBelle & Lehigh Acres",
  description:
    "Browse new construction homes for sale in LaBelle and Lehigh Acres, Florida. Seven floor plans from $316,900. Buy your new home from M.J. Newell Homes — photos, pricing, and features.",
  canonical: `${SEO_CONFIG.siteUrl}/models`,
  keywords: getPageKeywords("models"),
  openGraph: {
    title: "New Homes for Sale | M.J. Newell Homes",
    description:
      "New construction homes for sale in LaBelle & Lehigh Acres. Louisiana, Viana, Langdon, and more — view floor plans and pricing.",
    url: `${SEO_CONFIG.siteUrl}/models`,
    type: "website",
  },
});

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredDataComponent data={[generateModelsItemListSchema()]} />
      {children}
    </>
  );
}
