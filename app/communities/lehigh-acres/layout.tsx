import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "Lehigh Acres, Florida",
  description: "New homes in Lehigh Acres, Florida. Enjoy 5 years of rent stability. Apply now!",
});

export default function LehighAcresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

