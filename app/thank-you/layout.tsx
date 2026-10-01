import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You",
  robots: "noindex, nofollow",
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
