import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "About Us",
  description: "Learn about M.J. Newell Homes. Building American homes in South Florida with over 15 years of experience.",
});

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

