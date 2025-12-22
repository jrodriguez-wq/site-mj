import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { PrivacyPolicyContent } from "@/components/privacy-policy/privacy-policy-content";

export const metadata = generateMetadata({
  title: "Privacy Policy | M.J. Newell Homes",
  description: "Read our privacy policy to understand how M.J. Newell Homes collects, uses, and protects your personal information.",
  canonical: `${SEO_CONFIG.siteUrl}/privacy-policy`,
  keywords: ["privacy policy", "data protection", "M.J. Newell Homes privacy"],
  openGraph: {
    title: "Privacy Policy | M.J. Newell Homes",
    description: "Read our privacy policy to understand how we collect, use, and protect your personal information.",
    url: `${SEO_CONFIG.siteUrl}/privacy-policy`,
    type: "website",
  },
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}

