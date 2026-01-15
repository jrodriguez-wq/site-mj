import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getLocalKeywords, getServiceKeywords } from "@/config/keywords";

export const metadata = generateMetadata({
  title: "Home Buying Guide | Step-by-Step Guide | M.J. Newell Homes",
  description: "Complete guide to buying a new home in Florida. Learn the home buying process step-by-step. From pre-qualification to closing. Expert tips from M.J. Newell Homes, Southwest Florida's trusted home builder.",
  canonical: `${SEO_CONFIG.siteUrl}/home-buying-guide`,
  keywords: [
    ...getServiceKeywords().filter(k => k.includes("buy") || k.includes("purchase") || k.includes("guide")),
    "home buying guide",
    "how to buy a home",
    "home buying process",
    "buying a new home",
    "first time home buyer guide",
    "home buying steps",
    "home buying tips",
    "Florida home buying guide",
    "new home buying process",
    "home purchase guide",
    "buying a house guide",
  ],
  openGraph: {
    title: "Home Buying Guide | M.J. Newell Homes",
    description: "Complete guide to buying a new home in Florida. Learn the home buying process step-by-step from Southwest Florida's trusted home builder.",
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
