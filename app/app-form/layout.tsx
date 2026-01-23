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
          `,
        }}
      />
      <div className="flex min-h-screen flex-col w-full max-w-full">
        <main className="flex-1 w-full max-w-full pt-0" id="main-content">
          {children}
        </main>
      </div>
    </>
  )
}
