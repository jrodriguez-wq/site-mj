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
            {t("warranty.title")}
          </h1>
          <p className="text-xl text-muted-foreground" suppressHydrationWarning>
            {t("warranty.subtitle")}
          </p>
        </div>

        {/* Warranty Coverage - Simplified */}
        <Card>
          <CardHeader>
            <CardTitle suppressHydrationWarning>
              {t("warranty.coverage.title")}
            </CardTitle>
            <CardDescription suppressHydrationWarning>
              {t("warranty.coverage.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-6 space-y-6">
              {/* Structural Warranty */}
              <div className="flex items-start gap-4 p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background hover:border-primary/40 transition-all duration-300">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2" suppressHydrationWarning>
                    {t("warranty.coverage.structural.title")}
                  </h3>
                  <p className="text-lg text-primary font-semibold mb-1" suppressHydrationWarning>
                    {t("warranty.coverage.structural.duration")}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.coverage.structural.description")}
                  </p>
                </div>
              </div>

              {/* Mechanical Warranty */}
              <div className="flex items-start gap-4 p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background hover:border-primary/40 transition-all duration-300">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2" suppressHydrationWarning>
                    {t("warranty.coverage.mechanical.title")}
                  </h3>
                  <p className="text-lg text-primary font-semibold mb-1" suppressHydrationWarning>
                    {t("warranty.coverage.mechanical.duration")}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.coverage.mechanical.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span suppressHydrationWarning>{t("warranty.features.title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold" suppressHydrationWarning>
                    {t("warranty.features.timely.title")}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.features.timely.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeadphonesIcon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold" suppressHydrationWarning>
                    {t("warranty.features.support.title")}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.features.support.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold" suppressHydrationWarning>
                    {t("warranty.features.quality.title")}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.features.quality.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center" suppressHydrationWarning>
              {t("warranty.form.title")}
            </CardTitle>
            <CardDescription className="text-center" suppressHydrationWarning>
              {t("warranty.form.description")}
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

