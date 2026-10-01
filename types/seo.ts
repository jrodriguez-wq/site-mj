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
    areaServed?: string | string[];
    availableLanguage?: string[];
  } | Array<{
    "@type": "ContactPoint";
    telephone?: string;
    contactType?: string;
    email?: string;
    areaServed?: string | string[];
    availableLanguage?: string[];
  }>;
  sameAs?: string[];
}

export interface RealEstateListingStructuredData extends StructuredData {
  "@type": "RealEstateListing";
  name: string;
  description?: string;
  image?: string | string[];
  url?: string;
  availability?: string;
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
  offers?: {
    "@type": "Offer";
    price?: string;
    priceCurrency?: string;
    availability?: string;
    url?: string;
  };
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

/**
 * Rating (schema.org/Rating). Use inside Review as reviewRating.
 * Google: ratingValue required; bestRating/worstRating recommended (default 5/1).
 */
export interface RatingStructuredData {
  "@type": "Rating";
  ratingValue: number | string;
  bestRating?: number;
  worstRating?: number;
}

/**
 * Review (schema.org/Review). Only use when parent or itemReviewed is a valid type
 * per Google: Book, Course, Event, LocalBusiness, Organization, Product, Recipe, etc.
 * Service is NOT valid. Do not use on pages where the entity controls its own reviews.
 * Required: author (Person|Organization), reviewRating.ratingValue, itemReviewed (if not nested).
 */
export interface ReviewStructuredData {
  "@type": "Review";
  author: { "@type": "Person"; name: string } | { "@type": "Organization"; name: string };
  reviewRating: RatingStructuredData;
  itemReviewed?: { "@type": string; name: string };
  datePublished?: string; // ISO 8601
  name?: string;
  reviewBody?: string;
}

/**
 * AggregateRating (schema.org/AggregateRating). Only use when parent or itemReviewed
 * is a valid type per Google (see Review). Required: ratingValue; ratingCount OR reviewCount.
 * Recommended: bestRating, worstRating.
 */
export interface AggregateRatingStructuredData {
  "@type": "AggregateRating";
  ratingValue: number | string;
  ratingCount?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
}

