import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getCommunityKeywords } from "@/lib/seo/keyword-utils";

export const metadata = generateMetadata({
  title: "New Homes for Sale in Lehigh Acres, FL",
  description:
    "Homes for sale in Lehigh Acres, Florida — new construction east of Fort Myers. Census 2020 counted 114,287 residents. Buy or rent to own from M.J. Newell Homes.",
  canonical: `${SEO_CONFIG.siteUrl}/communities/lehigh-acres`,
  keywords: getCommunityKeywords("lehigh-acres"),
  openGraph: {
    title: "New Homes for Sale in Lehigh Acres, FL | M.J. Newell Homes",
    description:
      "Buy new construction homes for sale in Lehigh Acres, Florida. Quality builder near Fort Myers with flexible financing.",
    url: `${SEO_CONFIG.siteUrl}/communities/lehigh-acres`,
    type: "website",
  },
});

export default function LehighAcresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
