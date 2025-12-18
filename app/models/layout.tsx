import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "Our Models",
  description: "Explore our complete collection of beautifully designed homes. View floor plans, specifications, and pricing for all available models.",
});

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

