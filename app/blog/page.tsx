import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getAllPosts } from "@/lib/blog/blog-utils";
import { BlogList } from "@/components/blog/blog-list";
import { PageContent } from "@/components/layout/page-container";
import { BookOpen, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Florida Home Buyer Guides: Taxes, $0 Down, Relocation",
  description:
    "Guides for buying or renting-to-own a new home in LaBelle and Lehigh Acres, including Florida's 4% property-tax discount, 2026 homestead rules, and $0 down for buyers moving from other states.",
  canonical: `${SEO_CONFIG.siteUrl}/blog`,
  keywords: [
    "Florida property tax discount",
    "move to Florida from another state",
    "homestead exemption 2026",
    "rent to own Florida $0 down",
    "LaBelle new construction",
    "Lehigh Acres new homes",
    "Florida vs New Jersey property tax",
    "out of state home buyers Florida",
  ],
  openGraph: {
    title: "Blog | M.J. Newell Homes",
    description: "Guides on Florida property taxes, homestead in 2026, and $0 down rent-to-own for buyers in and outside Florida.",
    url: `${SEO_CONFIG.siteUrl}/blog`,
    type: "website",
  },
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageContent size="xl">
      <div className="space-y-12 md:space-y-16">
        {/* Header Section */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Expert Resources & Guides</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-tight">
            Blog & Resources
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Practical guides for buying a new home in LaBelle or Lehigh Acres, including the tax rules that matter if you are moving from another state.
          </p>
        </header>

        <section aria-labelledby="relocation-guides" className="rounded-2xl border border-border bg-muted/40 p-6 md:p-8">
          <h2 id="relocation-guides" className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Moving to Florida
          </h2>
          <p className="mt-3 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Florida has no state income tax, a 4% discount for paying property taxes in November, and a 2026 homestead exemption of up to $51,411. Buyers who are not ready for a mortgage can move in with $0 down.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["/blog/out-of-state-buyer-florida-home-questions-answered", "Questions from out-of-state buyers"],
              ["/blog/florida-property-tax-early-payment-discount", "The 4% property-tax discount"],
              ["/blog/florida-property-taxes-vs-new-jersey-illinois-new-york", "Florida vs New Jersey, Illinois, and New York"],
              ["/blog/homestead-exemption-2026-for-new-florida-residents", "Homestead exemption in 2026"],
              ["/blog/zero-down-rent-to-own-for-out-of-state-buyers-florida", "$0 down rent-to-own from another state"],
              ["/blog/what-to-budget-buying-in-labelle-and-lehigh-acres", "What to budget in LaBelle and Lehigh Acres"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-primary font-medium underline-offset-4 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Blog Posts Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Latest Articles
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
            <span className="text-sm text-muted-foreground font-medium">
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          <BlogList posts={posts} />
        </div>
      </div>
    </PageContent>
  );
}
