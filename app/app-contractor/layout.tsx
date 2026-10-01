import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contractor Application",
  robots: "noindex, nofollow",
};

export default function AppContractorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header[role="banner"],
            header.fixed {
              display: none !important;
            }
            #hubspot-form-container-app-contractor {
              min-height: 400px;
            }
            #hubspot-form-container-app-contractor iframe,
            #hubspot-form-container-app-contractor form {
              width: 100% !important;
              max-width: 100% !important;
            }
          `,
        }}
      />
      <div className="flex min-h-screen flex-col w-full max-w-full">
        <main className="flex-1 w-full max-w-full pt-0 flex items-center justify-center" id="main-content">
          {children}
        </main>
      </div>
    </>
  )
}
