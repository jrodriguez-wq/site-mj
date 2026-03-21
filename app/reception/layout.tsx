import type { Metadata, Viewport } from "next";
import "./reception-kiosk.css";

export const metadata: Metadata = {
  title: "Office reception",
  description: "Welcome. Check-in for your appointment or schedule a new one.",
  robots: "noindex, nofollow",
};

/** Solid browser UI color for kiosk displays (embedded WebKit). */
export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "dark light",
};

export default function ReceptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
