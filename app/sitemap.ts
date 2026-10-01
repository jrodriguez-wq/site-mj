import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { SEO_CONFIG } from "@/config/seo";
import { SITEMAP_CONFIG } from "@/config/seo/sitemap-config";

const MODEL_KEYS = [
  "louisiana",
  "viana",
  "delanie",
  "aurora",
  "langdon",
  "emelia",
  "duplex",
] as const;

interface BlogPost {
  slug: string;
  date: string;
}

function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return null;

      const frontmatter = frontmatterMatch[1];
      const slugMatch = frontmatter.match(/slug:\s*(.+)/);
      const dateMatch = frontmatter.match(/date:\s*(.+)/);

      return {
        slug: slugMatch ? slugMatch[1].trim() : "",
        date: dateMatch ? dateMatch[1].trim() : new Date().toISOString(),
      };
    })
    .filter((post) => post !== null) as BlogPost[];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const mainEntries: MetadataRoute.Sitemap = SITEMAP_CONFIG.mainRoutes.map(
    (route) => ({
      url: route.path ? `${baseUrl}${route.path}` : baseUrl,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })
  );

  const modelEntries: MetadataRoute.Sitemap = MODEL_KEYS.map((model) => ({
    url: `${baseUrl}/models/${model}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPosts = getBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.85,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return [...mainEntries, ...modelEntries, ...blogEntries];
}
