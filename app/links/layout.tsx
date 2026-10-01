import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links",
  description: "M.J. Newell Homes — website and social profiles.",
  robots: "noindex, nofollow",
};

export default function LinksLayout({
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
            footer {
              display: none !important;
            }
            #main-content {
              padding-top: 0 !important;
            }
          `,
        }}
      />
      {children}
    </>
  );
}
