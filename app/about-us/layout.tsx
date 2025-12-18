import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Us | 1,500+ Homes Built | M.J. Newell Homes",
  description: "Learn about M.J. Newell Homes. We've built 1,500+ homes and helped 1,500+ families. Pioneers in Rent to Own program. Founded by Michael J. Newell. Fast response times and dedicated support.",
  canonical: `${SEO_CONFIG.siteUrl}/about-us`,
  keywords: [
    "M.J. Newell Homes",
    "about M.J. Newell Homes",
    "home builder Florida",
    "Michael J. Newell",
    "Florida home builder",
    "new home construction company",
    "rent to own pioneer",
  ],
  openGraph: {
    title: "About Us | M.J. Newell Homes",
    description: "We've built 1,500+ homes and helped 1,500+ families. Pioneers in Rent to Own program with $0 down payment.",
    url: `${SEO_CONFIG.siteUrl}/about-us`,
    type: "website",
  },
});

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
