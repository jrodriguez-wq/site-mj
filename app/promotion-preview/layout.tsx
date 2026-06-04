import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promotion Preview",
  robots: "noindex, nofollow",
};

export default function PromotionPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
