import { generateMetadata } from "@/lib/seo/metadata";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata = generateMetadata({
  title: "Contact Us",
  description: "Contact M.J. Newell Homes. Get in touch with our team for questions about our homes, Rent to Own program, or to schedule a viewing.",
});

export default function ContactPage() {
  return <ContactPageContent />;
}

