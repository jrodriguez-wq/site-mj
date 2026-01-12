"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BlogPost } from "@/types/blog";
import { Clock, Calendar, User, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleContentProps {
  post: BlogPost;
  className?: string;
}

export const ArticleContent = ({ post, className }: ArticleContentProps) => {
  const { frontmatter, content } = post;
  const publishedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className={cn("prose prose-lg max-w-none", className)}>
      {/* Article Header */}
      <header className="mb-8 md:mb-12 pb-6 md:pb-8 border-b border-border">
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            <Tag className="h-3.5 w-3.5" />
            {frontmatter.category}
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 md:mb-6 leading-tight tracking-tight">
          {frontmatter.title}
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-4xl">
          {frontmatter.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={frontmatter.date}>{publishedDate}</time>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{frontmatter.author}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{frontmatter.readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* Article Body - Markdown Content */}
      <div className="article-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Headings
            h1: ({ ...props }) => (
              <h1 className="text-4xl md:text-5xl font-black text-foreground mt-10 mb-6 leading-tight tracking-tight" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-10 mb-5 leading-tight tracking-tight" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-8 mb-4 leading-tight" {...props} />
            ),
            h4: ({ ...props }) => (
              <h4 className="text-xl md:text-2xl font-semibold text-foreground mt-6 mb-3 leading-tight" {...props} />
            ),
            h5: ({ ...props }) => (
              <h5 className="text-lg md:text-xl font-semibold text-foreground mt-5 mb-3" {...props} />
            ),
            h6: ({ ...props }) => (
              <h6 className="text-base md:text-lg font-semibold text-foreground mt-4 mb-2" {...props} />
            ),
            
            // Paragraphs
            p: ({ ...props }) => (
              <p className="text-base md:text-lg text-foreground/90 mb-5 leading-relaxed" {...props} />
            ),
            
            // Lists
            ul: ({ ...props }) => (
              <ul className="list-disc list-inside mb-5 space-y-2 text-base md:text-lg text-foreground/90 marker:text-primary" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal list-inside mb-5 space-y-2 text-base md:text-lg text-foreground/90 marker:text-primary marker:font-semibold" {...props} />
            ),
            li: ({ ...props }) => (
              <li className="ml-4 pl-2 leading-relaxed" {...props} />
            ),
            
            // Links
            a: ({ ...props }) => (
              <a
                className="text-primary hover:text-primary/80 underline underline-offset-4 font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            
            // Strong and Emphasis
            strong: ({ ...props }) => (
              <strong className="font-bold text-foreground" {...props} />
            ),
            em: ({ ...props }) => (
              <em className="italic" {...props} />
            ),
            
            // Blockquotes
            blockquote: ({ ...props }) => (
              <blockquote
                className="border-l-4 border-primary pl-6 py-4 my-6 bg-muted/30 italic text-lg text-muted-foreground"
                {...props}
              />
            ),
            
            // Code
            code: ({ className, ...props }: { className?: string; children?: React.ReactNode }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code
                    className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-foreground"
                    {...props}
                  />
                );
              }
              return (
                <code
                  className="block p-4 rounded-lg bg-muted text-sm font-mono text-foreground overflow-x-auto mb-5"
                  {...props}
                />
              );
            },
            pre: ({ ...props }) => (
              <pre className="mb-5 overflow-x-auto" {...props} />
            ),
            
            // Horizontal Rule
            hr: ({ ...props }) => (
              <hr className="my-8 border-border" {...props} />
            ),
            
            // Images - Using img tag for now as react-markdown doesn't support Next.js Image directly
            img: ({ alt, ...props }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="rounded-lg my-6 w-full h-auto"
                alt={alt || ""}
                {...props}
              />
            ),
            
            // Tables
            table: ({ ...props }) => (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-border" {...props} />
              </div>
            ),
            thead: ({ ...props }) => (
              <thead className="bg-muted" {...props} />
            ),
            tbody: ({ ...props }) => (
              <tbody {...props} />
            ),
            tr: ({ ...props }) => (
              <tr className="border-b border-border" {...props} />
            ),
            th: ({ ...props }) => (
              <th className="border border-border px-4 py-2 text-left font-semibold text-foreground" {...props} />
            ),
            td: ({ ...props }) => (
              <td className="border border-border px-4 py-2 text-foreground/90" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};
