import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "LaBelle, Florida | New Homes & Rent to Own | M.J. Newell Homes",
  description: "Discover new construction homes in LaBelle, Florida. Family-friendly community with fishing, boating, and nature trails. Rent to Own program available. $0 down payment.",
  canonical: `${SEO_CONFIG.siteUrl}/communities/labelle`,
  keywords: [
    "LaBelle Florida homes",
    "new homes LaBelle",
    "LaBelle real estate",
    "rent to own LaBelle",
    "new construction LaBelle",
    "LaBelle Florida",
    "homes for sale LaBelle",
    "Caloosahatchee River",
    "family homes LaBelle",
    "homes near Fort Myers",
    "homes near Cape Coral",
    "homes near Miami",
    "Southwest Florida homes",
    "Hendry County homes",
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
