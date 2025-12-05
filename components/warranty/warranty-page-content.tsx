"use client";

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { PageContent } from "@/components/layout/page-container";
import { useTranslation } from "@/hooks/use-translation";
import { Shield, CheckCircle2, Clock, HeadphonesIcon } from "lucide-react";
import { SEO_CONFIG } from "@/config/seo";

export const WarrantyPageContent = () => {
  const { t } = useTranslation();

  const redirectUrl = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : SEO_CONFIG.siteUrl;
    return `${baseUrl}/thank-you?type=warranty`;
  }, []);

  return (
    <PageContent size="md">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" suppressHydrationWarning>
            {t("warranty.title") || "Warranty & Service"}
          </h1>
          <p className="text-xl text-muted-foreground" suppressHydrationWarning>
            {t("warranty.subtitle") || "We stand behind our quality construction"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle suppressHydrationWarning>
              {t("warranty.coverage.title") || "Our Warranty Coverage"}
            </CardTitle>
            <CardDescription suppressHydrationWarning>
              {t("warranty.coverage.description") || "M.J. Newell Homes provides comprehensive warranty coverage for all new construction homes."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold" suppressHydrationWarning>
                    {t("warranty.features.comprehensive.title") || "Comprehensive Coverage"}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.features.comprehensive.description") || "Full warranty protection for your new home"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold" suppressHydrationWarning>
                    {t("warranty.features.timely.title") || "Timely Response"}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.features.timely.description") || "Quick response to all service requests"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeadphonesIcon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold" suppressHydrationWarning>
                    {t("warranty.features.support.title") || "Dedicated Support"}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.features.support.description") || "Expert team ready to help"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold" suppressHydrationWarning>
                    {t("warranty.features.quality.title") || "Quality Guaranteed"}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.features.quality.description") || "We ensure your home remains in excellent condition"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center" suppressHydrationWarning>
              {t("warranty.form.title") || "Submit Warranty Request"}
            </CardTitle>
            <CardDescription className="text-center" suppressHydrationWarning>
              {t("warranty.form.description") || "Fill out the form below to submit a warranty or service request. Our team will review your request and contact you shortly."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HubSpotForm
              portalId="50215941"
              formId="6c15d23c-5273-4555-b4cc-b5fb7cfe7b67"
              region="na1"
              redirectUrl={redirectUrl}
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>
    </PageContent>
  );
};

