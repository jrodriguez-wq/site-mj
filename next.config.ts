import type { NextConfig } from "next";

// ============================================================================
// CONSTANTS - Configuraci?n centralizada para f?cil mantenimiento
// ============================================================================

/**
 * Constantes de tiempo para cache (en segundos)
 */
const CACHE_TTL = {
  ONE_YEAR: 60 * 60 * 24 * 365, // 31536000 segundos
  ONE_DAY: 60 * 60 * 24,
  ONE_HOUR: 60 * 60,
} as const;

/**
 * Configuraci?n de im?genes
 */
const IMAGE_CONFIG = {
  FORMATS: ["image/avif", "image/webp"] as ("image/avif" | "image/webp")[],
  DEVICE_SIZES: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  IMAGE_SIZES: [16, 32, 48, 64, 96, 128, 256, 384],
  /** Default quality; also list all qualities used by <Image quality={?} /> in the app */
  QUALITY: 75,
  QUALITIES: [75, 85, 90, 100] as const,
  MIN_CACHE_TTL: CACHE_TTL.ONE_YEAR,
};

/**
 * Dominios remotos permitidos para im?genes
 */
const REMOTE_IMAGE_PATTERNS = [
  // HubSpot Forms & Scripts
  {
    protocol: "https" as const,
    hostname: "js.hsforms.net",
  },
  {
    protocol: "https" as const,
    hostname: "js.hs-scripts.com",
  },
  // YouTube (im?genes de videos)
  {
    protocol: "https" as const,
    hostname: "img.youtube.com",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "youtube.com",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "i.ytimg.com",
    pathname: "/**",
  },
];

/**
 * Rutas est?ticas que deben tener cache agresivo
 */
const STATIC_ASSET_PATHS = [
  "/img/:path*",
  "/recursos/:path*",
  "/modelos-optimized/:path*",
  "/_next/static/:path*",
  "/_next/image",
  "/favicon.ico",
  "/favicon.png",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/site.webmanifest",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
];

/**
 * Paquetes para optimizaci?n de imports (tree-shaking)
 */
const OPTIMIZED_PACKAGES = [
  "@radix-ui/react-accordion",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-select",
  "@radix-ui/react-tabs",
  "@radix-ui/react-navigation-menu",
  "lucide-react",
  "framer-motion",
];

// ============================================================================
// HELPER FUNCTIONS - Funciones auxiliares para configuraci?n
// ============================================================================

/**
 * Genera headers de seguridad est?ndar para todas las rutas
 */
const getSecurityHeaders = () => [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/**
 * Genera header de cache inmutable para assets est?ticos
 */
const getImmutableCacheHeader = () => ({
  key: "Cache-Control",
  value: `public, max-age=${CACHE_TTL.ONE_YEAR}, immutable`,
});

/**
 * HTML/pages: revalidar para que visitantes recurrentes reciban la versión nueva tras un deploy.
 * No podemos borrar la caché del navegador de los clientes; con esto el HTML pide revalidar
 * y Next sirve assets con hash nuevo, así que la mayoría verá el sitio actualizado.
 */
const getHtmlRevalidateHeader = () => ({
  key: "Cache-Control",
  value: "public, max-age=0, must-revalidate",
});

/**
 * Genera configuración de headers para todas las rutas
 */
const getHeadersConfig = () => {
  const headers = [
    // Headers de seguridad para todas las rutas
    {
      source: "/:path*",
      headers: getSecurityHeaders(),
    },
    // Páginas HTML: revalidar para que clientes que vuelven reciban la versión nueva
    { source: "/", headers: [getHtmlRevalidateHeader()] },
    { source: "/models/:path*", headers: [getHtmlRevalidateHeader()] },
    { source: "/contact", headers: [getHtmlRevalidateHeader()] },
    { source: "/about-us", headers: [getHtmlRevalidateHeader()] },
    { source: "/rent-to-own", headers: [getHtmlRevalidateHeader()] },
    { source: "/faq", headers: [getHtmlRevalidateHeader()] },
    { source: "/schedule-appointment", headers: [getHtmlRevalidateHeader()] },
    { source: "/communities/:path*", headers: [getHtmlRevalidateHeader()] },
    { source: "/blog/:path*", headers: [getHtmlRevalidateHeader()] },
    { source: "/privacy-policy", headers: [getHtmlRevalidateHeader()] },
    { source: "/terms-conditions", headers: [getHtmlRevalidateHeader()] },
    // Cache agresivo para assets estáticos (imágenes, _next/static, etc.)
    ...STATIC_ASSET_PATHS.map((path) => ({
      source: path,
      headers: [getImmutableCacheHeader()],
    })),
  ];

  return headers;
};
  
// ============================================================================
// NEXT.JS CONFIG - Configuraci?n principal
// ============================================================================

const nextConfig: NextConfig = {
  // ========================================================================
  // IMAGE OPTIMIZATION
  // Next.js generates responsive srcsets (multiple widths) and AVIF/WebP on
  // demand, then caches. Your pre-optimized files are still used as the source;
  // the server only creates derivatives for different sizes/formats. To serve
  // images as-is with no server processing, set unoptimized: true.
  // ========================================================================
  images: {
    formats: IMAGE_CONFIG.FORMATS,
    deviceSizes: IMAGE_CONFIG.DEVICE_SIZES,
    imageSizes: IMAGE_CONFIG.IMAGE_SIZES,
    qualities: [...IMAGE_CONFIG.QUALITIES],
    minimumCacheTTL: IMAGE_CONFIG.MIN_CACHE_TTL,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    
    // Dominios remotos permitidos para im?genes
    remotePatterns: REMOTE_IMAGE_PATTERNS,
  },

  // ========================================================================
  // COMPRESSION - Compresi?n de respuestas
  // ========================================================================
  compress: true,

  // ========================================================================
  // REACT CONFIGURATION - Configuraci?n de React
  // ========================================================================
  // Strict Mode deshabilitado para evitar double-rendering en desarrollo
  // (no necesario para un sitio inmobiliario est?tico)
  reactStrictMode: false,

  // ========================================================================
  // PRODUCTION OPTIMIZATIONS - Optimizaciones de producci?n
  // ========================================================================
  // Deshabilitar source maps en producci?n para mejor seguridad y rendimiento
  productionBrowserSourceMaps: false,
  
  // Remover header "X-Powered-By" por seguridad
  poweredByHeader: false,

  // ========================================================================
  // BUNDLE OPTIMIZATION - Optimizaci?n de bundle
  // ========================================================================
  experimental: {
    // Tree-shaking optimizado para paquetes espec?ficos
    optimizePackageImports: OPTIMIZED_PACKAGES,
    // Asegurar que el CSS se procesa correctamente en SSR para Googlebot
    // Esto es cr?tico para que Googlebot vea el sitio con estilos
    optimizeCss: true,
  },

  // ========================================================================
  // SECURITY & PERFORMANCE HEADERS - Headers de seguridad y rendimiento
  // ========================================================================
  async headers() {
    return getHeadersConfig();
  },

  // ========================================================================
  // DEVELOPMENT CONFIG - Configuraci?n de desarrollo
  // ========================================================================
  // Para desarrollo, Next.js maneja autom?ticamente hot-reload y Fast Refresh
  // No se requiere configuraci?n adicional para desarrollo local
};

export default nextConfig;
