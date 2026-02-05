import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Outfit, DM_Sans, Pacifico } from "next/font/google";
import "./globals.css";
import defaultTranslationsEn from "@/locales/en.json";
import { defaultMetadata, SEO_CONFIG } from "@/config/seo";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import {
  generateOrganizationStructuredData,
  generateWebSiteStructuredData,
  generateLocalBusinessStructuredData,
} from "@/lib/seo/structured-data";
import { generateAllServiceSchemas } from "@/lib/seo/service-structured-data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/components/layout/language-provider";
import { TranslationLoader } from "@/components/layout/translation-loader";
import { GlobalStars } from "@/components/promotion/global-stars";
import { CacheBuster } from "@/components/layout/cache-buster";
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

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  fallback: ["cursive"],
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
    ...generateAllServiceSchemas(),
  ];

  return (
    <html lang={SEO_CONFIG.defaultLocale} suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification */}
        {SEO_CONFIG.googleSearchConsole && (
          <meta
            name="google-site-verification"
            content={SEO_CONFIG.googleSearchConsole}
          />
        )}
        
        {/* Viewport optimizado para móvil */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
        
        {/* Preconnect crítico para CSS y fuentes - Mejora renderizado en Googlebot */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* CSS crítico inline para Googlebot - CRÍTICO para indexación */}
        {/* Esto asegura que Googlebot vea el sitio con estilos básicos */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* CSS crítico inline para Googlebot - Evita FOUC y mejora indexación */
            html { 
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            body { 
              margin: 0; 
              padding: 0;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
            * { 
              box-sizing: border-box;
            }
            /* Asegurar que el contenido sea visible mientras carga el CSS completo */
            body { visibility: visible; }
          `
        }} />
        
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
          rel="dns-prefetch"
          href="https://static.hsappstatic.net"
        />
        <link
          rel="dns-prefetch"
          href="https://meetings.hubspot.com"
        />
        <link
          rel="preconnect"
          href="https://js.hs-scripts.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://static.hsappstatic.net"
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
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${dmSans.variable} ${pacifico.variable}`}
        suppressHydrationWarning
      >
        {/* Traducciones por defecto (en) inyectadas desde el servidor: evita ver claves (hero.title1, nav.scheduleAppointment, etc.) en el primer frame y en móviles/redes lentas */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__DEFAULT_TRANSLATIONS__=${JSON.stringify(defaultTranslationsEn)};window.__DEFAULT_TRANSLATIONS_LANG__="en";`,
          }}
        />
        <CacheBuster />
        <StructuredDataComponent data={structuredData} />
        <LanguageProvider />
        <TranslationLoader>
          <div className="flex min-h-screen flex-col w-full max-w-full">
            <Navbar />
            <main className="flex-1 w-full max-w-full pt-16 sm:pt-[4.5rem] md:pt-20 lg:pt-24" id="main-content">{children}</main>
            <Footer />
          </div>
        </TranslationLoader>
        <Analytics />
        <SpeedInsights />
        
        {/* Efectos navideños globales */}
        <GlobalStars />
        
        {/* HubSpot Embed Code - Tracking - Defer para mejor rendimiento */}
        <Script
          id="hs-script-loader"
          strategy="lazyOnload"
          src="https://js.hs-scripts.com/50215941.js"
        />
        
        {/* HubSpot Meetings Embed Script - Precargar para mejor rendimiento */}
        <Script
          id="hs-meetings-embed"
          strategy="afterInteractive"
          src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        />
      </body>
    </html>
  );
}
