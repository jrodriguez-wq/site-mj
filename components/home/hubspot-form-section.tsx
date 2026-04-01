"use client";

import { useMemo } from "react";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO_CONFIG } from "@/config/seo";
import { GoogleReviewsLink } from "@/components/reviews/google-reviews-link";

export const HubSpotFormSection = () => {
  const redirectUrl = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : SEO_CONFIG.siteUrl;
    return `${baseUrl}/thank-you?type=contact`;
  }, []);

  return (
    <section id="quick-register-form" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter px-2" suppressHydrationWarning>
              Request more information
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4" suppressHydrationWarning>
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center" suppressHydrationWarning>
                Contact Us
              </CardTitle>
              <CardDescription className="text-center" suppressHydrationWarning>
                We&apos;re here to help you find your dream home.
              </CardDescription>
              <div className="flex justify-center pt-2">
                <GoogleReviewsLink variant="outline" className="text-sm" />
              </div>
            </CardHeader>
            <CardContent>
              <HubSpotForm
                portalId="50215941"
                formId="93068cd5-cb63-461a-b7a6-00a3ca4fcd0a"
                region="na1"
                redirectUrl={redirectUrl}
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

