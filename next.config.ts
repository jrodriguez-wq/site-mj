import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimización de imágenes
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Calidad optimizada: más alta para móvil (mejor experiencia), más baja para desktop (mejor rendimiento)
    qualities: [75],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 año
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimización para móvil
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "js.hsforms.net",
      },
      {
        protocol: "https",
        hostname: "js.hs-scripts.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "youtube.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Compresión
  compress: true,

  // Optimizaciones de producción
  reactStrictMode: false,
  
  // Optimización de producción (swcMinify está habilitado por defecto en Next.js 16+)
  productionBrowserSourceMaps: false,

  // Optimización de bundle
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-navigation-menu",
      "lucide-react",
      "framer-motion",
    ],
  },
  
  // Power optimizations
  poweredByHeader: false,

  // Permitir solicitudes cross-origin en desarrollo desde IPs de red local
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.40.4",
  ],


  // Headers de seguridad y performance
  async headers() {
    return [
      {
        // Headers generales para todas las rutas
        source: "/:path*",
        headers: [
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
        ],
      },
      {
        // Caché para imágenes estáticas
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Caché para modelos optimizados
        source: "/modelos-optimized/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Caché para assets estáticos de Next.js
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Caché para imágenes optimizadas de Next.js
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
