import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getPageKeywords } from "@/lib/seo/keyword-utils";
import { HomePageContent } from "@/components/home/home-page-content";

const homepageKeywords = getPageKeywords("home");

export const metadata = generateMetadata({
  title: "New Homes for Sale in Florida",
  description:
    "New homes in LaBelle and Lehigh Acres, Florida, from $316,900. No state income tax, and rent-to-own with $0 down to move in. M.J. Newell Homes.",
  canonical: SEO_CONFIG.siteUrl,
  keywords: homepageKeywords,
  openGraph: {
    title: "New Homes for Sale in Florida | M.J. Newell Homes",
    description:
      "New construction homes in LaBelle and Lehigh Acres from $316,900. No Florida state income tax. Rent-to-own with $0 down to move in.",
    url: SEO_CONFIG.siteUrl,
    type: "website",
    images: [
      {
        url: SEO_CONFIG.ogImage.startsWith("http")
          ? SEO_CONFIG.ogImage
          : `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: "M.J. Newell Homes — new construction homes for sale in Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Homes for Sale in Florida | M.J. Newell Homes",
    description:
      "New construction homes for sale in LaBelle & Lehigh Acres. Buy or Rent to Own. 1,500+ homes built.",
    images: [
      SEO_CONFIG.ogImage.startsWith("http")
        ? SEO_CONFIG.ogImage
        : `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
    ],
  },
});

export default function HomePage() {
  return <HomePageContent />;
}
