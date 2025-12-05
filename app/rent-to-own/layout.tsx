import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "Rent to Own",
  description: "Transform your rent payment into homeownership. Rent one of our brand-new homes with an option to buy. Part of your monthly rent goes towards the down payment!",
});

export default function RentToOwnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

