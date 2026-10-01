"use client";

import Link from "next/link";
import { BlogPostMetadata } from "@/types/blog";
import { getRelatedPosts } from "@/lib/blog-relations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface RelatedPostsProps {
  currentSlug: string;
  allPosts: BlogPostMetadata[];
}

export function RelatedPosts({ currentSlug, allPosts }: RelatedPostsProps) {
  const relatedSlugs = getRelatedPosts(currentSlug, 3);
  const relatedPosts = allPosts.filter((post) => relatedSlugs.includes(post.slug));

  if (relatedPosts.length === 0) return null;

  return (
    <section className="my-12 pt-8 border-t">
      <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="group h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center text-primary gap-2 text-sm">
                Read more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
