import type { NextConfig } from "next";

// ============================================================================
// CONSTANTS - Configuración centralizada para fácil mantenimiento
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
 * Configuración de imágenes
 */
const IMAGE_CONFIG = {
  FORMATS: ["image/avif", "image/webp"] as ("image/avif" | "image/webp")[],
  DEVICE_SIZES: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  IMAGE_SIZES: [16, 32, 48, 64, 96, 128, 256, 384],
  QUALITY: 75,
  MIN_CACHE_TTL: CACHE_TTL.ONE_YEAR,
};

/**
 * Dominios remotos permitidos para imágenes
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
  // YouTube (imágenes de videos)
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
 * Rutas estáticas que deben tener cache agresivo
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
 * Paquetes para optimización de imports (tree-shaking)
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
// HELPER FUNCTIONS - Funciones auxiliares para configuración
// ============================================================================

/**
 * Genera headers de seguridad estándar para todas las rutas
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
 * Genera header de cache inmutable para assets estáticos
 */
const getImmutableCacheHeader = () => ({
  key: "Cache-Control",
  value: `public, max-age=${CACHE_TTL.ONE_YEAR}, immutable`,
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
    // Cache agresivo para assets estáticos
    ...STATIC_ASSET_PATHS.map((path) => ({
      source: path,
      headers: [getImmutableCacheHeader()],
    })),
  ];

  return headers;
};
  
// ============================================================================
// NEXT.JS CONFIG - Configuración principal
// ============================================================================

const nextConfig: NextConfig = {
  // ========================================================================
  // IMAGE OPTIMIZATION - Optimización de imágenes
  // ========================================================================
  images: {
    // Formatos modernos para mejor compresión
    formats: IMAGE_CONFIG.FORMATS,
    
    // Tamaños de dispositivos para responsive images
    deviceSizes: IMAGE_CONFIG.DEVICE_SIZES,
    
    // Tamaños de imágenes para diferentes contextos
    imageSizes: IMAGE_CONFIG.IMAGE_SIZES,
    
    // Calidad optimizada (balance entre calidad y tamaño)
    qualities: [IMAGE_CONFIG.QUALITY],
    
    // Cache de imágenes optimizadas (1 año)
    minimumCacheTTL: IMAGE_CONFIG.MIN_CACHE_TTL,
    
    // Permitir SVGs con política de seguridad estricta
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Mantener optimización habilitada
    unoptimized: false,
    
    // Dominios remotos permitidos para imágenes
    remotePatterns: REMOTE_IMAGE_PATTERNS,
  },

  // ========================================================================
  // COMPRESSION - Compresión de respuestas
  // ========================================================================
  compress: true,

  // ========================================================================
  // REACT CONFIGURATION - Configuración de React
  // ========================================================================
  // Strict Mode deshabilitado para evitar double-rendering en desarrollo
  // (no necesario para un sitio inmobiliario estático)
  reactStrictMode: false,

  // ========================================================================
  // PRODUCTION OPTIMIZATIONS - Optimizaciones de producción
  // ========================================================================
  // Deshabilitar source maps en producción para mejor seguridad y rendimiento
  productionBrowserSourceMaps: false,
  
  // Remover header "X-Powered-By" por seguridad
  poweredByHeader: false,

  // ========================================================================
  // BUNDLE OPTIMIZATION - Optimización de bundle
  // ========================================================================
  experimental: {
    // Tree-shaking optimizado para paquetes específicos
    optimizePackageImports: OPTIMIZED_PACKAGES,
  },

  // ========================================================================
  // SECURITY & PERFORMANCE HEADERS - Headers de seguridad y rendimiento
  // ========================================================================
  async headers() {
    return getHeadersConfig();
  },

  // ========================================================================
  // DEVELOPMENT CONFIG - Configuración de desarrollo
  // ========================================================================
  // Para desarrollo, Next.js maneja automáticamente hot-reload y Fast Refresh
  // No se requiere configuración adicional para desarrollo local
};

export default nextConfig;
