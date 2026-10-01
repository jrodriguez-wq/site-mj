import { Metadata } from "next";

export interface BlogMetadataInput {
  title: string;
  description: string;
  slug: string;
  image?: string;
  author?: string;
  date?: string;
}

export function generateBlogMetadata(input: BlogMetadataInput): Metadata {
  const url = `https://mjnewellhomes.com/blog/${input.slug}`;
  const image = input.image || "https://mjnewellhomes.com/og-image.png";

  return {
    title: input.title,
    description: input.description,
    keywords: [
      "rent-to-own florida",
      "rent-to-own homes",
      "MJ Newell Homes",
      "LaBelle FL",
      "Lehigh Acres FL",
    ],
    openGraph: {
      type: "article",
      title: input.title,
      description: input.description,
      url: url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
      authors: [input.author || "MJ Newell Homes"],
      publishedTime: input.date,
      tags: ["rent-to-own", "home-buying", "florida-real-estate"],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
      creator: "@MJNewellHomes",
    },
  };
}

export function generateStructuredData(input: BlogMetadataInput & { articleBody?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.title,
    description: input.description,
    image: input.image || "https://mjnewellhomes.com/og-image.png",
    datePublished: input.date || new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: input.author || "MJ Newell Homes",
      url: "https://mjnewellhomes.com",
    },
    publisher: {
      "@type": "Organization",
      name: "MJ Newell Homes",
      logo: {
        "@type": "ImageObject",
        url: "https://mjnewellhomes.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mjnewellhomes.com/blog/${input.slug}`,
    },
  };
}
