import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getLocalKeywords, getServiceKeywords } from "@/config/keywords";

export const metadata = generateMetadata({
  title: "Home Models | New Construction Homes | M.J. Newell Homes",
  description: "Browse our complete collection of new construction home models in LaBelle and Lehigh Acres, Florida. From 2 to 5 bedrooms, find your perfect home. Starting from $200,000. View floor plans, photos, and pricing.",
  canonical: `${SEO_CONFIG.siteUrl}/models`,
  keywords: [
    ...getLocalKeywords().slice(0, 20),
    ...getServiceKeywords().slice(0, 15),
    "home models",
    "new construction models",
    "home floor plans",
    "house models Florida",
    "new home designs",
    "home builder models",
    "custom home models",
    "affordable home models",
  ],
  openGraph: {
    title: "Home Models | M.J. Newell Homes",
    description: "Browse our complete collection of new construction home models in LaBelle and Lehigh Acres, Florida.",
    url: `${SEO_CONFIG.siteUrl}/models`,
    type: "website",
  },
});

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
