import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getPriorityKeywords, getLocalKeywords, getServiceKeywords } from "@/config/keywords";
import { HomePageContent } from "@/components/home/home-page-content";

// Combinar keywords prioritarias, locales y de servicios para la homepage
const homepageKeywords = [
  ...getPriorityKeywords(),
  ...getLocalKeywords().slice(0, 30), // Primeras 30 keywords locales
  ...getServiceKeywords().slice(0, 20), // Primeras 20 keywords de servicios
];

export const metadata = generateMetadata({
  title: "M.J. Newell Homes | New Construction Homes in Florida | Rent to Own $0 Down",
  description: "Building American Homes in South Florida. New construction homes in LaBelle and Lehigh Acres. Rent to Own program with $0 down payment. 1,500+ homes built. Pioneers in Rent to Own. Best home builder in Southwest Florida.",
  canonical: SEO_CONFIG.siteUrl,
  keywords: homepageKeywords,
  openGraph: {
    title: "M.J. Newell Homes | New Construction Homes in Florida | Rent to Own $0 Down",
    description: "Building American Homes in South Florida. New construction homes in LaBelle and Lehigh Acres. Rent to Own program with $0 down payment. 1,500+ homes built. Best home builder in Southwest Florida.",
    url: SEO_CONFIG.siteUrl,
    type: "website",
  },
});

export default function HomePage() {
  return <HomePageContent />;
}
