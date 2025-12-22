import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { RentalApplicationContent } from "@/components/rental-application/rental-application-content";

export const metadata = generateMetadata({
  title: "Rental Application | M.J. Newell Homes",
  description: "Apply for our Rent to Own program. Start your journey to homeownership with M.J. Newell Homes in Florida.",
  canonical: `${SEO_CONFIG.siteUrl}/rental-application`,
  keywords: [
    "rental application",
    "rent to own application",
    "apply for home",
    "Florida rental application",
    "home application",
  ],
  openGraph: {
    title: "Rental Application | M.J. Newell Homes",
    description: "Apply for our Rent to Own program. Start your journey to homeownership today.",
    url: `${SEO_CONFIG.siteUrl}/rental-application`,
    type: "website",
  },
});

export default function RentalApplicationPage() {
  return <RentalApplicationContent />;
}

