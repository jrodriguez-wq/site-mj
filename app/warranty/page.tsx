import { generateMetadata } from "@/lib/seo/metadata";
import { WarrantyPageContent } from "@/components/warranty/warranty-page-content";

export const metadata = generateMetadata({
  title: "Warranty & Service",
  description: "Submit a warranty or service request for your M.J. Newell Home. We provide comprehensive warranty coverage and dedicated support for all our new construction homes.",
});

export default function WarrantyPage() {
  return <WarrantyPageContent />;
}
