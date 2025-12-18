import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Rent to Own Program | $0 Down Payment | M.J. Newell Homes",
  description: "Rent to Own program with $0 down payment. Build equity while you live. Flexible 1-5 year plans. No credit check required. Available in LaBelle and Lehigh Acres, Florida.",
  canonical: `${SEO_CONFIG.siteUrl}/rent-to-own`,
  keywords: [
    "rent to own",
    "rent to own program",
    "$0 down payment",
    "rent to own Florida",
    "rent to own homes",
    "rent to own houses",
    "no credit check",
    "build equity",
    "rent to own LaBelle",
    "rent to own Lehigh Acres",
    "rent to own Fort Myers",
    "rent to own Cape Coral",
    "rent to own Naples",
    "rent to own near Miami",
    "rent to own Southwest Florida",
  ],
  openGraph: {
    title: "Rent to Own Program | $0 Down Payment | M.J. Newell Homes",
    description: "Rent to Own program with $0 down payment. Build equity while you live. Flexible 1-5 year plans. No credit check required.",
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
