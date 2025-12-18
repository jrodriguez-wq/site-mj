import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { WarrantyPageContent } from "@/components/warranty/warranty-page-content";

export const metadata = generateMetadata({
  title: "Warranty & Service | 10-Year Structural Warranty | M.J. Newell Homes",
  description: "Comprehensive warranty coverage for M.J. Newell Homes. 10-year structural warranty and 1-year mechanical warranty. Submit warranty or service requests. Response within 48 hours.",
  canonical: `${SEO_CONFIG.siteUrl}/warranty`,
  keywords: [
    "home warranty",
    "structural warranty",
    "new home warranty",
    "home builder warranty",
    "warranty service",
    "home maintenance",
    "Florida home warranty",
  ],
  openGraph: {
    title: "Warranty & Service | M.J. Newell Homes",
    description: "Comprehensive warranty coverage: 10-year structural warranty and 1-year mechanical warranty. Response within 48 hours.",
    url: `${SEO_CONFIG.siteUrl}/warranty`,
    type: "website",
  },
});

export default function WarrantyPage() {
  return <WarrantyPageContent />;
}
