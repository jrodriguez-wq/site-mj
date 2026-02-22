"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const RECEPTION_PATH = "/reception";

export function ConditionalSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isReception = pathname === RECEPTION_PATH;

  if (isReception) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full">
      <Navbar />
      <main
        className="flex-1 w-full max-w-full pt-[5rem] sm:pt-[5.5rem] md:pt-24"
        id="main-content"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
