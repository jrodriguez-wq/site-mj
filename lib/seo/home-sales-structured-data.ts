import { SEO_CONFIG } from "@/config/seo";
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data";
import type { FAQPageStructuredData } from "@/lib/seo/faq-structured-data";
import type { StructuredData } from "@/types/seo";

export const HOME_SALES_FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: "Where can I buy a new construction home from M.J. Newell Homes?",
    answer:
      "We build and sell new homes in LaBelle and Lehigh Acres, Southwest Florida. Browse our seven floor plans on this page or visit our communities pages for area-specific inventory and pricing.",
  },
  {
    question: "How much do new homes for sale start at?",
    answer:
      "Pricing varies by model and community. Our single-family models start from approximately $316,900 in LaBelle. Each model page lists current purchase price, square footage, and features.",
  },
  {
    question: "What is included when I buy a new home from the builder?",
    answer:
      "Every M.J. Newell home includes standard features such as concrete block construction, impact-resistant windows, stone countertops, stainless appliances, and modern finishes. See each model page for the full standard features list.",
  },
  {
    question: "Can I use a traditional mortgage to buy a new home?",
    answer:
      "Yes. Most buyers use conventional financing, FHA, VA, or other mortgage options. We also offer Rent to Own for buyers who want a flexible path to ownership with $0 down — see our Rent to Own page for details.",
  },
  {
    question: "How do I schedule a visit to see homes for sale?",
    answer:
      "Schedule an appointment through our website or call our LaBelle office. We will show you available models, floor plans, and communities so you can choose the right home for your family.",
  },
  {
    question: "What floor plans are available for sale?",
    answer:
      "We offer Louisiana, Viana, Delanie, Aurora, Langdon, Emelia, and a Duplex model. Availability differs by community — LaBelle has six single-family models; Lehigh Acres includes Langdon, Emelia, Delanie, and Duplex.",
  },
  {
    question: "Is Rent to Own available if I am not ready for a mortgage today?",
    answer:
      "Yes. Rent to Own remains available on qualifying models with $0 down to start. It is an alternative path to ownership while you live in your new home. Purchase and Rent to Own are both offered — choose what fits your situation.",
  },
];

export function generateHomeSalesBreadcrumbStructuredData(): StructuredData {
  return generateBreadcrumbStructuredData([
    { name: "Home", url: SEO_CONFIG.siteUrl },
    { name: "Homes for Sale", url: `${SEO_CONFIG.siteUrl}/new-homes-for-sale` },
  ]);
}

export function generateHomeSalesFAQStructuredData(): FAQPageStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_SALES_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getHomeSalesPageJsonLd(): StructuredData[] {
  return [
    generateHomeSalesBreadcrumbStructuredData(),
    generateHomeSalesFAQStructuredData() as unknown as StructuredData,
  ];
}
