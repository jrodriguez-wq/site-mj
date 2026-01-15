import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getLocalKeywords } from "@/config/keywords";

export const metadata = generateMetadata({
  title: "About Us | M.J. Newell Homes | Southwest Florida Home Builder",
  description: "Learn about M.J. Newell Homes, a leading home builder in Southwest Florida. Founded by Michael J. Newell, we've built 1,500+ homes in LaBelle and Lehigh Acres. Pioneers in Rent to Own programs. Quality, affordable housing for American families.",
  canonical: `${SEO_CONFIG.siteUrl}/about-us`,
  keywords: [
    ...getLocalKeywords().slice(0, 15),
    "about M.J. Newell Homes",
    "home builder about",
    "Florida home builder",
    "Southwest Florida builder",
    "Michael J. Newell",
    "home builder history",
    "home builder experience",
    "affordable housing builder",
    "quality home builder",
  ],
  openGraph: {
    title: "About Us | M.J. Newell Homes",
    description: "Learn about M.J. Newell Homes, a leading home builder in Southwest Florida. Founded by Michael J. Newell, we've built 1,500+ homes.",
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
