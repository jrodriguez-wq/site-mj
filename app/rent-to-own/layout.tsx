import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getLocalKeywords, getServiceKeywords } from "@/config/keywords";

export const metadata = generateMetadata({
  title: "Rent to Own Homes | $0 Down Payment | M.J. Newell Homes",
  description: "Rent to Own program with $0 down payment. Own your dream home in LaBelle and Lehigh Acres, Florida. No credit check required. Flexible 1-5 year plans. Save while you live. Apply today!",
  canonical: `${SEO_CONFIG.siteUrl}/rent-to-own`,
  keywords: [
    ...getLocalKeywords().filter(k => k.includes("rent to own") || k.includes("rent-to-own")),
    ...getServiceKeywords().filter(k => k.includes("rent") || k.includes("RTO")),
    "rent to own homes",
    "rent to own program",
    "rent to own Florida",
    "rent to own no credit check",
    "rent to own $0 down",
    "rent to own LaBelle",
    "rent to own Lehigh Acres",
    "rent to own Southwest Florida",
    "rent to own homes Florida",
    "rent to own program Florida",
    "rent to own application",
    "rent to own process",
  ],
  openGraph: {
    title: "Rent to Own Homes | $0 Down Payment | M.J. Newell Homes",
    description: "Rent to Own program with $0 down payment. Own your dream home in LaBelle and Lehigh Acres, Florida. No credit check required.",
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
