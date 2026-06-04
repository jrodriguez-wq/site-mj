"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCopy } from "@/lib/constants/copy";
import { GoogleReviewsLink } from "@/components/reviews/google-reviews-link";

export const CTASection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-background px-2">
            {getCopy("cta.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-background/80 px-4">
            {getCopy("cta.subtitle")}
          </p>
          <div className="flex flex-col items-center gap-4 sm:gap-5 pt-2 sm:pt-4 w-full px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 rounded-xl"
              >
                <Link
                  href="/new-homes-for-sale"
                  aria-label="View new construction homes for sale in Florida"
                >
                  <span>{getCopy("cta.viewHomesForSale")}</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold border-2 border-background/40 bg-transparent text-white hover:text-white hover:bg-background/10 hover:border-background/60 transition-all duration-300 rounded-xl backdrop-blur-sm"
              >
                <Link
                  href="/rent-to-own#rto-application-form"
                  aria-label="Apply for Rent to Own program - $0 down payment"
                >
                  {getCopy("cta.applyNow")}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold border-2 border-background/40 bg-transparent text-white hover:text-white hover:bg-background/10 hover:border-background/60 transition-all duration-300 rounded-xl backdrop-blur-sm"
              >
                <Link
                  href="/schedule-appointment"
                  aria-label="Schedule appointment to buy a new home in Florida"
                >
                  {getCopy("cta.schedule")}
                </Link>
              </Button>
            </div>
            <GoogleReviewsLink
              variant="ghost"
              className="text-background/90 hover:text-background border-background/30 hover:border-background/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
