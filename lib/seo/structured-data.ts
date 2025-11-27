import {
  StructuredData,
  OrganizationStructuredData,
  RealEstateListingStructuredData,
  BreadcrumbStructuredData,
} from "@/types/seo";
import { SEO_CONFIG, CONTACT_INFO, SOCIAL_LINKS } from "@/config/seo";

export const generateOrganizationStructuredData =
  (): OrganizationStructuredData => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      logo: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: CONTACT_INFO.phone,
        contactType: "customer service",
        email: CONTACT_INFO.email,
        areaServed: CONTACT_INFO.address.addressCountry,
      },
      sameAs: [
        SOCIAL_LINKS.twitter,
        SOCIAL_LINKS.facebook,
        SOCIAL_LINKS.instagram,
        SOCIAL_LINKS.linkedin,
        SOCIAL_LINKS.youtube,
        SOCIAL_LINKS.tiktok,
      ].filter(Boolean),
    };
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
  }
): RealEstateListingStructuredData => {
  const structuredData: RealEstateListingStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.name,
    description: listing.description,
    image: listing.image,
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
    structuredData.priceCurrency = listing.priceCurrency || "EUR";
  }

  if (listing.floorSize) {
    structuredData.floorSize = {
      "@type": "QuantitativeValue",
      value: listing.floorSize,
      unitCode: "MTK",
    };
  }

  if (listing.numberOfRooms) {
    structuredData.numberOfRooms = listing.numberOfRooms;
  }

  if (listing.yearBuilt) {
    structuredData.yearBuilt = listing.yearBuilt;
  }

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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SEO_CONFIG.siteUrl}/buscar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
    image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
    address: {
      "@type": "PostalAddress",
      ...CONTACT_INFO.address,
    },
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    priceRange: "$$",
    openingHoursSpecification: openingHours,
    geo: CONTACT_INFO.coordinates ? {
      "@type": "GeoCoordinates",
      latitude: CONTACT_INFO.coordinates.latitude,
      longitude: CONTACT_INFO.coordinates.longitude,
    } : undefined,
  };
};

