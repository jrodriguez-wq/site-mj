import type { Metadata } from "next";

export const SEO_CONFIG = {
  siteName: "M.J. Newell Homes",
  siteDescription:
    "Building American Homes in South Florida. New constructions in LaBelle and Lehigh Acres. Rent to Own programs with $0 down payment. Your dream home, ideal for your family.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mjnewellhomes.com",
  defaultLocale: "en",
  locale: "en_US",
  ogImage: "/og-image.jpg",
  logo: "/logo.png",
  favicon: "/favicon.png",
  favicon16: "/favicon-16x16.png",
  favicon32: "/favicon-32x32.png",
  appleTouchIcon: "/apple-touch-icon.png",
  manifest: "/site.webmanifest",
} as const;

export const CONTACT_INFO = {
  email: "customerservice@mjnewellhomes.com",
  phone: "(239) 323-9797",
  phoneSecondary: "(239) 323-9696",
  phoneFormatted: "+1 (239) 323-9797",
  
  // Dirección física de la oficina (LaBelle, FL)
  address: {
    streetAddress: "LaBelle, FL",
    addressLocality: "LaBelle",
    addressRegion: "FL",
    postalCode: "33935",
    addressCountry: "US",
  },
  
  // Coordenadas GPS (opcional, para Google Maps)
  // LaBelle, FL coordinates
  coordinates: {
    latitude: 26.7615,
    longitude: -81.4381,
  },
  
  // Horario de atención
  openingHours: {
    weekdays: {
      opens: "09:00",
      closes: "18:00",
    },
    saturday: {
      opens: "10:00",
      closes: "16:00",
    },
    sunday: false, // Cerrado los domingos
  },
} as const;

export const SOCIAL_LINKS = {
  twitter: "", // No disponible
  twitterHandle: "", // No disponible
  facebook: "https://www.facebook.com/share/1A2SNvY51b/",
  instagram: "https://www.instagram.com/mjnewellhomes/",
  linkedin: "https://www.linkedin.com/company/mj-newell-homes-fl/",
  youtube: "", // Opcional
  tiktok: "https://www.tiktok.com/@mjnhomesofficial",
} as const;

export const KEYWORDS = [
  "M.J. Newell Homes",
  "new homes Florida",
  "rent to own Florida",
  "new construction homes",
  "LaBelle Florida homes",
  "Lehigh Acres Florida homes",
  "Southwest Florida real estate",
  "South Florida homes",
  "new home construction",
  "rent to own program",
  "zero down payment",
  "affordable homes Florida",
  "family homes Florida",
  "new home builder",
  "Florida real estate",
] as const;

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
  
  // Rutas a excluir del sitemap y robots.txt
  disallowPaths: [
    "/api/",
    "/admin/",
    "/private/",
    "/_next/",
  ],
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  
  title: {
    default: SEO_CONFIG.siteName,
    template: `%s | ${SEO_CONFIG.siteName}`,
  },
  
  description: SEO_CONFIG.siteDescription,
  keywords: KEYWORDS as unknown as string[],
  
  authors: [
    {
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
  ],
  
  creator: SEO_CONFIG.siteName,
  publisher: SEO_CONFIG.siteName,
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: SEO_CONFIG.locale,
    url: SEO_CONFIG.siteUrl,
    title: SEO_CONFIG.siteName,
    description: SEO_CONFIG.siteDescription,
    siteName: SEO_CONFIG.siteName,
    images: [
      {
        url: SEO_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SEO_CONFIG.siteName,
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.siteName,
    description: SEO_CONFIG.siteDescription,
    images: [SEO_CONFIG.ogImage],
    creator: SOCIAL_LINKS.twitterHandle,
    site: SOCIAL_LINKS.twitterHandle,
  },
  
  // Robots
  robots: ROBOTS_CONFIG,
  
  // Iconos
  icons: {
    icon: [
      { url: SEO_CONFIG.favicon, sizes: "any" },
      { url: SEO_CONFIG.favicon16, sizes: "16x16", type: "image/png" },
      { url: SEO_CONFIG.favicon32, sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: SEO_CONFIG.appleTouchIcon, sizes: "180x180", type: "image/png" },
    ],
    shortcut: SEO_CONFIG.favicon16,
  },
  
  manifest: SEO_CONFIG.manifest,
};

export const SITEMAP_CONFIG = {
  mainRoutes: [
    {
      path: "",
      priority: 1.0,
      changeFrequency: "daily" as const,
    },
    {
      path: "/rent-to-own",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/about-us",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/communities/labelle",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/communities/lehigh-acres",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/home-buying-guide",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/build-with-us",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/models",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/warranty",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/contact",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
  ],
} as const;

export const SEO = {
  config: SEO_CONFIG,
  contact: CONTACT_INFO,
  social: SOCIAL_LINKS,
  keywords: KEYWORDS as unknown as string[],
  robots: ROBOTS_CONFIG,
  sitemap: SITEMAP_CONFIG,
  metadata: defaultMetadata,
} as const;

