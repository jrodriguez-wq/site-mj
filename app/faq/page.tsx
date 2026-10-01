import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { generateFAQPageStructuredData } from "@/lib/seo/faq-structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { FAQContent } from "@/components/faq/faq-content";
import type { StructuredData } from "@/types/seo";

export const metadata = generateMetadata({
  title: "Frequently Asked Questions | M.J. Newell Homes",
  description: "Find answers about buying new homes for sale, our Rent to Own program, communities in LaBelle and Lehigh Acres, and the home buying process in Florida.",
  canonical: `${SEO_CONFIG.siteUrl}/faq`,
  keywords: [
    "FAQ",
    "frequently asked questions",
    "new construction homes Florida",
    "rent to own questions",
    "home buying questions",
    "Florida home builder FAQ",
  ],
  openGraph: {
    title: "Frequently Asked Questions | M.J. Newell Homes",
    description: "Find answers to common questions about our new construction homes, Rent to Own program, and communities in Florida.",
    url: `${SEO_CONFIG.siteUrl}/faq`,
    type: "website",
  },
});

export default function FAQPage() {
  const faqStructuredData = generateFAQPageStructuredData();
  return (
    <>
      <StructuredDataComponent data={faqStructuredData as unknown as StructuredData} />
      <FAQContent />
    </>
  );
}

