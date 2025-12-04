"use client";

import { HubSpotForm } from "@/components/ui/hubspot-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";

export const HubSpotFormSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" suppressHydrationWarning>
              {t("contactForm.title") || "Get in Touch"}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl" suppressHydrationWarning>
              {t("contactForm.subtitle") || "Fill out the form below and we'll get back to you as soon as possible."}
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center" suppressHydrationWarning>
                {t("contactForm.formTitle") || "Contact Us"}
              </CardTitle>
              <CardDescription className="text-center" suppressHydrationWarning>
                {t("contactForm.formDescription") || "We're here to help you find your dream home."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HubSpotForm
                portalId="50215941"
                formId="93068cd5-cb63-461a-b7a6-00a3ca4fcd0a"
                region="na1"
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

