import { generateMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getAllPosts } from "@/lib/blog/blog-utils";
import { BlogList } from "@/components/blog/blog-list";
import { PageContent } from "@/components/layout/page-container";
import { BookOpen, FileText } from "lucide-react";

export const metadata = generateMetadata({
  title: "Blog | Real Estate Guides & Resources | M.J. Newell Homes",
  description: "Expert guides and resources about rent to own, home buying, taxes, and real estate in Florida. Learn everything you need to know about homeownership from M.J. Newell Homes.",
  canonical: `${SEO_CONFIG.siteUrl}/blog`,
  keywords: [
    "real estate blog",
    "home buying guide",
    "rent to own guide",
    "florida real estate",
    "home buying tips",
    "real estate resources",
    "homeownership guide",
  ],
  openGraph: {
    title: "Blog | M.J. Newell Homes",
    description: "Expert guides and resources about rent to own, home buying, and real estate in Florida.",
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
            Expert guides and resources to help you on your homeownership journey in Florida. Learn about rent-to-own, taxes, financing, and everything you need to know about buying a home.
          </p>
        </header>

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
