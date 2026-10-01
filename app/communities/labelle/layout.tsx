import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getCommunityKeywords } from "@/lib/seo/keyword-utils";

export const metadata = generateMetadata({
  title: "New Homes for Sale in LaBelle, FL",
  description: "Homes for sale in LaBelle, Florida — new construction from M.J. Newell Homes. Six floor plans, lots with space, no HOA on many homes. Buy or Rent to Own. Starting from $316,900.",
  canonical: `${SEO_CONFIG.siteUrl}/communities/labelle`,
  keywords: getCommunityKeywords("labelle"),
  openGraph: {
    title: "New Homes for Sale in LaBelle, FL | M.J. Newell Homes",
    description: "Buy new construction homes for sale in LaBelle, Florida. Six models, acre lots, no HOA fees on many homes.",
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
