/**
 * Utilidades para SEO
 */

import { Metadata } from "next";
import { SEO_CONFIG } from "@/config/seo";

/**
 * Genera metadata optimizada para SEO
 */
export function generateSEOMetadata({
  title,
  description,
  path = "",
  image,
  noindex = false,
  nofollow = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
}): Metadata {
  const url = `${SEO_CONFIG.siteUrl}${path}`;
  const ogImage = image || `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        es: `${SEO_CONFIG.siteUrl}/es${path}`,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: SEO_CONFIG.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Genera breadcrumbs structured data
 */
export function generateBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Valida y limpia URLs para SEO
 */
export function sanitizeUrl(url: string): string {
  return url
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Genera meta keywords desde un array
 */
export function generateKeywords(keywords: string[]): string {
  return [...new Set(keywords)].join(", ");
}

