import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getPageKeywords } from "@/lib/seo/keyword-utils";

export const metadata: Metadata = generateSEOMetadata({
  title: "Rent to Own Program | $0 Down Payment | M.J. Newell Homes",
  description: "An exclusive program designed to help YOU become a homeowner. Rent to Own with $0 down payment. Build equity while you live. Flexible 1-5 year plans. No credit check required. Available in LaBelle and Lehigh Acres, Florida.",
  canonical: `${SEO_CONFIG.siteUrl}/rent-to-own`,
  keywords: getPageKeywords("rent-to-own"),
  openGraph: {
    title: "Rent to Own Program | $0 Down Payment | M.J. Newell Homes",
    description: "An exclusive program designed to help YOU become a homeowner. Rent to Own with $0 down payment. Build equity while you live. Flexible 1-5 year plans. No credit check required.",
    url: `${SEO_CONFIG.siteUrl}/rent-to-own`,
    type: "website",
  },
});

export default function RentToOwnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
