import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getPageKeywords } from "@/lib/seo/keyword-utils";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { generateBreadcrumbStructuredData } from "@/lib/seo/structured-data";

export const metadata = generateMetadata({
  title: "Home Buying Guide | Buy a New Home in Florida",
  description:
    "Step-by-step guide to buying a new construction home in Florida from M.J. Newell Homes. Financing, choosing a model, LaBelle & Lehigh Acres — purchase or Rent to Own.",
  canonical: `${SEO_CONFIG.siteUrl}/home-buying-guide`,
  keywords: [
    ...getPageKeywords("sales").slice(0, 30),
    "home buying guide",
    "how to buy a home",
    "buying a new home Florida",
    "first time home buyer guide",
  ],
  openGraph: {
    title: "Home Buying Guide | M.J. Newell Homes",
    description:
      "Complete guide to buying a new construction home in Southwest Florida from a trusted builder.",
    url: `${SEO_CONFIG.siteUrl}/home-buying-guide`,
    type: "website",
  },
});

const breadcrumbSchema = generateBreadcrumbStructuredData([
  { name: "Home", url: SEO_CONFIG.siteUrl },
  { name: "Home Buying Guide", url: `${SEO_CONFIG.siteUrl}/home-buying-guide` },
]);

export default function HomeBuyingGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredDataComponent data={[breadcrumbSchema]} />
      {children}
    </>
  );
}
