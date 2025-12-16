"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Calendar } from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { CONTACT_INFO, SEO_CONFIG, SOCIAL_LINKS } from "@/config/seo";
import { PageContent } from "@/components/layout/page-container";
import { useTranslation } from "@/hooks/use-translation";

const address = "45 Bridge St, LaBelle, FL 33935";

export const ContactPageContent = () => {
  const { t } = useTranslation();

  const redirectUrl = useMemo(() => {
    return `${SEO_CONFIG.siteUrl}/thank-you?type=contact`;
  }, []);

  return (
    <PageContent size="lg">
      <div className="space-y-12 md:space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight" suppressHydrationWarning>
            {t("contactForm.title")}
          </h1>
          <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4" suppressHydrationWarning>
            {t("contactForm.subtitle")}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {/* Contact Information - Left Column */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4" suppressHydrationWarning>
              {t("contactForm.contactInfo.title")}
            </h2>
            
            {/* Phone Card */}
            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/50 group">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                      {t("contactForm.contactInfo.phone")}
                    </p>
                    <div className="space-y-1.5">
                      <a
                        href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                        className="text-sm sm:text-base font-semibold hover:text-primary transition-colors block"
                      >
                        {CONTACT_INFO.phone}
                      </a>
                      {CONTACT_INFO.phoneSecondary && (
                        <a
                          href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s/g, "")}`}
                          className="text-sm sm:text-base font-semibold hover:text-primary transition-colors block"
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
            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/50 group">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                      {t("contactForm.contactInfo.email")}
                    </p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-sm sm:text-base font-semibold hover:text-primary transition-colors block break-words"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/50 group">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                      {t("contactForm.contactInfo.address")}
                    </p>
                    <p className="text-sm sm:text-base font-semibold mb-1">
                      {address}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {CONTACT_INFO.address.addressLocality}, {CONTACT_INFO.address.addressRegion} {CONTACT_INFO.address.postalCode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hours Card */}
            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/50 group">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                      {t("contactForm.contactInfo.hours")}
                    </p>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <p className="font-medium">
                        {t("contactForm.contactInfo.weekdays")}: {CONTACT_INFO.openingHours.weekdays.opens} - {CONTACT_INFO.openingHours.weekdays.closes}
                      </p>
                      <p className="font-medium">
                        {t("contactForm.contactInfo.saturday")}: {CONTACT_INFO.openingHours.saturday.opens} - {CONTACT_INFO.openingHours.saturday.closes}
                      </p>
                      <p className="font-medium text-muted-foreground">
                        {t("contactForm.contactInfo.sunday")}: {t("contactForm.contactInfo.closed")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Appointment Card */}
            <Card className="hover:shadow-lg transition-all duration-300 border-2 border-primary/30 hover:border-primary/50 group bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                      {t("contactForm.contactInfo.scheduleAppointment")}
                    </p>
                    <Link
                      href="/schedule-appointment"
                      className="text-sm sm:text-base font-semibold hover:text-primary transition-colors block"
                      suppressHydrationWarning
                    >
                      {t("contactForm.contactInfo.scheduleAppointmentDesc")}
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Card */}
            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/50 group">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                    <Facebook className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-wider" suppressHydrationWarning>
                      {t("contactForm.contactInfo.socialMedia")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SOCIAL_LINKS.facebook && (
                        <a
                          href={SOCIAL_LINKS.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300 text-xs font-medium hover:scale-105"
                        >
                          <Facebook className="h-3.5 w-3.5" />
                          <span suppressHydrationWarning>{t("contactForm.contactInfo.socialNetworks.facebook")}</span>
                        </a>
                      )}
                      {SOCIAL_LINKS.instagram && (
                        <a
                          href={SOCIAL_LINKS.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300 text-xs font-medium hover:scale-105"
                        >
                          <Instagram className="h-3.5 w-3.5" />
                          <span suppressHydrationWarning>{t("contactForm.contactInfo.socialNetworks.instagram")}</span>
                        </a>
                      )}
                      {SOCIAL_LINKS.tiktok && (
                        <a
                          href={SOCIAL_LINKS.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300 text-xs font-medium hover:scale-105"
                        >
                          <TikTokIcon size={12} />
                          <span suppressHydrationWarning>{t("contactForm.contactInfo.socialNetworks.tiktok")}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form - Right Column (2 columns) */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-2 border-primary/20">
              <CardHeader className="text-center space-y-3 pb-6 p-6 sm:p-8">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                  {t("contactForm.formTitle")}
                </CardTitle>
                <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
                <CardDescription className="text-sm sm:text-base md:text-lg pt-2" suppressHydrationWarning>
                  {t("contactForm.formDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 sm:px-8 md:px-10 pb-8 sm:pb-10">
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
