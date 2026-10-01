"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { HUBSPOT_FORMS } from "@/lib/constants";
import { PageContent } from "@/components/layout/page-container";
import { SEO_CONFIG } from "@/config/seo";
import { ArrowLeft, FileText } from "lucide-react";

export default function RtoApplicationPage() {
  const redirectUrl = useMemo(() => {
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : SEO_CONFIG.siteUrl;
    return `${baseUrl}/thank-you?type=rent-to-own`;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PageContent size="md" className="pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="mb-6 sm:mb-8">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground -ml-2">
            <Link href="/rent-to-own" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Rent to Own
            </Link>
          </Button>
        </div>

        <Card className="border-2 border-border/60 shadow-xl overflow-hidden">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-2">
              <div className="p-3 rounded-full bg-primary/10">
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-black">
              Rent to Own Application
            </CardTitle>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto" />
            <CardDescription className="text-sm sm:text-base pt-2 text-muted-foreground max-w-xl mx-auto">
              Complete the form below and we&apos;ll review your application. No credit check required for initial application.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 md:px-8 pb-8 sm:pb-10">
            <HubSpotForm
              portalId={HUBSPOT_FORMS.RENT_TO_OWN.portalId}
              formId={HUBSPOT_FORMS.RENT_TO_OWN.formId}
              region={HUBSPOT_FORMS.RENT_TO_OWN.region}
              redirectUrl={redirectUrl}
              className="w-full"
            />
          </CardContent>
        </Card>

        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6">
          Need help?{" "}
          <Link href="/contact" className="text-primary font-medium underline underline-offset-2 hover:no-underline">
            Contact us
          </Link>
        </p>
      </PageContent>
    </div>
  );
}
