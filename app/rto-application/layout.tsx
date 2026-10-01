import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getLocalKeywords, getServiceKeywords } from "@/config/keywords";

export const metadata = generateMetadata({
  title: "RTO Application | Rent to Own Application | M.J. Newell Homes",
  description: "Apply for our Rent to Own program. Complete the application form and we'll review your submission. No credit check required for initial application. LaBelle & Lehigh Acres, Florida.",
  canonical: `${SEO_CONFIG.siteUrl}/rto-application`,
  keywords: [
    ...getLocalKeywords().filter((k) => k.includes("rent to own") || k.includes("rent-to-own")),
    ...getServiceKeywords().filter((k) => k.includes("rent") || k.includes("RTO")),
    "rent to own application",
    "RTO application",
    "apply rent to own",
    "rent to own form",
    "Florida RTO application",
  ],
  openGraph: {
    title: "RTO Application | M.J. Newell Homes",
    description: "Apply for our Rent to Own program. Complete the application form and we'll review your submission.",
    url: `${SEO_CONFIG.siteUrl}/rto-application`,
    type: "website",
  },
});

export default function RtoApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
