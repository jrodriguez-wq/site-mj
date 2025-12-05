"use client";

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT_INFO, SEO_CONFIG } from "@/config/seo";
import { PageContent } from "@/components/layout/page-container";
import { useTranslation } from "@/hooks/use-translation";

export const ContactPageContent = () => {
  const { t } = useTranslation();

  const redirectUrl = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : SEO_CONFIG.siteUrl;
    return `${baseUrl}/thank-you?type=contact`;
  }, []);

  return (
    <PageContent size="xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" suppressHydrationWarning>
            {t("contactForm.title") || "Contact Us"}
          </h1>
          <p className="text-xl text-muted-foreground" suppressHydrationWarning>
            {t("contactForm.subtitle") || "Get in touch with our team"}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Contact Information - Left Column */}
          <div className="space-y-4">
            {/* Phone Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-primary/10 rounded-full shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-muted-foreground mb-2">Phone</p>
                    <div className="space-y-1">
                      <a
                        href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                        className="text-base font-medium hover:text-primary cursor-pointer block"
                      >
                        {CONTACT_INFO.phone}
                      </a>
                      {CONTACT_INFO.phoneSecondary && (
                        <a
                          href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s/g, "")}`}
                          className="text-base font-medium hover:text-primary cursor-pointer block"
                        >
                          {CONTACT_INFO.phoneSecondary}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-primary/10 rounded-full shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-muted-foreground mb-2">Email</p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-base font-medium hover:text-primary cursor-pointer block break-words"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-primary/10 rounded-full shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-muted-foreground mb-2">Location</p>
                    <p className="text-base font-medium">
                      {CONTACT_INFO.address.addressLocality}, {CONTACT_INFO.address.addressRegion}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form - Right Column */}
          <div>
            <Card className="shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-center" suppressHydrationWarning>
                  {t("contactForm.formTitle") || "Send us a Message"}
                </CardTitle>
                <CardDescription className="text-center" suppressHydrationWarning>
                  {t("contactForm.formDescription") || "Fill out the form below and we'll get back to you as soon as possible."}
                </CardDescription>
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
      </div>
    </PageContent>
  );
};

