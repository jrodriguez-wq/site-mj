"use client";

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Globe } from "lucide-react";
import { CONTACT_INFO, SEO_CONFIG, SOCIAL_LINKS } from "@/config/seo";
import { PageContent } from "@/components/layout/page-container";
import { useTranslation } from "@/hooks/use-translation";

export const ContactPageContent = () => {
  const { t } = useTranslation();

  const redirectUrl = useMemo(() => {
    // Usar el siteUrl del config para evitar problemas de hidratación
    return `${SEO_CONFIG.siteUrl}/thank-you?type=contact`;
  }, []);

  return (
    <PageContent size="lg">
      <div className="space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent" suppressHydrationWarning>
            {t("contactForm.title") || "Contact Us"}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
            {t("contactForm.subtitle") || "Get in touch with our team"}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {/* Contact Information - Left Column */}
          <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6" suppressHydrationWarning>
                {t("contactForm.contactInfo.title") || "Contact Information"}
              </h2>
              
            {/* Phone Card */}
              <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                        {t("contactForm.contactInfo.phone") || "Phone"}
                      </p>
                      <div className="space-y-2">
                      <a
                        href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                          className="text-lg font-semibold hover:text-primary transition-colors block"
                      >
                        {CONTACT_INFO.phone}
                      </a>
                      {CONTACT_INFO.phoneSecondary && (
                        <a
                          href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s/g, "")}`}
                            className="text-lg font-semibold hover:text-primary transition-colors block"
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
              <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                        {t("contactForm.contactInfo.email") || "Email"}
                      </p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                        className="text-lg font-semibold hover:text-primary transition-colors block break-words"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
              <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                        {t("contactForm.contactInfo.location") || "Location"}
                      </p>
                      <p className="text-lg font-semibold">
                      {CONTACT_INFO.address.addressLocality}, {CONTACT_INFO.address.addressRegion}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

              {/* Hours Card */}
              <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                        {t("contactForm.contactInfo.hours") || "Business Hours"}
                      </p>
                      <div className="space-y-1 text-base">
                        <p className="font-medium">
                          {t("contactForm.contactInfo.weekdays") || "Monday - Friday"}: {CONTACT_INFO.openingHours.weekdays.opens} - {CONTACT_INFO.openingHours.weekdays.closes}
                        </p>
                        <p className="font-medium">
                          {t("contactForm.contactInfo.saturday") || "Saturday"}: {CONTACT_INFO.openingHours.saturday.opens} - {CONTACT_INFO.openingHours.saturday.closes}
                        </p>
                        <p className="font-medium text-muted-foreground">
                          {t("contactForm.contactInfo.sunday") || "Sunday"}: {t("contactForm.contactInfo.closed") || "Closed"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Website Card */}
              {SOCIAL_LINKS.website && (
                <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shrink-0">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                          Website
                        </p>
                        <a
                          href={SOCIAL_LINKS.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold hover:text-primary transition-colors block break-words"
                        >
                          {SOCIAL_LINKS.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Social Media Card */}
              <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shrink-0">
                      <Facebook className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                        Follow Us
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {SOCIAL_LINKS.facebook && (
                          <a
                            href={SOCIAL_LINKS.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-sm font-medium"
                          >
                            <Facebook className="h-4 w-4" />
                            Facebook
                          </a>
                        )}
                        {SOCIAL_LINKS.instagram && (
                          <a
                            href={SOCIAL_LINKS.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-sm font-medium"
                          >
                            <Instagram className="h-4 w-4" />
                            Instagram
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form - Right Column (2 columns) */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="text-center space-y-3 pb-6">
                <CardTitle className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                  {t("contactForm.formTitle") || "Send us a Message"}
                </CardTitle>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
                <CardDescription className="text-lg pt-2" suppressHydrationWarning>
                  {t("contactForm.formDescription") || "Fill out the form below and we'll get back to you as soon as possible."}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 md:px-8 pb-8">
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

