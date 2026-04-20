import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

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
  const blogPosts = getBlogPosts();
  const baseUrl = "https://mjnewellhomes.com";

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  return [...staticPages, ...blogEntries];
}
