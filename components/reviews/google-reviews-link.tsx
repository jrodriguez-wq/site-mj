"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/config/seo";
import { cn } from "@/lib/utils";

interface GoogleReviewsLinkProps {
  variant?: "default" | "outline" | "ghost" | "link";
  showRating?: boolean;
  className?: string;
}

export const GoogleReviewsLink = ({ 
  variant = "outline", 
  showRating = true,
  className 
}: GoogleReviewsLinkProps) => {
  return (
    <Button
      asChild
      variant={variant}
      className={className}
    >
      <Link
        href={GOOGLE_REVIEWS.googleBusinessProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2"
      >
        {showRating && (
          <>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{GOOGLE_REVIEWS.ratingValue}</span>
            </div>
            <span className="text-muted-foreground">
              ({GOOGLE_REVIEWS.reviewCount} reviews)
            </span>
          </>
        )}
        <span>View on Google</span>
        <ExternalLink className="h-4 w-4" />
      </Link>
    </Button>
  );
};

