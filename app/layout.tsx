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
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${dmSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <StructuredDataComponent data={structuredData} />
        <LanguageProvider />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="https://js.hs-scripts.com/50215941.js"
        />
      </body>
    </html>
  );
}
