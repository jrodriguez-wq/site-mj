import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Office reception",
  description: "Welcome. Check-in for your appointment or schedule a new one.",
  robots: "noindex, nofollow",
};

export default function ReceptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
