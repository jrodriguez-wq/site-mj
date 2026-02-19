"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
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
    <article className={cn("max-w-none", className)}>
      {/* Back link / breadcrumb - minimal */}
      <header className="mb-6 md:mb-10">
        {/* Category pill */}
        <div className="mb-5 md:mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide">
            <Tag className="h-3.5 w-3.5" />
            {frontmatter.category}
          </span>
        </div>

        {/* Title - clear hierarchy */}
        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.25rem] font-black text-foreground mb-4 md:mb-5 leading-[1.12] tracking-tight max-w-4xl">
          {frontmatter.title}
        </h1>

        {/* Description / lead */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-3xl font-medium">
          {frontmatter.description}
        </p>

        {/* Meta row - date, author, reading time */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary/70" />
            <time dateTime={frontmatter.date}>{publishedDate}</time>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary/70" />
            <span>{frontmatter.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary/70" />
            <span>{frontmatter.readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* Featured image - full width, elegant */}
      {frontmatter.image && (
        <figure className="mb-8 md:mb-12 -mx-4 sm:mx-0">
          <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-muted aspect-[16/10] sm:aspect-[2/1] md:aspect-[21/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={frontmatter.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              decoding="async"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
            />
          </div>
        </figure>
      )}

      {/* Divider between header and body */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8 md:mb-10" />

      {/* Article body - Markdown */}
      <div className="article-content prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-3xl md:text-4xl font-black text-foreground mt-12 mb-5 leading-tight tracking-tight border-b border-border pb-3" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 leading-tight tracking-tight border-b border-border pb-2" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-3 leading-tight" {...props} />
            ),
            h4: ({ ...props }) => (
              <h4 className="text-lg md:text-xl font-semibold text-foreground mt-8 mb-2 leading-tight" {...props} />
            ),
            h5: ({ ...props }) => (
              <h5 className="text-base md:text-lg font-semibold text-foreground mt-6 mb-2" {...props} />
            ),
            h6: ({ ...props }) => (
              <h6 className="text-base font-semibold text-muted-foreground mt-5 mb-2" {...props} />
            ),

            p: ({ ...props }) => (
              <p className="text-base md:text-lg text-foreground/90 mb-6 leading-[1.7] max-w-3xl" {...props} />
            ),

            ul: ({ ...props }) => (
              <ul className="list-disc list-outside ml-5 md:ml-6 mb-6 space-y-2 text-base md:text-lg text-foreground/90 marker:text-primary pl-2 max-w-3xl" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal list-outside ml-5 md:ml-6 mb-6 space-y-2 text-base md:text-lg text-foreground/90 marker:font-semibold marker:text-primary pl-2 max-w-3xl" {...props} />
            ),
            li: ({ ...props }) => (
              <li className="leading-[1.7] pl-1" {...props} />
            ),

            a: ({ ...props }) => (
              <a
                className="text-primary hover:text-primary/80 underline underline-offset-4 font-medium transition-colors decoration-2"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),

            strong: ({ ...props }) => (
              <strong className="font-bold text-foreground" {...props} />
            ),
            em: ({ ...props }) => (
              <em className="italic text-foreground/95" {...props} />
            ),

            blockquote: ({ ...props }) => (
              <blockquote
                className="border-l-4 border-primary pl-6 pr-4 py-4 my-8 bg-muted/40 rounded-r-xl text-lg text-muted-foreground italic max-w-3xl"
                {...props}
              />
            ),

            code: ({ className, ...props }: { className?: string; children?: React.ReactNode }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code
                    className="px-1.5 py-0.5 rounded-md bg-muted text-sm font-mono text-foreground"
                    {...props}
                  />
                );
              }
              return (
                <code
                  className="block p-4 rounded-xl bg-muted/80 text-sm font-mono text-foreground overflow-x-auto my-6"
                  {...props}
                />
              );
            },
            pre: ({ ...props }) => (
              <pre className="my-6 overflow-x-auto rounded-xl" {...props} />
            ),

            hr: ({ ...props }) => (
              <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" {...props} />
            ),

            /* In-content images: constrained width, rounded, shadow, with space for caption */
            img: ({ alt, src, ...props }) => (
              <span className="block my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt || ""}
                  aria-label={alt || "Article image"}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-3xl mx-auto rounded-2xl shadow-lg object-cover border border-border/50"
                  {...props}
                />
              </span>
            ),
            figure: ({ ...props }) => (
              <figure className="my-10 space-y-3 max-w-3xl mx-auto" {...props} />
            ),
            figcaption: ({ ...props }) => (
              <figcaption className="text-sm text-muted-foreground text-center leading-relaxed px-2" {...props} />
            ),

            /* Wrap img inside figure: make figure the container for image + caption */
            // ReactMarkdown wraps ![alt](src) in <p>; markdown with ![alt](src)\n*caption* might render as p + em. So we style img and figcaption via figure when present.
            iframe: ({ src, title, ...props }) => {
              if (!src) return null;
              return (
                <div className="my-10 overflow-hidden rounded-2xl shadow-lg border border-border/50">
                  <div className="relative aspect-video">
                    <iframe
                      src={src as string}
                      title={title || "Embedded media"}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      {...props}
                    />
                  </div>
                </div>
              );
            },

            table: ({ ...props }) => (
              <div className="overflow-x-auto my-8 rounded-xl border border-border">
                <table className="min-w-full border-collapse" {...props} />
              </div>
            ),
            thead: ({ ...props }) => (
              <thead className="bg-muted/60" {...props} />
            ),
            tbody: ({ ...props }) => (
              <tbody className="divide-y divide-border" {...props} />
            ),
            tr: ({ ...props }) => (
              <tr className="border-b border-border last:border-0" {...props} />
            ),
            th: ({ ...props }) => (
              <th className="border-b border-border px-4 py-3 text-left text-sm font-semibold text-foreground" {...props} />
            ),
            td: ({ ...props }) => (
              <td className="px-4 py-3 text-sm text-foreground/90" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};
