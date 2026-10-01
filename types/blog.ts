export interface BlogPostFrontmatter {
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  author?: string;
  keywords?: string[];
  image?: string;
  readingTime?: number;
}

export interface BlogPost {
  frontmatter: BlogPostFrontmatter;
  content: string;
  slug: string;
}

export interface BlogPostMetadata {
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  keywords: string[];
  image?: string;
  readingTime: number;
}

