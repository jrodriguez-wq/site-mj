import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Lehigh Acres, Florida | New Homes & Rent to Own | M.J. Newell Homes",
  description: "Discover new construction homes in Lehigh Acres, Florida. Beautiful beaches, entertainment, and nature activities. Rent to Own program available. $0 down payment.",
  canonical: `${SEO_CONFIG.siteUrl}/communities/lehigh-acres`,
  keywords: [
    "Lehigh Acres Florida homes",
    "new homes Lehigh Acres",
    "Lehigh Acres real estate",
    "rent to own Lehigh Acres",
    "new construction Lehigh Acres",
    "Lehigh Acres Florida",
    "homes for sale Lehigh Acres",
    "family homes Lehigh Acres",
    "homes near Fort Myers",
    "homes near Cape Coral",
    "homes near Miami",
    "Southwest Florida homes",
    "Lee County homes",
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
