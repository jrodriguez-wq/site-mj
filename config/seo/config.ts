import { getCloudinaryImageUrl } from "@/lib/cloudinary";

/**
 * Core SEO config and robots. Single source for site URL, locale, and crawl rules.
 */
export const SEO_CONFIG = {
  siteName: "M.J. Newell Homes",
  siteDescription:
    "Building American Homes in South Florida. New constructions in LaBelle and Lehigh Acres. Rent to Own programs with $0 down payment. Your dream home, ideal for your family.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.mjnewellhomes.com",
  defaultLocale: "en",
  locale: "en_US",
  ogImage: getCloudinaryImageUrl("/img/logo-fondo-azul-01.png"),
  logo: "/logo.png",
  favicon: "/favicon.png",
  favicon16: "/favicon-16x16.png",
  favicon32: "/favicon-32x32.png",
  appleTouchIcon: "/apple-touch-icon.png",
  manifest: "/site.webmanifest",
  googleSearchConsole: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE || "xWR2GgdY-YACqGW_BYfHOOQDVCQX8RL7YUOIVz_dvB4",
} as const;

export const ROBOTS_CONFIG = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
  },
  disallowPaths: [
    "/api/",
    "/admin/",
    "/private/",
    "/internal-team",
    "/_next/static/chunks/pages/_error",
    "/_next/static/chunks/pages/_app",
  ],
} as const;
