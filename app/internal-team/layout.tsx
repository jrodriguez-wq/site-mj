import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "Internal Team | M.J. Newell Homes",
  description: "Internal team — warranty scheduling.",
  robots: { index: false, follow: false },
});

export default function InternalTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header[role="banner"],
            header.fixed,
            nav[role="navigation"].fixed {
              display: none !important;
            }
            footer {
              display: none !important;
            }
          `,
        }}
      />
      <div className="flex min-h-screen flex-col w-full max-w-full">
        <main className="flex-1 w-full max-w-full pt-0" id="main-content">
          {children}
        </main>
      </div>
    </>
  );
}
