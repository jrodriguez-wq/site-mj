import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player";
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
    site?: string;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      "max-video-preview"?: number;
      "max-image-preview"?: "large" | "none" | "standard";
      "max-snippet"?: number;
    };
  };
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  other?: Record<string, string>;
}

export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

export interface OrganizationStructuredData extends StructuredData {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  contactPoint?: {
    "@type": "ContactPoint";
    telephone?: string;
    contactType?: string;
    email?: string;
    areaServed?: string;
  };
  sameAs?: string[];
}

export interface RealEstateListingStructuredData extends StructuredData {
  "@type": "RealEstateListing";
  name: string;
  description?: string;
  image?: string | string[];
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude?: number;
    longitude?: number;
  };
  price?: string;
  priceCurrency?: string;
  floorSize?: {
    "@type": "QuantitativeValue";
    value?: number;
    unitCode?: string;
  };
  numberOfRooms?: number;
  yearBuilt?: number;
}

export interface BreadcrumbStructuredData extends StructuredData {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

