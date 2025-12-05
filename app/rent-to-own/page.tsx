"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";
import { useTranslation } from "@/hooks/use-translation";
import { FileText, CheckCircle2, Calendar, MapPin, ArrowRight, Home, DollarSign, Shield } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function RentToOwnPage() {
  const { t } = useTranslation();

  const documents = [
    t("rentToOwn.documents.bankStatements"),
    t("rentToOwn.documents.idCopy"),
    t("rentToOwn.documents.firstLastSecurity"),
  ];

  const steps = [
    {
      icon: FileText,
      title: t("rentToOwn.steps.documents.title"),
      description: t("rentToOwn.steps.documents.description"),
    },
    {
      icon: Calendar,
      title: t("rentToOwn.steps.interview.title"),
      description: t("rentToOwn.steps.interview.description"),
    },
    {
      icon: Home,
      title: t("rentToOwn.steps.choose.title"),
      description: t("rentToOwn.steps.choose.description"),
    },
    {
      icon: DollarSign,
      title: t("rentToOwn.steps.rent.title"),
      description: t("rentToOwn.steps.rent.description"),
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "$0 Down Payment",
      description: "Start with no upfront costs",
    },
    {
      icon: Home,
      title: "Build Equity",
      description: "Part of your rent goes toward ownership",
    },
    {
      icon: Shield,
      title: "Flexible Terms",
      description: "Choose the plan that works for you",
    },
  ];

  const communities = [
    {
      name: t("communities.lehighAcres.name"),
      location: "Lehigh Acres, FL",
      href: "/communities/lehigh-acres",
      description: t("communities.lehighAcres.description"),
      image: "/recursos/shutterstock_1197062707.jpg",
    },
    {
      name: t("communities.labelle.name"),
      location: "LaBelle, FL",
      href: "/communities/labelle",
      description: t("communities.labelle.description"),
      image: "/recursos/shutterstock_1065297917.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageContent size="lg">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" suppressHydrationWarning>
              {t("rentToOwn.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
              {t("rentToOwn.hero.subtitle")}
            </p>
          </div>

          {/* Highlight Card */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-xl p-8 md:p-12 shadow-lg">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.application.title")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                {t("rentToOwn.application.description")}
              </p>
              <div className="bg-background/80 rounded-lg p-6 border border-primary/10 mt-6">
                <p className="text-lg font-semibold text-foreground" suppressHydrationWarning>
                  {t("rentToOwn.application.highlight")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContent>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6 md:grid-cols-3 mb-12">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-card border-2 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.documents.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                Simple documentation process
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="bg-card border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-medium" suppressHydrationWarning>{doc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <PageContent size="lg">
          <div className="bg-card border-2 rounded-xl p-8 md:p-12 shadow-lg">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.opportunity.title")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" suppressHydrationWarning>
                {t("rentToOwn.opportunity.description")}
              </p>
            </div>
          </div>
        </PageContent>
      </section>

      {/* How It Works / Steps Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.steps.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simple steps to homeownership
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="bg-card border-2 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 group"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold" suppressHydrationWarning>
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.communities.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                {t("rentToOwn.communities.subtitle")}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {communities.map((community, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden border-2 rounded-xl bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image Section */}
                  <div className="relative h-64 md:h-72 bg-muted/30 overflow-hidden">
                    <Image
                      src={community.image}
                      alt={`${community.name} community`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300" suppressHydrationWarning>
                          {community.name}
                        </h3>
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                          {community.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground" suppressHydrationWarning>
                      {community.description}
                    </p>
                    <Button asChild variant="outline" className="w-full group/btn">
                      <Link href={community.href}>
                        {t("rentToOwn.communities.explore")} {community.name}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <PageContent size="lg">
        <div className="py-16 md:py-24">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-xl p-8 md:p-12 shadow-2xl">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.cta.title")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground" suppressHydrationWarning>
                {t("rentToOwn.cta.description")}
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground px-8 py-6 text-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                >
                  <Link href="/contact">
                    {t("rentToOwn.cta.button")}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </div>
  );
}
