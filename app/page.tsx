import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getPriorityKeywords, getLocalKeywords, getServiceKeywords } from "@/config/keywords";
import { HomePageContent } from "@/components/home/home-page-content";

// Combinar keywords prioritarias, locales y de servicios para la homepage
// Optimizado para Top 5 en Google - Keywords más importantes primero
const homepageKeywords = [
  // Keywords de máxima prioridad para Top 5
  "home builder Florida",
  "new homes Florida",
  "rent to own Florida",
  "buy house Florida",
  "real estate Florida",
  "new construction Florida",
  "home builder Miami",
  "new homes Miami",
  "rent to own Miami",
  "buy house Miami",
  "home builder LaBelle",
  "new homes LaBelle",
  "rent to own LaBelle",
  "buy house LaBelle",
  "constructora Florida",
  "constructora Miami",
  "comprar casa Florida",
  "comprar casa Miami",
  "comprar casa LaBelle",
  // Keywords prioritarias del sistema
  ...getPriorityKeywords().slice(0, 50),
  // Keywords locales más importantes
  ...getLocalKeywords().slice(0, 40),
  // Keywords de servicios más importantes
  ...getServiceKeywords().slice(0, 30),
];

export const metadata = generateMetadata({
  // Root layout title.template adds " | M.J. Newell Homes" — do not repeat brand here
  title: "Florida Builder & Rent to Own $0 Down",
  description:
    "New construction and rent-to-own homes in LaBelle & Lehigh Acres, Florida. $0 down program. Southwest Florida home builder—1,500+ homes built.",
  canonical: SEO_CONFIG.siteUrl,
  keywords: homepageKeywords,
  openGraph: {
    title: "Florida Builder & Rent to Own $0 Down | M.J. Newell Homes",
    description:
      "LaBelle & Lehigh Acres new construction and rent to own with $0 down. Trusted Florida home builder, 1,500+ homes built.",
    url: SEO_CONFIG.siteUrl,
    type: "website",
    images: [
      {
        url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: "M.J. Newell Homes — new construction and rent to own in Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Builder & Rent to Own $0 Down | M.J. Newell Homes",
    description:
      "New construction & rent to own in LaBelle & Lehigh Acres, FL. $0 down. 1,500+ homes built.",
    images: [`${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`],
  },
});

export default function HomePage() {
  return <HomePageContent />;
}
