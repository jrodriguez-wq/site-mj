import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve Your Home — $500",
  description:
    "Pay the $500 reservation to hold your M.J. Newell home. Checkout is processed securely by HubSpot.",
  robots: "noindex, nofollow",
};

export default function PayLinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
