import { getCloudinaryImageUrl } from "@/lib/cloudinary";

/**
 * Core SEO config and robots. Single source for site URL, locale, and crawl rules.
 */
export const SEO_CONFIG = {
  siteName: "M.J. Newell Homes",
  siteDescription:
    "New construction homes for sale in Southwest Florida. Buy your dream home in LaBelle and Lehigh Acres from M.J. Newell Homes. Quality builder with flexible financing including Rent to Own.",
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
    "/reception",
    "/app-form",
    "/app-cert",
    "/app-contractor",
    "/thank-you",
    "/pay-links",
    "/_next/static/chunks/pages/_error",
    "/_next/static/chunks/pages/_app",
  ],
} as const;
