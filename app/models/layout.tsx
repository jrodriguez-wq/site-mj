import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Home Models | Browse All Floor Plans | M.J. Newell Homes",
  description: "Browse all our home models and floor plans. Louisiana, Viana, Delanie, Aurora, Langdon, Emelia, and Duplex models. Prices, square footage, bedrooms, and bathrooms. Rent to Own available.",
  canonical: `${SEO_CONFIG.siteUrl}/models`,
  keywords: [
    "home models",
    "floor plans",
    "home designs",
    "house plans",
    "new home models",
    "home floor plans Florida",
    "home designs Florida",
  ],
  openGraph: {
    title: "Home Models | M.J. Newell Homes",
    description: "Browse all our home models and floor plans. Multiple models available with Rent to Own program.",
    url: `${SEO_CONFIG.siteUrl}/models`,
    type: "website",
  },
});

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
