import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata = generateMetadata({
  title: "Contact Us | M.J. Newell Homes | LaBelle, Florida",
  description: "Contact M.J. Newell Homes. Call (239) 323-9797 or email customerservice@mjnewellhomes.com. Open every day 8am-5pm. Get answers about our homes, Rent to Own program, or schedule a viewing.",
  canonical: `${SEO_CONFIG.siteUrl}/contact`,
  keywords: [
    "contact M.J. Newell Homes",
    "LaBelle home builder contact",
    "Florida home builder",
    "schedule home viewing",
    "new homes Florida contact",
  ],
  openGraph: {
    title: "Contact Us | M.J. Newell Homes",
    description: "Contact M.J. Newell Homes. Call (239) 323-9797 or email customerservice@mjnewellhomes.com. Open every day 8am-5pm.",
    url: `${SEO_CONFIG.siteUrl}/contact`,
    type: "website",
  },
});

export default function ContactPage() {
  return <ContactPageContent />;
}

