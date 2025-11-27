import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
import { LanguageInitializer } from "@/components/layout/language-initializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <StructuredDataComponent data={structuredData} />
        <LanguageInitializer>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageInitializer>
      </body>
    </html>
  );
}
