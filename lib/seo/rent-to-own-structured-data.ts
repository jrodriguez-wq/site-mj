import { SEO_CONFIG } from "@/config/seo";
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data";
import type { FAQPageStructuredData } from "@/lib/seo/faq-structured-data";
import type { StructuredData } from "@/types/seo";

/**
 * Breadcrumb JSON-LD: Home → Rent to Own (rich paths in Google).
 */
export function generateRentToOwnBreadcrumbStructuredData(): StructuredData {
  return generateBreadcrumbStructuredData([
    { name: "Home", url: SEO_CONFIG.siteUrl },
    { name: "Rent to Own", url: `${SEO_CONFIG.siteUrl}/rent-to-own` },
  ]);
}

/**
 * FAQ content aligned with visible copy on /rent-to-own (FAQPage rich results).
 * Exported for the on-page FAQ section (same text as JSON-LD).
 */
export const RENT_TO_OWN_FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: "What is rent to own with M.J. Newell Homes in Florida?",
    answer:
      "Rent to own lets you move into a new M.J. Newell home in Florida, pay monthly rent that includes a savings portion, and build toward purchasing the home at an agreed, locked-in price—often without needing a traditional bank loan to begin.",
  },
  {
    question: "Where in Florida are rent-to-own homes available?",
    answer:
      "We offer new-construction rent-to-own homes in Southwest Florida, including LaBelle and Lehigh Acres. Available floor plans and communities are listed on this page so you can explore current inventory by area.",
  },
  {
    question: "Do I need a traditional bank loan to start?",
    answer:
      "You do not need a traditional mortgage to get started. You submit an application and documents; we review your situation and guide you through signing an agreement and moving in, with a path to purchase when you are ready using in-house financing options or a traditional mortgage.",
  },
  {
    question: "What do I need to qualify for the rent-to-own program?",
    answer:
      "We keep the process practical: you should have steady verifiable income to cover the monthly rent-to-own payment, a clean recent rental history without evictions, and legal status to live and work in the United States.",
  },
  {
    question: "What documents are required for a rent-to-own application?",
    answer:
      "Typically you will provide recent tax returns, pay stubs, recent bank statements, and a valid government-issued ID. The exact list may vary slightly by applicant; the application flow on this page explains next steps.",
  },
  {
    question: "How does my monthly payment work toward owning the home?",
    answer:
      "Each month, part of your payment is allocated toward your future down payment while you live in the home. Your purchase price is agreed up front, so you know the target buyout as you prepare to own.",
  },
  {
    question: "What are key benefits of the M.J. Newell rent-to-own program?",
    answer:
      "Highlights include affordable monthly terms, price protection, maintenance included during the lease term, pets allowed, and a structured path from application and move-in to eventual ownership in Florida.",
  },
  {
    question: "Is a credit check required to apply?",
    answer:
      "No credit check is required to get started. You apply with proof of income and supporting documents; we review your application based on criteria such as income stability and rental history.",
  },
];

export function generateRentToOwnFAQStructuredData(): FAQPageStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RENT_TO_OWN_FAQ_ITEMS.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function getRentToOwnPageJsonLd(): StructuredData[] {
  return [
    generateRentToOwnBreadcrumbStructuredData(),
    generateRentToOwnFAQStructuredData() as unknown as StructuredData,
  ];
}
