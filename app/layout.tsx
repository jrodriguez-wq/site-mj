import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { defaultMetadata, SEO_CONFIG } from "@/config/seo";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import {
  generateOrganizationStructuredData,
  generateWebSiteStructuredData,
  generateLocalBusinessStructuredData,
} from "@/lib/seo/structured-data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/components/layout/language-provider";
import { PromotionModal } from "@/components/promotion/promotion-modal";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["monospace"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    generateOrganizationStructuredData(),
    generateWebSiteStructuredData(),
    generateLocalBusinessStructuredData(),
  ];

  return (
    <html lang={SEO_CONFIG.defaultLocale} suppressHydrationWarning>
      <head>
        {/* Viewport optimizado para móvil */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
        
        {/* Preload de recursos críticos */}
        <link
          rel="preload"
          href="/img/logo.svg"
          as="image"
          type="image/svg+xml"
          fetchPriority="high"
        />
        {/* Preload de imagen de promoción para mejor rendimiento */}
        <link
          rel="preload"
          href="/img/hero/1w5a0754-e4.webp"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
        
        {/* Preconnect y DNS prefetch para recursos externos */}
        <link
          rel="dns-prefetch"
          href="https://js.hs-scripts.com"
        />
        <link
          rel="dns-prefetch"
          href="https://js.hsforms.net"
        />
        <link
          rel="preconnect"
          href="https://js.hs-scripts.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://www.googletagmanager.com"
        />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        
        {/* Preload de fuentes críticas */}
        <link
          rel="preload"
          href="/_next/static/media/geist-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Google Search Console Verification */}
        {SEO_CONFIG.googleSearchConsole && (
          <meta
            name="google-site-verification"
            content={SEO_CONFIG.googleSearchConsole}
          />
        )}
        
        {/* Google Analytics - Google tag (gtag.js) */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XBCDDYFMJQ"
        />
        <Script
          id="google-analytics-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XBCDDYFMJQ');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${dmSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <StructuredDataComponent data={structuredData} />
        <LanguageProvider />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1" id="main-content">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
        
        {/* HubSpot Embed Code - Tracking - Defer para mejor rendimiento */}
        <Script
          id="hs-script-loader"
          strategy="lazyOnload"
          src="https://js.hs-scripts.com/50215941.js"
        />
      </body>
    </html>
  );
}
