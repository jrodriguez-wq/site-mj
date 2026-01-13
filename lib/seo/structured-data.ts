import {
  StructuredData,
  OrganizationStructuredData,
  RealEstateListingStructuredData,
  BreadcrumbStructuredData,
} from "@/types/seo";
import { SEO_CONFIG, CONTACT_INFO, SOCIAL_LINKS, GOOGLE_REVIEWS } from "@/config/seo";

export const generateOrganizationStructuredData =
  (): OrganizationStructuredData & Record<string, unknown> => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      description: SEO_CONFIG.siteDescription,
      logo: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
      image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
      inLanguage: "en-US",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: CONTACT_INFO.phone,
          contactType: "customer service",
          email: CONTACT_INFO.email,
          areaServed: [
            "US-FL",
            "LaBelle",
            "Lehigh Acres",
            "Fort Myers",
            "Cape Coral",
            "Naples",
            "Miami",
            "Clewiston",
            "Immokalee",
          ],
          availableLanguage: ["English", "Spanish"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        ...CONTACT_INFO.address,
      },
      sameAs: [
        SOCIAL_LINKS.twitter,
        SOCIAL_LINKS.facebook,
        SOCIAL_LINKS.instagram,
        SOCIAL_LINKS.linkedin,
        SOCIAL_LINKS.youtube,
        SOCIAL_LINKS.tiktok,
        SOCIAL_LINKS.googleBusiness,
      ].filter(Boolean),
    } as OrganizationStructuredData & Record<string, unknown>;
  };

export const generateRealEstateListingStructuredData = (
  listing: {
    name: string;
    description?: string;
    image?: string | string[];
    address?: {
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry?: string;
    };
    geo?: {
      latitude?: number;
      longitude?: number;
    };
    price?: string;
    priceCurrency?: string;
    floorSize?: number;
    numberOfRooms?: number;
    yearBuilt?: number;
    url?: string;
    availability?: string;
  }
): RealEstateListingStructuredData => {
  const structuredData: RealEstateListingStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.name,
    description: listing.description || `${listing.name} - New construction home by M.J. Newell Homes`,
    image: listing.image,
    url: listing.url || `${SEO_CONFIG.siteUrl}/models/${listing.name.toLowerCase().replace(/\s+/g, "-")}`,
    availability: listing.availability || "https://schema.org/InStock",
  };

  if (listing.address) {
    structuredData.address = {
      "@type": "PostalAddress",
      ...listing.address,
    };
  }

  if (listing.geo) {
    structuredData.geo = {
      "@type": "GeoCoordinates",
      ...listing.geo,
    };
  }

  if (listing.price) {
    structuredData.price = listing.price;
    structuredData.priceCurrency = listing.priceCurrency || "USD";
  }

  if (listing.floorSize) {
    structuredData.floorSize = {
      "@type": "QuantitativeValue",
      value: listing.floorSize,
      unitCode: "SQM", // Square meters, but we'll convert from sqft if needed
    };
  }

  if (listing.numberOfRooms) {
    structuredData.numberOfRooms = listing.numberOfRooms;
  }

  if (listing.yearBuilt) {
    structuredData.yearBuilt = listing.yearBuilt;
  }

  // Add offer details
  structuredData.offers = {
    "@type": "Offer",
    price: listing.price || "0",
    priceCurrency: listing.priceCurrency || "USD",
    availability: listing.availability || "https://schema.org/InStock",
    url: listing.url || `${SEO_CONFIG.siteUrl}/models/${listing.name.toLowerCase().replace(/\s+/g, "-")}`,
  };

  return structuredData;
};

export const generateBreadcrumbStructuredData = (
  items: Array<{ name: string; url?: string }>
): BreadcrumbStructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url || `${SEO_CONFIG.siteUrl}${index === 0 ? "" : `/${item.name.toLowerCase().replace(/\s+/g, "-")}`}`,
    })),
  };
};

export const generateWebSiteStructuredData = (): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.siteDescription,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SEO_CONFIG.siteUrl}/buscar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
      },
    },
  };
};

export const generateLocalBusinessStructuredData = (): StructuredData => {
  const openingHours = [];
  
  // Días laborables
  if (CONTACT_INFO.openingHours.weekdays) {
    openingHours.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: CONTACT_INFO.openingHours.weekdays.opens,
      closes: CONTACT_INFO.openingHours.weekdays.closes,
    });
  }
  
  // Sábado
  if (CONTACT_INFO.openingHours.saturday) {
    openingHours.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: CONTACT_INFO.openingHours.saturday.opens,
      closes: CONTACT_INFO.openingHours.saturday.closes,
    });
  }
  
  // Domingo
  if (CONTACT_INFO.openingHours.sunday) {
    openingHours.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: CONTACT_INFO.openingHours.sunday.opens,
      closes: CONTACT_INFO.openingHours.sunday.closes,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
    image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
    description: SEO_CONFIG.siteDescription,
    inLanguage: "en-US",
    address: {
      "@type": "PostalAddress",
      ...CONTACT_INFO.address,
    },
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    priceRange: "$$",
    openingHoursSpecification: openingHours,
    // Aggregate Rating - Reviews and ratings from Google Business Profile
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_REVIEWS.ratingValue,
      reviewCount: String(GOOGLE_REVIEWS.reviewCount),
      bestRating: "5",
      worstRating: "1",
      url: GOOGLE_REVIEWS.googleBusinessProfileUrl,
    },
    geo: CONTACT_INFO.coordinates ? {
      "@type": "GeoCoordinates",
      latitude: CONTACT_INFO.coordinates.latitude,
      longitude: CONTACT_INFO.coordinates.longitude,
    } : undefined,
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
      {
        "@type": "City",
        name: "Cape Coral",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Naples",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Miami",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Clewiston",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Immokalee",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
    ],
    serviceType: "New Home Construction",
    // Propiedades adicionales específicas de bienes raíces
    knowsAbout: [
      "New Home Construction",
      "Rent to Own",
      "Real Estate",
      "Home Building",
      "Residential Construction",
      "Home Sales",
      "Property Development",
    ],
    paymentAccepted: ["Cash", "Financing", "Rent to Own"],
    currenciesAccepted: "USD",
    // Información sobre el tipo de propiedades
    additionalType: "https://schema.org/RealEstateAgent",
    // Servicios ofrecidos
    makesOffer: {
      "@type": "Offer",
      name: "Rent to Own Program",
      description: "Rent to Own program with $0 down payment for new construction homes",
      availability: "https://schema.org/InStock",
    },
  };
};

