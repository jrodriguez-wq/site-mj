import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Links",
  robots: "noindex, nofollow",
};

export default function PayLinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
