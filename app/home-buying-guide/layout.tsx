import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Home Buying Guide | Step-by-Step Process | M.J. Newell Homes",
  description: "Complete guide to buying a new home. Learn the step-by-step process from application to move-in. Expert tips for first-time homebuyers. Rent to Own program explained.",
  canonical: `${SEO_CONFIG.siteUrl}/home-buying-guide`,
  keywords: [
    "home buying guide",
    "how to buy a home",
    "first time home buyer",
    "home buying process",
    "buying a new home",
    "home buyer guide",
    "rent to own guide",
  ],
  openGraph: {
    title: "Home Buying Guide | M.J. Newell Homes",
    description: "Complete guide to buying a new home. Learn the step-by-step process from application to move-in.",
    url: `${SEO_CONFIG.siteUrl}/home-buying-guide`,
    type: "website",
  },
});

export default function HomeBuyingGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

