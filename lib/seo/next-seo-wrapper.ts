import { Metadata } from "next";
import { SEOConfig } from "@/types/seo";
import { generateMetadata as generateMetadataHelper } from "./metadata";
import { SEO_CONFIG } from "@/config/seo";

export const NextSEO = (config: SEOConfig): Metadata => {
  return generateMetadataHelper(config);
};

import {
  generatePropertyMetadata,
  generateCategoryMetadata,
} from "./metadata";

export const PropertySEO = (
  propertyName: string,
  description: string,
  options?: {
    image?: string;
    price?: string;
    location?: string;
    url?: string;
  }
): Metadata => {
  return generatePropertyMetadata(
    propertyName,
    description,
    options?.image,
    options?.price,
    options?.location
  );
};

export const CategorySEO = (
  category: string,
  description: string,
  options?: {
    image?: string;
    url?: string;
  }
): Metadata => {
  return generateCategoryMetadata(category, description);
};

export const DefaultSEO: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  title: {
    default: SEO_CONFIG.siteName,
    template: `%s | ${SEO_CONFIG.siteName}`,
  },
  description: SEO_CONFIG.siteDescription,
  openGraph: {
    type: "website",
    locale: SEO_CONFIG.locale,
    url: SEO_CONFIG.siteUrl,
    siteName: SEO_CONFIG.siteName,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

