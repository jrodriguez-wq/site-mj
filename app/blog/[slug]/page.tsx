import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import { getPost, getAllPostSlugs } from "@/lib/blog/blog-utils";
import { ArticleContent } from "@/components/blog/article-content";
import { ArticleCTA } from "@/components/blog/article-cta";
import { RelatedArticles } from "@/components/blog/related-articles";
import { generateArticleStructuredData } from "@/lib/seo/article-structured-data";
import { getAllPosts } from "@/lib/blog/blog-utils";
import { getRelatedArticles } from "@/lib/blog/internal-linking";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { PageContent } from "@/components/layout/page-container";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const { frontmatter } = post;
  const imageUrl = frontmatter.image
    ? frontmatter.image.startsWith("http")
      ? frontmatter.image
      : `${SEO_CONFIG.siteUrl}${frontmatter.image}`
    : `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`;

  return generateSEOMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    canonical: `${SEO_CONFIG.siteUrl}/blog/${slug}`,
    keywords: frontmatter.keywords,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${SEO_CONFIG.siteUrl}/blog/${slug}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [imageUrl],
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const structuredData = generateArticleStructuredData(
    {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      slug: post.frontmatter.slug,
      category: post.frontmatter.category,
      date: post.frontmatter.date,
      author: post.frontmatter.author || SEO_CONFIG.siteName,
      keywords: post.frontmatter.keywords || [],
      image: post.frontmatter.image,
      readingTime: post.frontmatter.readingTime || 5,
    },
    post.content
  );

  // Get related articles (server-side)
  const relatedArticles = getRelatedArticles(
    post.frontmatter.slug,
    post.frontmatter.category,
    3
  );

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <PageContent size="lg">
        <nav className="mb-6 md:mb-8" aria-label="Breadcrumb">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </nav>

        <ArticleContent post={post} />

        <div className="mt-14 md:mt-16 pt-10 border-t border-border">
          <ArticleCTA 
            category={post.frontmatter.category} 
            keywords={post.frontmatter.keywords || []}
          />
        </div>

        <div className="mt-12 md:mt-14">
          <RelatedArticles relatedArticles={relatedArticles} />
        </div>
      </PageContent>
    </>
  );
}

