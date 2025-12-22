import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getCommunityKeywords } from "@/lib/seo/keyword-utils";

export const metadata: Metadata = generateSEOMetadata({
  title: "LaBelle, Florida | New Homes & Rent to Own | M.J. Newell Homes",
  description: "Discover new construction homes in LaBelle, Florida. Family-friendly community with fishing, boating, and nature trails. Rent to Own program available. $0 down payment.",
  canonical: `${SEO_CONFIG.siteUrl}/communities/labelle`,
  keywords: [
    ...getCommunityKeywords("labelle"),
    "Caloosahatchee River",
    "Hendry County homes",
    "family homes LaBelle",
  ],
  openGraph: {
    title: "LaBelle, Florida | New Homes & Rent to Own | M.J. Newell Homes",
    description: "Discover new construction homes in LaBelle, Florida. Family-friendly community with fishing, boating, and nature trails.",
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
