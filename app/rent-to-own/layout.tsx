import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";
import { getLocalKeywords, getServiceKeywords } from "@/config/keywords";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { getRentToOwnPageJsonLd } from "@/lib/seo/rent-to-own-structured-data";

const RTO_OG_IMAGE = getCloudinaryImageUrl("/img/hero/1w5a1456-e5.webp");

export const metadata = generateMetadata({
  title: "Rent to Own Homes in Florida | $0 Down | M.J. Newell Homes",
  description:
    "Florida rent-to-own program with $0 down payment. New construction in LaBelle and Lehigh Acres. No credit check required to apply. Flexible plans—save while you live. Apply today.",
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
    title: "Rent to Own Homes in Florida | $0 Down | M.J. Newell Homes",
    description:
      "Florida rent-to-own homes: $0 down, LaBelle & Lehigh Acres new construction. No credit check required to apply. See plans and apply.",
    url: `${SEO_CONFIG.siteUrl}/rent-to-own`,
    type: "website",
    images: [
      {
        url: RTO_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Rent to own new construction homes in Florida — M.J. Newell Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rent to Own Homes in Florida | $0 Down | M.J. Newell Homes",
    description:
      "Florida rent-to-own program: $0 down, LaBelle & Lehigh Acres. Apply without a credit check to get started.",
    images: [RTO_OG_IMAGE],
  },
});

export default function RentToOwnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredDataComponent data={getRentToOwnPageJsonLd()} />
      {children}
    </>
  );
}
