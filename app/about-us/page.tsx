"use client";

import Image from "next/image";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Home, Shield, FileText, DollarSign, Heart, Calendar, MapPin, ArrowRight } from "lucide-react";

export default function AboutUsPage() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Home,
      value: "229+",
      label: t("aboutUs.stats.families"),
      description: t("aboutUs.stats.familiesDesc"),
    },
    {
      icon: Calendar,
      value: "15+",
      label: t("aboutUs.stats.experience"),
      description: t("aboutUs.stats.experienceDesc"),
    },
    {
      icon: MapPin,
      value: "5+",
      label: t("aboutUs.stats.development"),
      description: t("aboutUs.stats.developmentDesc"),
    },
  ];

  const services = [
    {
      icon: FileText,
      title: t("aboutUs.services.professionalAdvice"),
      description: t("aboutUs.services.professionalAdviceDesc"),
    },
    {
      icon: Shield,
      title: t("aboutUs.services.qualityGuarantee"),
      description: t("aboutUs.services.qualityGuaranteeDesc"),
    },
    {
      icon: DollarSign,
      title: t("aboutUs.services.loanGuidance"),
      description: t("aboutUs.services.loanGuidanceDesc"),
    },
    {
      icon: Heart,
      title: t("aboutUs.services.assistance"),
      description: t("aboutUs.services.assistanceDesc"),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageContent size="lg">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <Image
                  src="/img/logo.svg"
                  alt="M.J. Newell Homes Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent" suppressHydrationWarning>
              {t("aboutUs.hero.title")}
          </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
              {t("aboutUs.hero.description")}
            </p>
          </div>

          {/* Building Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-2 border-border/50">
              <Image
                src="/img/4.jpg"
                alt="M.J. Newell Homes Building"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
            </div>
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-2 border-border/50">
              <Image
                src="/img/oficina.jpg"
                alt="M.J. Newell Homes Office"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 bg-primary/10 rounded-2xl">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-4xl md:text-5xl font-bold text-foreground mb-2" suppressHydrationWarning>
                          {stat.value}
                        </p>
                        <p className="text-lg font-semibold text-foreground mb-1" suppressHydrationWarning>
                          {stat.label}
                        </p>
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </PageContent>

      {/* What Can We Do For You Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold" suppressHydrationWarning>
                {t("aboutUs.servicesSection.title")}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl" suppressHydrationWarning>
                          {service.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground" suppressHydrationWarning>
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <PageContent size="lg">
        <div className="space-y-12 py-16 md:py-24">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider" suppressHydrationWarning>
                {t("aboutUs.team.title")}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold" suppressHydrationWarning>
              {t("aboutUs.team.subtitle")}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
              {t("aboutUs.team.description")}
            </p>
          </div>
        </div>
      </PageContent>

      {/* The Future of Florida Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold" suppressHydrationWarning>
              {t("aboutUs.future.title")}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
            <h3 className="text-3xl md:text-4xl font-bold text-primary" suppressHydrationWarning>
              {t("aboutUs.future.subtitle")}
            </h3>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium" suppressHydrationWarning>
              {t("aboutUs.future.tagline")}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <PageContent size="lg">
        <div className="py-16 md:py-24">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 shadow-xl">
            <CardContent className="pt-12 pb-12 px-6 md:px-12">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" suppressHydrationWarning>
                  {t("aboutUs.cta.title")}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                  {t("aboutUs.cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                  >
                    <Link href="/contact">
                      {t("aboutUs.cta.button")}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
      </div>
    </PageContent>
    </div>
  );
}
