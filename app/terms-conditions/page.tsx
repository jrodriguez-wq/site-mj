import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { TermsConditionsContent } from "@/components/terms-conditions/terms-conditions-content";

export const metadata = generateMetadata({
  title: "Terms & Conditions | M.J. Newell Homes",
  description: "Read the terms and conditions for using M.J. Newell Homes website and services.",
  canonical: `${SEO_CONFIG.siteUrl}/terms-conditions`,
  keywords: ["terms and conditions", "terms of service", "M.J. Newell Homes terms"],
  openGraph: {
    title: "Terms & Conditions | M.J. Newell Homes",
    description: "Read the terms and conditions for using our website and services.",
    url: `${SEO_CONFIG.siteUrl}/terms-conditions`,
    type: "website",
  },
});

export default function TermsConditionsPage() {
  return <TermsConditionsContent />;
}

