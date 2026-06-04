import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getPageKeywords } from "@/lib/seo/keyword-utils";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { getHomeSalesPageJsonLd } from "@/lib/seo/home-sales-structured-data";

const SALES_OG_IMAGE = getCloudinaryImageUrl("/img/hero/1w5a0741-1.webp");

export const metadata = generateMetadata({
  title: "New Construction Homes for Sale in Florida",
  description:
    "Buy new construction homes for sale in LaBelle and Lehigh Acres, Florida. Seven floor plans from M.J. Newell Homes — transparent pricing, quality builder, flexible financing including Rent to Own.",
  canonical: `${SEO_CONFIG.siteUrl}/new-homes-for-sale`,
  keywords: getPageKeywords("sales"),
  openGraph: {
    title: "New Construction Homes for Sale | M.J. Newell Homes",
    description:
      "New homes for sale in Southwest Florida. Buy in LaBelle or Lehigh Acres — 7 models, homes from $316,900. Schedule a visit today.",
    url: `${SEO_CONFIG.siteUrl}/new-homes-for-sale`,
    type: "website",
    images: [
      {
        url: SALES_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "New construction homes for sale in Florida — M.J. Newell Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Construction Homes for Sale | M.J. Newell Homes",
    description: "Buy new homes in LaBelle & Lehigh Acres, FL. 7 floor plans for sale.",
    images: [SALES_OG_IMAGE],
  },
});

export default function NewHomesForSaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredDataComponent data={getHomeSalesPageJsonLd()} />
      {children}
    </>
  );
}
