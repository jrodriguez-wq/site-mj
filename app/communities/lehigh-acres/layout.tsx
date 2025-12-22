import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getCommunityKeywords } from "@/lib/seo/keyword-utils";

export const metadata: Metadata = generateSEOMetadata({
  title: "Lehigh Acres, Florida | New Homes & Rent to Own | M.J. Newell Homes",
  description: "Discover new construction homes in Lehigh Acres, Florida. Beautiful beaches, entertainment, and nature activities. Rent to Own program available. $0 down payment.",
  canonical: `${SEO_CONFIG.siteUrl}/communities/lehigh-acres`,
  keywords: [
    ...getCommunityKeywords("lehigh-acres"),
    "Lee County homes",
    "family homes Lehigh Acres",
  ],
  openGraph: {
    title: "Lehigh Acres, Florida | New Homes & Rent to Own | M.J. Newell Homes",
    description: "Discover new construction homes in Lehigh Acres, Florida. Beautiful beaches, entertainment, and nature activities.",
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
