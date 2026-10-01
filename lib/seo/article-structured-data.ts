import { SEO_CONFIG } from "@/config/seo";
import { BlogPostMetadata } from "@/types/blog";
import { StructuredData } from "@/types/seo";

export interface ArticleStructuredData extends StructuredData {
  "@type": "Article";
  headline: string;
  description: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": "Organization" | "Person";
    name: string;
    url?: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  keywords?: string;
  articleSection?: string;
  wordCount?: number;
  timeRequired?: string;
}

/**
 * Genera structured data para un artículo de blog (Article schema)
 */
export const generateArticleStructuredData = (
  post: BlogPostMetadata,
  content: string
): ArticleStructuredData => {
  const url = `${SEO_CONFIG.siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${SEO_CONFIG.siteUrl}${post.image}`
    : `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`;

  const wordCount = content.split(/\s+/).length;
  const readingTimeInMinutes = post.readingTime || Math.ceil(wordCount / 200);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: "en-US",
    image: imageUrl,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: post.author,
      url: SEO_CONFIG.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    wordCount,
    timeRequired: `PT${readingTimeInMinutes}M`,
  };
};

