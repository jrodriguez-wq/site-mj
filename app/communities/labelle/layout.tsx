import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getLocalKeywords } from "@/config/keywords";

export const metadata = generateMetadata({
  title: "LaBelle, Florida | New Homes & Communities | M.J. Newell Homes",
  description: "Discover new construction homes in LaBelle, Florida. Beautiful community with acre lots, no HOA fees, and family-friendly neighborhoods. View available home models and schedule a visit. Starting from $200,000.",
  canonical: `${SEO_CONFIG.siteUrl}/communities/labelle`,
  keywords: [
    ...getLocalKeywords().filter(k => k.toLowerCase().includes("labelle")),
    "LaBelle Florida homes",
    "new homes LaBelle",
    "LaBelle new construction",
    "LaBelle home builder",
    "homes for sale LaBelle",
    "LaBelle communities",
    "LaBelle real estate",
    "LaBelle new homes",
    "LaBelle home models",
    "LaBelle Florida builder",
  ],
  openGraph: {
    title: "LaBelle, Florida | New Homes & Communities | M.J. Newell Homes",
    description: "Discover new construction homes in LaBelle, Florida. Beautiful community with acre lots, no HOA fees, and family-friendly neighborhoods.",
    url: `${SEO_CONFIG.siteUrl}/communities/labelle`,
    type: "website",
  },
});

export default function LaBelleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
