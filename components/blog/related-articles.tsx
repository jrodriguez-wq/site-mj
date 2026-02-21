"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPostMetadata } from "@/types/blog";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clock, Calendar } from "lucide-react";

interface RelatedArticlesProps {
  relatedArticles: BlogPostMetadata[];
}

export const RelatedArticles = ({ relatedArticles }: RelatedArticlesProps) => {
  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 md:mt-16 py-8 md:py-12 border-t border-border">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Related Articles
        </h2>
        <p className="text-muted-foreground">
          Continue reading with these related guides
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedArticles.map((article) => {
          const publishedDate = new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const imageSrc = article.image && !article.image.startsWith("http")
            ? getCloudinaryImageUrl(article.image)
            : getCloudinaryImageUrl("/img/hero/1w5a0754-e4.webp");

          return (
            <Card key={article.slug} className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-border/50 hover:border-primary/50">
              <Link href={`/blog/${article.slug}`}>
                <div className="relative h-48 overflow-hidden bg-muted/50">
                  <Image
                    src={imageSrc}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-primary/95 backdrop-blur-sm text-primary-foreground">
                      {article.category}
                    </span>
                  </div>
                </div>
              </Link>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {article.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={article.date}>{publishedDate}</time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    <span>{article.readingTime} min</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all group/link"
                >
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
