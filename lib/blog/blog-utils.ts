import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogPostFrontmatter, BlogPostMetadata } from "@/types/blog";
import { SEO_CONFIG } from "@/config/seo";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "blog");

/**
 * Calcula el tiempo de lectura estimado en minutos
 */
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Lee y parsea un archivo Markdown
 */
const getPostBySlug = (slug: string): BlogPost | null => {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    const frontmatter: BlogPostFrontmatter = {
      title: data.title || "",
      description: data.description || "",
      slug: data.slug || slug,
      category: data.category || "General",
      date: data.date || new Date().toISOString(),
      author: data.author || SEO_CONFIG.siteName,
      keywords: data.keywords || [],
      image: data.image,
      readingTime: data.readingTime || calculateReadingTime(content),
    };
    
    return {
      frontmatter,
      content,
      slug: frontmatter.slug,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
};

/**
 * Obtiene todos los slugs de artículos
 */
export const getAllPostSlugs = (): string[] => {
  try {
    if (!fs.existsSync(POSTS_DIRECTORY)) {
      return [];
    }
    
    const files = fs.readdirSync(POSTS_DIRECTORY);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
};

/**
 * Obtiene todos los artículos ordenados por fecha (más recientes primero)
 */
export const getAllPosts = (): BlogPostMetadata[] => {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      
      const metadata: BlogPostMetadata = {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        slug: post.frontmatter.slug,
        category: post.frontmatter.category,
        date: post.frontmatter.date,
        author: post.frontmatter.author || SEO_CONFIG.siteName,
        keywords: post.frontmatter.keywords || [],
        readingTime: post.frontmatter.readingTime || calculateReadingTime(post.content),
      };
      
      if (post.frontmatter.image) {
        metadata.image = post.frontmatter.image;
      }
      
      return metadata;
    })
    .filter((post): post is BlogPostMetadata => post !== null)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  
  return posts;
};

/**
 * Obtiene un artículo por slug
 */
export const getPost = (slug: string): BlogPost | null => {
  return getPostBySlug(slug);
};

/**
 * Obtiene artículos por categoría
 */
export const getPostsByCategory = (category: string): BlogPostMetadata[] => {
  return getAllPosts().filter((post) => post.category === category);
};

/**
 * Obtiene todas las categorías únicas
 */
export const getAllCategories = (): string[] => {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
};

