"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Calendar } from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { CONTACT_INFO, SEO_CONFIG, SOCIAL_LINKS } from "@/config/seo";
import { useTranslation } from "@/hooks/use-translation";
import { HappyFamiliesGallery } from "@/components/home/happy-families-gallery";
import { motion } from "framer-motion";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GoogleReviewsLink } from "@/components/reviews/google-reviews-link";

const address = "45 Bridge St, LaBelle, FL 33935";

export const ContactPageContent = () => {
  const { t } = useTranslation();

  const redirectUrl = useMemo(() => {
    return `${SEO_CONFIG.siteUrl}/thank-you?type=contact`;
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Logo - Elegant Design */}
      <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/hero/1w5a0754-e4.webp"
            alt={t("contactForm.hero.imageAlt") || "Contact M.J. Newell Homes"}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Gradient Overlay - Lighter for more natural look */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="space-y-6 sm:space-y-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Logo */}
                <motion.div 
                  className="flex justify-center mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <div className="relative">
                    <Image
                      src="/img/logo-blanco.png"
                      alt="M.J. Newell Homes"
                      width={320}
                      height={120}
                      className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-white"
                  style={{
                    textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
                  }}
                  suppressHydrationWarning
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  {t("contactForm.title") || "Contact Us"}
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-medium max-w-3xl mx-auto leading-relaxed"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)",
                  }}
                  suppressHydrationWarning
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  {t("contactForm.subtitle") || "Get in touch with our team for questions about our homes, Rent to Own program, or to schedule a viewing."}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />

        {/* Natural Fade Out - Smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 md:h-56 bg-gradient-to-t from-background via-background/40 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Main Content Section */}
      <AnimatedSection delay={0.1}>
        <section className="py-10 md:py-14 lg:py-18 bg-background">
          <div className="container mx-auto px-4 sm:px-5 md:px-6">
            <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
            {/* Title */}
            <div className="text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black mb-2 leading-tight px-4" suppressHydrationWarning>
                {t("contactForm.contactInfo.title") || "Contact Information"}
              </h2>
              <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            </div>

            {/* Top 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Phone Card */}
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/50 group hover:-translate-y-1">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 w-full min-w-0">
                      <p className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                        {t("contactForm.contactInfo.phone") || "Phone"}
                      </p>
                      <div className="space-y-1.5">
                        <a
                          href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                          className="text-sm sm:text-base font-black hover:text-primary transition-colors block break-words"
                        >
                          {CONTACT_INFO.phone}
                        </a>
                        {CONTACT_INFO.phoneSecondary && (
                          <a
                            href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s/g, "")}`}
                            className="text-sm sm:text-base font-black hover:text-primary transition-colors block break-words"
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
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/50 group hover:-translate-y-1">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 w-full min-w-0">
                      <p className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                        {t("contactForm.contactInfo.email") || "Email"}
                      </p>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="text-xs sm:text-[13px] md:text-[14px] font-black hover:text-primary transition-colors block break-words word-break-break-all"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/50 group hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 w-full min-w-0">
                      <p className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                        {t("contactForm.contactInfo.address") || "Address"}
                      </p>
                      <p className="text-sm sm:text-base font-black mb-1 break-words">
                        {address}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">
                        {CONTACT_INFO.address.addressLocality}, {CONTACT_INFO.address.addressRegion} {CONTACT_INFO.address.postalCode}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
                <CardHeader className="text-center space-y-2 sm:space-y-3 pb-4 sm:pb-5 md:pb-6 p-4 sm:p-6 md:p-8">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight px-4" suppressHydrationWarning>
                    {t("contactForm.formTitle") || "Send Us a Message"}
                  </CardTitle>
                  <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
                  <CardDescription className="text-xs sm:text-sm md:text-base lg:text-lg pt-2 text-muted-foreground px-4 leading-relaxed" suppressHydrationWarning>
                    {t("contactForm.formDescription") || "Fill out the form below and we'll get back to you as soon as possible."}
                  </CardDescription>
                  <div className="flex justify-center pt-2">
                    <GoogleReviewsLink variant="outline" className="text-sm" />
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 md:px-8 lg:px-10 pb-6 sm:pb-8 md:pb-10">
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

            {/* Bottom 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Hours Card */}
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/50 group bg-gradient-to-br from-primary/5 to-transparent hover:-translate-y-1">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 w-full min-w-0">
                      <p className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                        {t("contactForm.contactInfo.hours") || "Business Hours"}
                      </p>
                      <div className="space-y-1.5 text-xs sm:text-sm">
                        <p className="font-semibold text-foreground break-words">
                          {t("contactForm.contactInfo.everyDay") || "Every Day"}: {CONTACT_INFO.openingHoursDisplay.opens} - {CONTACT_INFO.openingHoursDisplay.closes}
                        </p>
                        <p className="text-xs text-muted-foreground break-words">
                          {t("contactForm.contactInfo.hoursNote") || "Monday through Sunday"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Appointment Card */}
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-primary/30 hover:border-primary/50 group bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:-translate-y-1">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/30 rounded-xl group-hover:bg-primary/40 group-hover:scale-110 transition-all duration-300 shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 w-full min-w-0">
                      <p className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider" suppressHydrationWarning>
                        {t("contactForm.contactInfo.scheduleAppointment") || "Schedule Appointment"}
                      </p>
                      <Link
                        href="/schedule-appointment"
                        className="text-sm sm:text-base font-black hover:text-primary transition-colors block break-words"
                        suppressHydrationWarning
                      >
                        {t("contactForm.contactInfo.scheduleAppointmentDesc") || "Visit our office and see our homes"}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Card */}
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/50 group hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 shrink-0">
                      <Facebook className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 w-full min-w-0">
                      <p className="font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-wider" suppressHydrationWarning>
                        {t("contactForm.contactInfo.socialMedia") || "Follow Us"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {SOCIAL_LINKS.facebook && (
                          <a
                            href={SOCIAL_LINKS.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300 text-xs font-semibold hover:scale-105 border border-primary/20"
                          >
                            <Facebook className="h-3.5 w-3.5" />
                            <span suppressHydrationWarning>{t("contactForm.contactInfo.socialNetworks.facebook") || "Facebook"}</span>
                          </a>
                        )}
                        {SOCIAL_LINKS.instagram && (
                          <a
                            href={SOCIAL_LINKS.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300 text-xs font-semibold hover:scale-105 border border-primary/20"
                          >
                            <Instagram className="h-3.5 w-3.5" />
                            <span suppressHydrationWarning>{t("contactForm.contactInfo.socialNetworks.instagram") || "Instagram"}</span>
                          </a>
                        )}
                        {SOCIAL_LINKS.tiktok && (
                          <a
                            href={SOCIAL_LINKS.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300 text-xs font-semibold hover:scale-105 border border-primary/20"
                          >
                            <TikTokIcon size={12} />
                            <span suppressHydrationWarning>{t("contactForm.contactInfo.socialNetworks.tiktok") || "TikTok"}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        </section>
      </AnimatedSection>

      {/* Happy Families Gallery Section - Same gallery as home page */}
      <AnimatedSection delay={0.1}>
        <HappyFamiliesGallery />
      </AnimatedSection>

      {/* Response Times Section - Dark Background */}
      <AnimatedSection delay={0.1} direction="fade">
        <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-background tracking-tight leading-tight px-4" suppressHydrationWarning>
                {t("aboutUs.responseTimes.title") || "Fast Response Times"}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-background/80 max-w-2xl mx-auto px-4 leading-relaxed" suppressHydrationWarning>
                {t("aboutUs.responseTimes.subtitle") || "We value your time and respond quickly to all inquiries"}
              </p>
              <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <div className="border-2 border-background/20 bg-background/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 text-center hover:border-primary/50 hover:bg-background/15 transition-all duration-300">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-2 sm:mb-3 leading-tight" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.phone.value") || "< 24h"}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-background mb-1 sm:mb-2 leading-tight" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.phone.label") || "Phone Calls"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-background/80 leading-relaxed" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.phone.description") || "We respond to all phone inquiries within 24 hours"}
                </p>
              </div>
              <div className="border-2 border-background/20 bg-background/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 text-center hover:border-primary/50 hover:bg-background/15 transition-all duration-300">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-2 sm:mb-3 leading-tight" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.email.value") || "< 48h"}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-background mb-1 sm:mb-2 leading-tight" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.email.label") || "Email Inquiries"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-background/80 leading-relaxed" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.email.description") || "Email responses within 48 hours"}
                </p>
              </div>
              <div className="border-2 border-background/20 bg-background/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 text-center hover:border-primary/50 hover:bg-background/15 transition-all duration-300">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-2 sm:mb-3 leading-tight" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.appointment.value") || "Same Day"}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-background mb-1 sm:mb-2 leading-tight" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.appointment.label") || "Appointments"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-background/80 leading-relaxed" suppressHydrationWarning>
                  {t("aboutUs.responseTimes.appointment.description") || "Schedule your visit the same day"}
                </p>
              </div>
            </div>
          </div>
        </div>
        </section>
      </AnimatedSection>
    </div>
  );
};
