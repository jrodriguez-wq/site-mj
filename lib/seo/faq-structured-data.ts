import { COPY } from "@/lib/constants/copy";
import { SEO_CONFIG } from "@/config/seo";

type FAQItem = { question: string; answer: string };

/**
 * Extracts all FAQ question/answer pairs from COPY.faq.categories for FAQPage schema.
 */
function getFAQItemsFromCopy(): FAQItem[] {
  const items: FAQItem[] = [];
  const faq = COPY.faq as Record<string, unknown> | undefined;
  if (!faq || typeof faq !== "object" || !("categories" in faq)) return items;

  const categories = faq.categories as Record<string, { items?: Record<string, { question?: string; answer?: string }> }> | undefined;
  if (!categories || typeof categories !== "object") return items;

  for (const category of Object.values(categories)) {
    const categoryItems = category?.items;
    if (!categoryItems || typeof categoryItems !== "object") continue;
    for (const item of Object.values(categoryItems)) {
      const q = item?.question;
      const a = item?.answer;
      if (typeof q === "string" && typeof a === "string") {
        items.push({ question: q, answer: a });
      }
    }
  }
  return items;
}

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
 */
export function generateFAQPageStructuredData(): FAQPageStructuredData {
  const faqItems = getFAQItemsFromCopy();
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

/**
 * Returns the FAQ page URL for the schema.
 */
export function getFAQPageUrl(): string {
  return `${SEO_CONFIG.siteUrl}/faq`;
}
