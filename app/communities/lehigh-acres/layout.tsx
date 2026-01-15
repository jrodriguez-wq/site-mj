import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getLocalKeywords } from "@/config/keywords";

export const metadata = generateMetadata({
  title: "Lehigh Acres, Florida | New Homes & Communities | M.J. Newell Homes",
  description: "Discover new construction homes in Lehigh Acres, Florida. Growing community with affordable housing options. View available home models and schedule a visit. Starting from $200,000.",
  canonical: `${SEO_CONFIG.siteUrl}/communities/lehigh-acres`,
  keywords: [
    ...getLocalKeywords().filter(k => k.toLowerCase().includes("lehigh")),
    "Lehigh Acres Florida homes",
    "new homes Lehigh Acres",
    "Lehigh Acres new construction",
    "Lehigh Acres home builder",
    "homes for sale Lehigh Acres",
    "Lehigh Acres communities",
    "Lehigh Acres real estate",
    "Lehigh Acres new homes",
    "Lehigh Acres home models",
    "Lehigh Acres Florida builder",
  ],
  openGraph: {
    title: "Lehigh Acres, Florida | New Homes & Communities | M.J. Newell Homes",
    description: "Discover new construction homes in Lehigh Acres, Florida. Growing community with affordable housing options.",
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
