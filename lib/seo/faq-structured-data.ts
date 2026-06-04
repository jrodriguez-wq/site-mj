import { getAllFAQItems } from "@/lib/faq/site-faq-categories";
import { SEO_CONFIG } from "@/config/seo";

export interface FAQPageStructuredData {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: { "@type": string; text: string };
  }>;
}

/**
 * Generates FAQPage JSON-LD for the /faq page (rich results in Google).
 * Uses SITE_FAQ_CATEGORIES — same content as the visible FAQ page.
 */
export function generateFAQPageStructuredData(): FAQPageStructuredData {
  const faqItems = getAllFAQItems();
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function getFAQPageUrl(): string {
  return `${SEO_CONFIG.siteUrl}/faq`;
}
