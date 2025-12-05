"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";
import { useTranslation } from "@/hooks/use-translation";
import { FileText, CheckCircle2, Calendar, MapPin, ArrowRight, Home, DollarSign } from "lucide-react";
import Image from "next/image";

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

  const communities = [
    {
      name: t("communities.lehighAcres.name"),
      location: "Lehigh Acres, FL",
      href: "/communities/lehigh-acres",
      description: t("communities.lehighAcres.description"),
    },
    {
      name: t("communities.labelle.name"),
      location: "LaBelle, FL",
      href: "/communities/labelle",
      description: t("communities.labelle.description"),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageContent size="lg">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="/img/logo.svg"
                  alt="M.J. Newell Homes Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent" suppressHydrationWarning>
              {t("rentToOwn.hero.title")}
          </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
              {t("rentToOwn.hero.subtitle")}
          </p>
        </div>

          {/* Rental Application Section */}
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.application.title")}
              </CardTitle>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
              <CardDescription className="text-lg md:text-xl pt-2" suppressHydrationWarning>
                {t("rentToOwn.application.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-background/50 rounded-xl p-6 border border-primary/10">
                <p className="text-lg text-foreground font-medium text-center" suppressHydrationWarning>
                  {t("rentToOwn.application.highlight")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContent>

      {/* Documents Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.documents.title")}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {documents.map((doc, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-medium" suppressHydrationWarning>{doc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity for All Section */}
      <PageContent size="lg">
        <div className="py-16 md:py-24">
          <Card className="bg-gradient-to-br from-background to-muted/20 border-2 border-border shadow-xl">
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.opportunity.title")}
              </CardTitle>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
            </CardHeader>
            <CardContent>
              <p className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                {t("rentToOwn.opportunity.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </PageContent>

      {/* How It Works / Steps Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.steps.title")}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
              <div className="space-y-2">
                          <div className="text-sm font-semibold text-primary uppercase tracking-wider">
                            {t("rentToOwn.steps.step")} {index + 1}
                          </div>
                          <h3 className="text-xl font-bold" suppressHydrationWarning>
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                            {step.description}
                </p>
              </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* The Future of Florida - Communities Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.communities.title")}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                {t("rentToOwn.communities.subtitle")}
                </p>
              </div>
            <div className="grid gap-6 md:grid-cols-2">
              {communities.map((community, index) => {
                const isLabelle = community.href.includes("labelle");
                const isLehighAcres = community.href.includes("lehigh-acres");
                const communityImage = isLabelle 
                  ? "/recursos/shutterstock_1065297917.jpg"
                  : isLehighAcres
                  ? "/recursos/shutterstock_1197062707.jpg"
                  : null;
                
                return (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group overflow-hidden">
                    {communityImage && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={communityImage}
                          alt={`${community.name} community`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-2xl" suppressHydrationWarning>
                          {community.name}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base" suppressHydrationWarning>
                        {community.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6" suppressHydrationWarning>
                        {community.description}
                      </p>
                      <Button asChild variant="outline" className="w-full group/btn">
                        <Link href={community.href}>
                          {t("rentToOwn.communities.explore")} {community.name}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <PageContent size="lg">
        <div className="py-16 md:py-24">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 shadow-2xl">
            <CardContent className="pt-12 pb-12 px-6 md:px-12">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" suppressHydrationWarning>
                  {t("rentToOwn.cta.title")}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                  {t("rentToOwn.cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                  >
                    <Link href="/contact">
                      {t("rentToOwn.cta.button")}
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
