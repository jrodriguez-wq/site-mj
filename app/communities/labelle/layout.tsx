import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "LaBelle, Florida",
  description: "New homes in LaBelle, Florida. Family homes on 1/4 acre lots. Rent to Own available. Apply now!",
});

export default function LaBelleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

