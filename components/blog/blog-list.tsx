"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPostMetadata } from "@/types/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { cn } from "@/lib/utils";

interface BlogListProps {
  posts: BlogPostMetadata[];
}

export const BlogList = ({ posts }: BlogListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
      {posts.map((post, index) => {
        const publishedDate = new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        
        // Use relative path directly for Next.js Image
        const imageSrc = post.image && !post.image.startsWith("http") 
          ? post.image 
          : "/img/hero/1w5a0754-e4.webp";

        return (
          <AnimatedCard key={post.slug} index={index}>
            <Card className="group relative flex flex-col overflow-hidden h-full border border-border/60 hover:border-primary/60 bg-card/98 backdrop-blur-sm transition-all duration-200 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 rounded-2xl">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-0" />
              
              {/* Image Section - Optimized height */}
              <Link 
                href={`/blog/${post.slug}`} 
                className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden bg-muted/50"
                aria-label={`Read article: ${post.title}`}
              >
                <Image
                  src={imageSrc}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  quality={90}
                  priority={index < 3}
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-200" />
                
                {/* Category Badge on Image */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground shadow-lg backdrop-blur-sm border border-primary/20">
                    {post.category}
                  </span>
                </div>
              </Link>
              
              <CardHeader className="flex-1 relative z-10 px-5 sm:px-6 pt-5 pb-3">
                <CardTitle className="text-lg sm:text-xl md:text-xl font-bold mb-2.5 line-clamp-2 group-hover:text-primary transition-colors duration-200 leading-tight">
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="hover:underline decoration-2 underline-offset-4"
                    tabIndex={0}
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                
                <CardDescription className="text-sm sm:text-base text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0 pb-5 px-5 sm:px-6 relative z-10 flex flex-col justify-between flex-1">
                {/* Meta Information */}
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4 pb-3 border-b border-border/40">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary/70" />
                    <time dateTime={post.date} className="font-medium">
                      {publishedDate}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary/70" />
                    <span className="font-medium">{post.readingTime} min</span>
                  </div>
                </div>
                
                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm sm:text-base hover:gap-3 transition-all duration-200 group/link w-fit"
                  tabIndex={0}
                  aria-label={`Read full article: ${post.title}`}
                >
                  <span>Read more</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          </AnimatedCard>
        );
      })}
    </div>
  );
};
