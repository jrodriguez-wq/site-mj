import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Office reception",
  description: "Welcome. New client registration, schedule an appointment, or check-in.",
  robots: "noindex, nofollow",
};

export default function ReceptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
