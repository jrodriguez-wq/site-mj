import type { Metadata } from "next";

export const SEO_CONFIG = {
  siteName: "M.J. Newell Homes",
  siteDescription:
    "Building American Homes in South Florida. New constructions in LaBelle and Lehigh Acres. Rent to Own programs with $0 down payment. Your dream home, ideal for your family.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.mjnewellhomes.com",
  defaultLocale: "en",
  locale: "en_US",
  ogImage: "/og-image.jpg",
  logo: "/logo.png",
  favicon: "/favicon.png",
  favicon16: "/favicon-16x16.png",
  favicon32: "/favicon-32x32.png",
  appleTouchIcon: "/apple-touch-icon.png",
  manifest: "/site.webmanifest",
  // Google Search Console verification code
  // Obtén este código desde: https://search.google.com/search-console
  // Formato: "content="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx""
  googleSearchConsole: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE || "xWR2GgdY-YACqGW_BYfHOOQDVCQX8RL7YUOIVz_dvB4",
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
  
  // Horario de atención - Todos los días de 8am a 5pm
  openingHours: {
    weekdays: {
      opens: "08:00",
      closes: "17:00",
    },
    saturday: {
      opens: "08:00",
      closes: "17:00",
    },
    sunday: {
      opens: "08:00",
      closes: "17:00",
    },
  },
} as const;

export const SOCIAL_LINKS = {
  twitter: "", // No disponible
  twitterHandle: "", // No disponible
  facebook: "https://www.facebook.com/MjNewellHomesFL/", // MJ Newell Homes
  instagram: "https://www.instagram.com/mjnewellhomes?igsh=emg5bHZpcnJnZnIy", // @mjnewellhomes
  linkedin: "https://www.linkedin.com/company/mj-newell-homes-fl/",
  youtube: "", // Opcional
  tiktok: "https://www.tiktok.com/@mjnhomesofficial?_r=1&_t=ZM-92HUBTS1UFP",
  website: "https://www.mjnewellhomes.com",
} as const;

// Importar keywords estratégicas del sistema completo
import { getAllKeywords, getPriorityKeywords } from "./keywords";

// Keywords principales (compatibilidad con código existente)
// Ahora usa el sistema completo de 200+ keywords
export const KEYWORDS = getAllKeywords();

// Keywords específicos de ubicación para SEO local
export const LOCATION_KEYWORDS = [
  // Miami y área metropolitana
  "new homes near Miami",
  "rent to own Miami",
  "homes for sale near Miami",
  "new construction near Miami",
  "home builder near Miami",
  "Miami area homes",
  "South Miami homes",
  
  // Fort Myers y área
  "new homes Fort Myers",
  "rent to own Fort Myers",
  "homes for sale Fort Myers",
  "new construction Fort Myers",
  "home builder Fort Myers",
  "Fort Myers area homes",
  "near Fort Myers homes",
  
  // Cape Coral
  "new homes Cape Coral",
  "rent to own Cape Coral",
  "homes for sale Cape Coral",
  "new construction Cape Coral",
  "home builder Cape Coral",
  
  // Naples
  "new homes near Naples",
  "rent to own near Naples",
  "homes for sale near Naples",
  "new construction near Naples",
  "home builder near Naples",
  
  // Lehigh Acres (ya existe pero expandimos)
  "new homes Lehigh Acres",
  "rent to own Lehigh Acres",
  "homes for sale Lehigh Acres",
  "new construction Lehigh Acres",
  "home builder Lehigh Acres",
  
  // LaBelle (ya existe pero expandimos)
  "new homes LaBelle",
  "rent to own LaBelle",
  "homes for sale LaBelle",
  "new construction LaBelle",
  "home builder LaBelle",
  
  // Otras áreas cercanas
  "new homes Clewiston",
  "new homes Alva",
  "new homes Immokalee",
  "homes within 2 hours of Miami",
  "homes within 2 hours of Fort Myers",
  "Southwest Florida home builder",
  "Hendry County homes",
  "Glades County homes",
  "Lee County homes",
] as const;

// Áreas de servicio (ciudades dentro de 2 horas de LaBelle)
export const SERVICE_AREAS = [
  { name: "LaBelle", state: "FL", distance: "0 miles" },
  { name: "Lehigh Acres", state: "FL", distance: "15 miles" },
  { name: "Fort Myers", state: "FL", distance: "30 miles" },
  { name: "Cape Coral", state: "FL", distance: "35 miles" },
  { name: "Naples", state: "FL", distance: "45 miles" },
  { name: "Clewiston", state: "FL", distance: "20 miles" },
  { name: "Immokalee", state: "FL", distance: "25 miles" },
  { name: "Alva", state: "FL", distance: "10 miles" },
  { name: "Miami", state: "FL", distance: "100 miles" },
  { name: "Punta Gorda", state: "FL", distance: "50 miles" },
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
  
  // Alternates para SEO multilingüe
  alternates: {
    canonical: SEO_CONFIG.siteUrl,
    languages: {
      "en": SEO_CONFIG.siteUrl,
      "es": `${SEO_CONFIG.siteUrl}/es`,
      "x-default": SEO_CONFIG.siteUrl,
    },
  },
  
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
  
  // Metadata adicional para SEO
  category: "Real Estate",
  classification: "Home Builder",
  other: {
    "geo.region": "US-FL",
    "geo.placename": "LaBelle, Lehigh Acres, Fort Myers, Cape Coral, Naples, Miami, Florida",
    "geo.position": `${CONTACT_INFO.coordinates.latitude};${CONTACT_INFO.coordinates.longitude}`,
    "ICBM": `${CONTACT_INFO.coordinates.latitude}, ${CONTACT_INFO.coordinates.longitude}`,
    // SEO local para Florida
    "geo.region.name": "Florida",
    "geo.region.code": "US-FL",
    "business.contact_data.locality": "LaBelle",
    "business.contact_data.region": "FL",
    "business.contact_data.country_name": "United States",
  },
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
      path: "/schedule-appointment",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/models",
      priority: 0.9,
      changeFrequency: "weekly" as const,
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
      path: "/about-us",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/home-buying-guide",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/contact",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/warranty",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
  ],
} as const;

export const SEO = {
  config: SEO_CONFIG,
  contact: CONTACT_INFO,
  social: SOCIAL_LINKS,
  keywords: KEYWORDS as unknown as string[],
  locationKeywords: LOCATION_KEYWORDS as unknown as string[],
  serviceAreas: SERVICE_AREAS,
  robots: ROBOTS_CONFIG,
  sitemap: SITEMAP_CONFIG,
  metadata: defaultMetadata,
} as const;

