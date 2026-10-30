import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getCommunityKeywords } from "@/lib/seo/keyword-utils";

export const metadata = generateMetadata({
  title: "New Homes for Sale in LaBelle, FL",
  description: "New homes in LaBelle, Florida, on quarter-acre lots with no HOA. A small city on the Caloosahatchee, from $316,900. Buy or move in with $0 down.",
  canonical: `${SEO_CONFIG.siteUrl}/communities/labelle`,
  keywords: getCommunityKeywords("labelle"),
  openGraph: {
    title: "New Homes for Sale in LaBelle, FL | M.J. Newell Homes",
    description: "Quarter-acre lots and no HOA on our LaBelle homes. New construction from $316,900, on the Caloosahatchee.",
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
