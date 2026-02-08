"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { FileText, CheckCircle2, Home, DollarSign, Users, Clock, Shield, Phone, Mail, MapPin, ArrowRight, FileCheck, Handshake, Key, Calendar } from "lucide-react";
import { CONTACT_INFO, SEO_CONFIG } from "@/config/seo";
import { getCopy, COPY } from "@/lib/constants/copy";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageContent } from "@/components/layout/page-container";
import { LogoSlider } from "@/components/ui/logo-slider";
import { PARTNER_LOGOS } from "@/config/partner-logos";
import { GoogleReviewsLink } from "@/components/reviews/google-reviews-link";

// Helper function to get nested value from translations
const getNestedValue = (obj: unknown, path: string): unknown => {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && !Array.isArray(current) && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
};

// Configuración del formulario de HubSpot - mismo que contacto
const HUBSPOT_FORM_CONFIG = {
  portalId: "50215941",
  formId: "93068cd5-cb63-461a-b7a6-00a3ca4fcd0a", // Mismo formulario que contacto
  region: "na1" as const,
};

export const RentalApplicationContent = () => {
  const benefits = useMemo(() => [
    {
      icon: DollarSign,
      title: getCopy("rentalApplication.benefits.downPayment.title"),
      description: getCopy("rentalApplication.benefits.downPayment.description"),
    },
    {
      icon: Home,
      title: getCopy("rentalApplication.benefits.moveInFast.title"),
      description: getCopy("rentalApplication.benefits.moveInFast.description"),
    },
    {
      icon: Shield,
      title: getCopy("rentalApplication.benefits.buildEquity.title"),
      description: getCopy("rentalApplication.benefits.buildEquity.description"),
    },
    {
      icon: Users,
      title: getCopy("rentalApplication.benefits.familyFriendly.title"),
      description: getCopy("rentalApplication.benefits.familyFriendly.description"),
    },
  ], []);

  const requirements = useMemo(() => {
    const value = getNestedValue(COPY, "rentalApplication.requirements.items");
    return Array.isArray(value) ? (value as string[]) : [];
  }, []);

  const redirectUrl = useMemo(() => {
    return `${SEO_CONFIG.siteUrl}/thank-you?type=rental-application`;
  }, []);

  const documents = useMemo(() => [
    {
      icon: FileText,
      name: getCopy("rentToOwn.documents.taxes.name") || "Tax Returns",
      description: getCopy("rentToOwn.documents.taxes.description") || "Last 2 years (W2 or 1099)",
    },
    {
      icon: FileCheck,
      name: getCopy("rentToOwn.documents.payStubs.name") || "Pay Stubs",
      description: getCopy("rentToOwn.documents.payStubs.description") || "Last 30 days",
    },
    {
      icon: FileText,
      name: getCopy("rentToOwn.documents.bankStatements.name") || "Bank Statements",
      description: getCopy("rentToOwn.documents.bankStatements.description") || "Last 60 days",
    },
    {
      icon: Shield,
      name: getCopy("rentToOwn.documents.id.name") || "Driver's License or ID",
      description: getCopy("rentToOwn.documents.id.description") || "Valid identification",
    },
    {
      icon: FileText,
      name: getCopy("rentToOwn.documents.ssn.name") || "Social Security or ITIN",
      description: getCopy("rentToOwn.documents.ssn.description") || "Identification number",
    },
  ], []);

  const processSteps = useMemo(() => [
    {
      step: 1,
      icon: FileText,
      title: getCopy("rentToOwn.process.step1.title") || "Submit Documents",
      description: getCopy("rentToOwn.process.step1.description") || "Submit the required documents to begin your application.",
    },
    {
      step: 2,
      icon: FileCheck,
      title: getCopy("rentToOwn.process.step2.title") || "Complete Application",
      description: getCopy("rentToOwn.process.step2.description") || "Complete the RTO application ($50 per applicant).",
    },
    {
      step: 3,
      icon: Handshake,
      title: getCopy("rentToOwn.process.step3.title") || "Interview and Review",
      description: getCopy("rentToOwn.process.step3.description") || "Interview and document review by our team.",
    },
    {
      step: 4,
      icon: Key,
      title: getCopy("rentToOwn.process.step4.title") || "Sign Contract",
      description: getCopy("rentToOwn.process.step4.description") || "Sign the contract and pay the deposit.",
    },
    {
      step: 5,
      icon: Home,
      title: getCopy("rentToOwn.process.step5.title") || "Move-in",
      description: getCopy("rentToOwn.process.step5.description") || "Choose the move-in date and start living in your new home!",
    },
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <AnimatedSection delay={0}>
        <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <FileText className="h-4 w-4" />
                <span suppressHydrationWarning>{getCopy("rentalApplication.title") || "Rental Application"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight px-4" suppressHydrationWarning>
                {getCopy("rentalApplication.heroTitle") || "Apply for Your Dream Home"}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4" suppressHydrationWarning>
                {getCopy("rentalApplication.heroSubtitle") || "Start your journey to homeownership with our Rent to Own program. Apply today and take the first step towards owning your new home."}
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection delay={0.1}>
        <section className="py-12 md:py-16 lg:py-20">
          <PageContent size="lg">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground" suppressHydrationWarning>
                {getCopy("rentalApplication.whyApply") || "Why Apply for Our Rent to Own Program?"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2" suppressHydrationWarning>
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </PageContent>
        </section>
      </AnimatedSection>

      {/* Main Content */}
      <AnimatedSection delay={0.15}>
        <section className="py-8 md:py-12 pb-16 md:pb-24">
          <PageContent size="lg">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Column - Application Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Application Form */}
                <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-background via-background to-primary/5">
                  <CardHeader className="text-center space-y-3 pb-4 p-6 md:p-8">
                    <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight" suppressHydrationWarning>
                      {getCopy("rentalApplication.formTitle") || "Rental Application Form"}
                    </CardTitle>
                    <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
                    <CardDescription className="text-sm md:text-base lg:text-lg pt-2 text-muted-foreground leading-relaxed" suppressHydrationWarning>
                      {getCopy("rentalApplication.formDescription") || "Fill out the form below to start your application. Our team will review your information and get back to you within 24-48 hours."}
                    </CardDescription>
                    <div className="flex justify-center pt-2">
                      <GoogleReviewsLink variant="outline" className="text-sm" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 md:px-8 lg:px-10 pb-6 sm:pb-8 md:pb-10">
                    <HubSpotForm
                      portalId={HUBSPOT_FORM_CONFIG.portalId}
                      formId={HUBSPOT_FORM_CONFIG.formId}
                      region={HUBSPOT_FORM_CONFIG.region}
                      redirectUrl={redirectUrl}
                      className="w-full"
                    />
                  </CardContent>
                </Card>

                {/* Required Documents Section */}
                <Card className="border-2 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-3" suppressHydrationWarning>
                      <FileText className="h-6 w-6 text-primary" />
                      {getCopy("rentToOwn.documents.title") || "Required Documents"}
                    </CardTitle>
                    <CardDescription suppressHydrationWarning>
                      {getCopy("rentToOwn.documents.subtitle") || "Please have these documents ready when you apply"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {documents.map((doc, index) => {
                        const Icon = doc.icon;
                        return (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground text-sm mb-1" suppressHydrationWarning>
                                {doc.name}
                              </h4>
                              <p className="text-xs text-muted-foreground" suppressHydrationWarning>
                                {doc.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Communities Section */}
                <Card className="border-2 shadow-lg bg-gradient-to-br from-primary/5 via-primary/10 to-background">
                  <CardHeader>
                    <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-3" suppressHydrationWarning>
                      <MapPin className="h-6 w-6 text-primary" />
                      {"Available Communities"}
                    </CardTitle>
                    <CardDescription suppressHydrationWarning>
                      {"We build beautiful homes in LaBelle and Lehigh Acres."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-lg text-foreground mb-2">LaBelle, Florida</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Growing community with peaceful lifestyle, easy access to major cities, 1/4 acre lots, no HOA fees
                          </p>
                          <Button asChild variant="outline" size="sm" className="w-full">
                            <Link href="/communities/labelle">
                              View LaBelle
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                      <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-lg text-foreground mb-2">Lehigh Acres, Florida</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Vibrant community with excellent schools, parks, shopping, and dining options
                          </p>
                          <Button asChild variant="outline" size="sm" className="w-full">
                            <Link href="/communities/lehigh-acres">
                              View Lehigh Acres
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Process Timeline */}
                <Card className="border-2 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-3" suppressHydrationWarning>
                      <Clock className="h-6 w-6 text-primary" />
                      {getCopy("rentToOwn.process.title") || "Application Process"}
                    </CardTitle>
                    <CardDescription suppressHydrationWarning>
                      {getCopy("rentToOwn.process.subtitle") || "Simple steps to begin your path to homeownership"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {processSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === processSteps.length - 1;
                        return (
                          <div key={step.step} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-base shadow-lg">
                                <Icon className="h-6 w-6" />
                              </div>
                              {!isLast && <div className="w-0.5 h-full bg-border mt-2 min-h-[60px]" />}
                            </div>
                            <div className="flex-1 pb-4">
                              <h4 className="font-bold text-foreground mb-1" suppressHydrationWarning>
                                {step.title}
                              </h4>
                              <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements Card */}
                <Card className="border-2 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-3" suppressHydrationWarning>
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                      {getCopy("rentalApplication.requirements.title") || "Application Requirements"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                        {getCopy("rentalApplication.requirements.description") || "To apply, you'll need to meet these basic requirements:"}
                      </p>
                      <ul className="space-y-2">
                        {requirements.length > 0 ? (
                          requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground" suppressHydrationWarning>{req}</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">Valid identification (Driver&apos;s License or ID)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">Proof of income (pay stubs, tax returns)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">Bank statements (last 60 days)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">Application fee: $50 per applicant</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="border-2 shadow-lg bg-gradient-to-br from-primary/5 to-background">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-3" suppressHydrationWarning>
                      <Phone className="h-6 w-6 text-primary" />
                      {getCopy("rentalApplication.needHelp.title") || "Need Help?"}
                    </CardTitle>
                    <CardDescription suppressHydrationWarning>
                      {getCopy("rentalApplication.needHelp.description") || "Our team is here to assist you with any questions"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <a
                        href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                      >
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{CONTACT_INFO.phone}</span>
                      </a>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                      >
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium break-all">{CONTACT_INFO.email}</span>
                      </a>
                    </div>
                    <Button asChild className="w-full" size="lg">
                      <Link href="/contact">
                        <Calendar className="h-5 w-5 mr-2" />
                        Schedule Appointment
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <Link href="/rent-to-own">
                        Learn More About RTO
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </PageContent>
        </section>
      </AnimatedSection>

      {/* Partner Logos Slider */}
      <AnimatedSection delay={200}>
        <LogoSlider
          logos={PARTNER_LOGOS}
          speed="normal"
          pauseOnHover={true}
          showTitle={false}
          variant="default"
        />
      </AnimatedSection>
    </div>
  );
};

