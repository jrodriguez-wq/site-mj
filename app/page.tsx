import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata = generateMetadata({
  title: "M.J. Newell Homes | New Construction Homes in Florida | Rent to Own $0 Down",
  description: "Building American Homes in South Florida. New construction homes in LaBelle and Lehigh Acres. Rent to Own program with $0 down payment. 1,500+ homes built. Pioneers in Rent to Own.",
  canonical: SEO_CONFIG.siteUrl,
  keywords: [
    "M.J. Newell Homes",
    "new homes Florida",
    "rent to own Florida",
    "new construction homes",
    "LaBelle Florida homes",
    "Lehigh Acres Florida homes",
    "Fort Myers homes",
    "Cape Coral homes",
    "Naples homes",
    "Miami area homes",
    "homes near Miami",
    "homes near Fort Myers",
    "$0 down payment",
    "rent to own program",
    "Southwest Florida homes",
    "South Florida home builder",
  ],
  openGraph: {
    title: "M.J. Newell Homes | New Construction Homes in Florida",
    description: "Building American Homes in South Florida. Rent to Own program with $0 down payment. 1,500+ homes built.",
    url: SEO_CONFIG.siteUrl,
    type: "website",
  },
});

export default function HomePage() {
  return <HomePageContent />;
}
