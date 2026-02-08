import type { Metadata } from "next";
import { SEO_CONFIG, ROBOTS_CONFIG } from "./config";
import { CONTACT_INFO, SOCIAL_LINKS } from "./contact";
import { getAllKeywords } from "../keywords";

const KEYWORDS = getAllKeywords();

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  title: {
    default: SEO_CONFIG.siteName,
    template: `%s | ${SEO_CONFIG.siteName}`,
  },
  description: SEO_CONFIG.siteDescription,
  keywords: KEYWORDS as unknown as string[],
  authors: [{ name: SEO_CONFIG.siteName, url: SEO_CONFIG.siteUrl }],
  creator: SEO_CONFIG.siteName,
  publisher: SEO_CONFIG.siteName,
  openGraph: {
    type: "website",
    locale: SEO_CONFIG.locale,
    url: SEO_CONFIG.siteUrl,
    title: SEO_CONFIG.siteName,
    description: SEO_CONFIG.siteDescription,
    siteName: SEO_CONFIG.siteName,
    images: [
      { url: SEO_CONFIG.ogImage, width: 1200, height: 630, alt: SEO_CONFIG.siteName },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.siteName,
    description: SEO_CONFIG.siteDescription,
    images: [SEO_CONFIG.ogImage],
    creator: SOCIAL_LINKS.twitterHandle,
    site: SOCIAL_LINKS.twitterHandle,
  },
  robots: ROBOTS_CONFIG,
  alternates: {
    canonical: SEO_CONFIG.siteUrl,
    languages: { en: SEO_CONFIG.siteUrl, "x-default": SEO_CONFIG.siteUrl },
  },
  icons: {
    icon: [
      { url: SEO_CONFIG.favicon, sizes: "any" },
      { url: SEO_CONFIG.favicon16, sizes: "16x16", type: "image/png" },
      { url: SEO_CONFIG.favicon32, sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: SEO_CONFIG.appleTouchIcon, sizes: "180x180", type: "image/png" }],
    shortcut: SEO_CONFIG.favicon16,
  },
  manifest: SEO_CONFIG.manifest,
  category: "Real Estate",
  classification: "Home Builder",
  other: {
    "geo.region": "US-FL",
    "geo.placename": "LaBelle, Lehigh Acres, Fort Myers, Cape Coral, Naples, Miami, Florida",
    "geo.position": `${CONTACT_INFO.coordinates.latitude};${CONTACT_INFO.coordinates.longitude}`,
    "ICBM": `${CONTACT_INFO.coordinates.latitude}, ${CONTACT_INFO.coordinates.longitude}`,
    "geo.region.name": "Florida",
    "geo.region.code": "US-FL",
    "business.contact_data.locality": "LaBelle",
    "business.contact_data.region": "FL",
    "business.contact_data.country_name": "United States",
  },
};
