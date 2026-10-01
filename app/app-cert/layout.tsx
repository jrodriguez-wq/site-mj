import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certification Form",
  robots: "noindex, nofollow",
};

export default function AppFormLayout({
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
            #hubspot-form-container-app-cert {
              min-height: 400px;
            }
            #hubspot-form-container-app-cert iframe,
            #hubspot-form-container-app-cert form {
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
