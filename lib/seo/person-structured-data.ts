import { SEO_CONFIG, CONTACT_INFO, SOCIAL_LINKS, GOOGLE_REVIEWS } from "@/config/seo";

const sldUrl = "https://www.standardlanddevelopment.com";

/**
 * Person schema for Michael J. Newell — EEAT signal.
 * Named founder with verifiable credentials across both companies.
 * Same @id used in SLD site to signal the same entity to Google.
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${sldUrl}/#michael-j-newell`,
    name: "Michael J. Newell",
    jobTitle: "Founder & CEO",
    worksFor: [
      { "@type": "Organization", name: SEO_CONFIG.siteName, url: SEO_CONFIG.siteUrl },
      { "@type": "Organization", name: "Standard Land Development", url: sldUrl },
    ],
    description:
      "Michael J. Newell is the Founder and CEO of M.J. Newell Homes and Standard Land Development. Since 2016, Michael has built 2,875+ affordable homes across Southwest Florida, pioneering Rent to Own programs to make homeownership accessible to American families.",
    url: SEO_CONFIG.siteUrl,
    sameAs: [
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      sldUrl,
    ].filter(Boolean),
    knowsAbout: [
      "New Home Construction",
      "Rent to Own Programs",
      "Real Estate Development",
      "Affordable Housing",
      "Southwest Florida Real Estate",
      "Land Development",
      "Construction Financing",
    ],
  };
}

/**
 * AggregateRating schema — Google can show star ratings in search results.
 * Update reviewCount and ratingValue from Google Business Profile periodically.
 */
export function generateAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SEO_CONFIG.siteUrl}/#localbusiness`,
    name: SEO_CONFIG.siteName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_REVIEWS.ratingValue,
      reviewCount: GOOGLE_REVIEWS.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
  };
}
