import { generateMetadata } from "@/lib/seo/metadata";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata = generateMetadata({
  title: "Home",
  description: "Building American Homes in South Florida. New constructions in LaBelle and Lehigh Acres. Rent to Own programs with $0 down payment.",
});

export default function HomePage() {
  return <HomePageContent />;
}
