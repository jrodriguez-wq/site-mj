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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
            <Card className="group relative flex flex-col overflow-hidden h-full border-2 border-border/50 hover:border-primary/50 bg-card/95 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
              
              {/* Image Section */}
              <Link 
                href={`/blog/${post.slug}`} 
                className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden bg-muted/50"
              >
                <Image
                  src={imageSrc}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Category Badge on Image */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-primary/95 backdrop-blur-sm text-primary-foreground shadow-lg border border-primary/30">
                    {post.category}
                  </span>
                </div>
              </Link>
              
              <CardHeader className="flex-1 relative z-10 px-6 pt-6 pb-4">
                <CardTitle className="text-xl md:text-2xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  <Link href={`/blog/${post.slug}`} className="hover:underline decoration-2 underline-offset-4">
                    {post.title}
                  </Link>
                </CardTitle>
                
                <CardDescription className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0 pb-6 px-6 relative z-10">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground mb-5 pb-4 border-b border-border/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary/70" />
                    <time dateTime={post.date} className="font-medium">
                      {publishedDate}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary/70" />
                    <span className="font-medium">{post.readingTime} min read</span>
                  </div>
                </div>
                
                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/link"
                >
                  <span>Read more</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          </AnimatedCard>
        );
      })}
    </div>
  );
};
