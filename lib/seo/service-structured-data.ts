import { StructuredData } from "@/types/seo";
import { SEO_CONFIG, GOOGLE_REVIEWS } from "@/config/seo";

/**
 * Generate Service Schema for Rent to Own Program
 */
export const generateRentToOwnServiceSchema = (): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Rent to Own Program",
    inLanguage: "en-US",
    provider: {
      "@type": "RealEstateAgent",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
    areaServed: [
      {
        "@type": "City",
        name: "LaBelle",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Lehigh Acres",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
    ],
    description: "Rent to Own program with $0 down payment for new construction homes. Build equity while you live. Flexible 1-5 year plans. No credit check required.",
    offers: {
      "@type": "Offer",
      name: "Rent to Own Program",
      description: "Rent to Own with $0 down payment",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SEO_CONFIG.siteUrl}/rent-to-own`,
    },
    url: `${SEO_CONFIG.siteUrl}/rent-to-own`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_REVIEWS.ratingValue,
      reviewCount: String(GOOGLE_REVIEWS.reviewCount),
      bestRating: "5",
      worstRating: "1",
      url: GOOGLE_REVIEWS.googleBusinessProfileUrl,
    },
  };
};

/**
 * Generate Service Schema for New Home Construction
 */
export const generateNewHomeConstructionServiceSchema = (): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "New Home Construction",
    inLanguage: "en-US",
    provider: {
      "@type": "RealEstateAgent",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
    areaServed: [
      {
        "@type": "City",
        name: "LaBelle",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Lehigh Acres",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Fort Myers",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
    ],
    description: "New construction homes in Southwest Florida. Modern family homes on 1/4 acre lots. Quality craftsmanship with contemporary designs.",
    offers: {
      "@type": "Offer",
      name: "New Home Construction",
      description: "New construction homes in LaBelle and Lehigh Acres",
      availability: "https://schema.org/InStock",
      url: `${SEO_CONFIG.siteUrl}/models`,
    },
    url: `${SEO_CONFIG.siteUrl}/models`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_REVIEWS.ratingValue,
      reviewCount: String(GOOGLE_REVIEWS.reviewCount),
      bestRating: "5",
      worstRating: "1",
      url: GOOGLE_REVIEWS.googleBusinessProfileUrl,
    },
  };
};

/**
 * Generate Service Schema for Home Sales
 */
export const generateHomeSalesServiceSchema = (): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Home Sales",
    inLanguage: "en-US",
    provider: {
      "@type": "RealEstateAgent",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
    areaServed: [
      {
        "@type": "City",
        name: "LaBelle",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Lehigh Acres",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
    ],
    description: "Buy new construction homes in Southwest Florida. Multiple financing options including traditional mortgage and Rent to Own programs.",
    offers: {
      "@type": "Offer",
      name: "Home Sales",
      description: "Purchase new construction homes",
      availability: "https://schema.org/InStock",
      url: `${SEO_CONFIG.siteUrl}/models`,
    },
    url: `${SEO_CONFIG.siteUrl}/models`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_REVIEWS.ratingValue,
      reviewCount: String(GOOGLE_REVIEWS.reviewCount),
      bestRating: "5",
      worstRating: "1",
      url: GOOGLE_REVIEWS.googleBusinessProfileUrl,
    },
  };
};

/**
 * Generate Service Schema for Property Development
 */
export const generatePropertyDevelopmentServiceSchema = (): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Property Development",
    inLanguage: "en-US",
    provider: {
      "@type": "RealEstateAgent",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
    areaServed: [
      {
        "@type": "City",
        name: "LaBelle",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Lehigh Acres",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
    ],
    description: "Property development and residential construction services. Building quality communities in Southwest Florida.",
    url: `${SEO_CONFIG.siteUrl}/communities/labelle`,
  };
};

/**
 * Generate all service schemas
 */
export const generateAllServiceSchemas = (): StructuredData[] => {
  return [
    generateRentToOwnServiceSchema(),
    generateNewHomeConstructionServiceSchema(),
    generateHomeSalesServiceSchema(),
    generatePropertyDevelopmentServiceSchema(),
  ];
};

