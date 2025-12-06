"use client";

import Image from "next/image";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { 
  Home, 
  Shield, 
  FileText, 
  DollarSign, 
  Heart, 
  ArrowRight,
  Users,
  Building2,
  Target,
  Quote,
  Award,
  TrendingUp
} from "lucide-react";

export default function AboutUsPage() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Home,
      value: t("aboutUs.stats.homesBuilt.value"),
      label: t("aboutUs.stats.homesBuilt.label"),
      description: t("aboutUs.stats.homesBuilt.description"),
    },
    {
      icon: Users,
      value: t("aboutUs.stats.teamMembers.value"),
      label: t("aboutUs.stats.teamMembers.label"),
      description: t("aboutUs.stats.teamMembers.description"),
    },
    {
      icon: Building2,
      value: t("aboutUs.stats.buildingsCompleted.value"),
      label: t("aboutUs.stats.buildingsCompleted.label"),
      description: t("aboutUs.stats.buildingsCompleted.description"),
    },
    {
      icon: Target,
      value: t("aboutUs.stats.annualGoal.value"),
      label: t("aboutUs.stats.annualGoal.label"),
      description: t("aboutUs.stats.annualGoal.description"),
    },
  ];

  const values = [
    {
      icon: Users,
      title: t("aboutUs.values.teamMentality.title"),
      description: t("aboutUs.values.teamMentality.description"),
    },
    {
      icon: Heart,
      title: t("aboutUs.values.winWin.title"),
      description: t("aboutUs.values.winWin.description"),
    },
    {
      icon: DollarSign,
      title: t("aboutUs.values.affordableHousing.title"),
      description: t("aboutUs.values.affordableHousing.description"),
    },
    {
      icon: Shield,
      title: t("aboutUs.values.ethicalBusiness.title"),
      description: t("aboutUs.values.ethicalBusiness.description"),
    },
  ];

  const achievements = [
    {
      title: t("aboutUs.achievements.fiveYears.title"),
      description: t("aboutUs.achievements.fiveYears.description"),
    },
    {
      title: t("aboutUs.achievements.homesThisYear.title"),
      description: t("aboutUs.achievements.homesThisYear.description"),
    },
    {
      title: t("aboutUs.achievements.statewide.title"),
      description: t("aboutUs.achievements.statewide.description"),
    },
    {
      title: t("aboutUs.achievements.sixModels.title"),
      description: t("aboutUs.achievements.sixModels.description"),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageContent size="lg">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" suppressHydrationWarning>
              {t("aboutUs.hero.title") || "About Us"}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
              {t("aboutUs.hero.description") || "Building American Homes in South Florida with a Win-Win Approach"}
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-card border-2 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </PageContent>

      {/* Michael J. Newell Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <PageContent size="lg">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-block">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider" suppressHydrationWarning>
                  {t("aboutUs.leadership.badge")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" suppressHydrationWarning>
                {t("aboutUs.leadership.title")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                {t("aboutUs.leadership.subtitle")}
              </p>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              {/* First Row: Image + Text */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {/* Michael's Image */}
                <div className="relative w-full md:w-1/2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-2 border-border/50 shadow-lg shrink-0">
                  <Image
                    src="/img/michael.jpg"
                    alt="Michael J. Newell - Founder & CEO"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Description Text */}
                <div className="flex-1 space-y-4">
                  <p className="text-lg leading-relaxed text-muted-foreground" suppressHydrationWarning>
                    {t("aboutUs.leadership.description")}
                  </p>
                  
                  <div className="bg-card border-2 rounded-xl p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Quote className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <p className="text-base italic text-foreground leading-relaxed" suppressHydrationWarning>
                          {t("aboutUs.leadership.quote")}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2" suppressHydrationWarning>
                          {t("aboutUs.leadership.quoteAuthor")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row: Belief Text */}
              <div className="w-full">
                <p className="text-base leading-relaxed text-muted-foreground" suppressHydrationWarning>
                  {t("aboutUs.leadership.belief")}
                </p>
              </div>

              {/* Third Row: Mission and Vision Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border-2 rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2" suppressHydrationWarning>
                    <Award className="h-5 w-5 text-primary" />
                    {t("aboutUs.leadership.mission.title")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm" suppressHydrationWarning>
                    {t("aboutUs.leadership.mission.text")}
                  </p>
                </div>

                <div className="bg-card border-2 rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2" suppressHydrationWarning>
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {t("aboutUs.leadership.vision.title")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm" suppressHydrationWarning>
                    {t("aboutUs.leadership.vision.text")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContent>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("aboutUs.values.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                {t("aboutUs.values.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-card border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Companies Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <PageContent size="lg">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("aboutUs.companies.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                {t("aboutUs.companies.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border-2 rounded-xl p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold" suppressHydrationWarning>
                    {t("aboutUs.companies.sld.name")}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                  {t("aboutUs.companies.sld.description")}
                </p>
                <div className="pt-4 space-y-2">
                  <p className="font-semibold text-foreground" suppressHydrationWarning>
                    {t("aboutUs.companies.sld.achievements")}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li suppressHydrationWarning>{t("aboutUs.companies.sld.achievement1")}</li>
                    <li suppressHydrationWarning>{t("aboutUs.companies.sld.achievement2")}</li>
                    <li suppressHydrationWarning>{t("aboutUs.companies.sld.achievement3")}</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border-2 rounded-xl p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold" suppressHydrationWarning>
                    {t("aboutUs.companies.mjNewell.name")}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                  {t("aboutUs.companies.mjNewell.description")}
                </p>
                <div className="pt-4 space-y-2">
                  <p className="font-semibold text-foreground" suppressHydrationWarning>
                    {t("aboutUs.companies.mjNewell.achievements")}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li suppressHydrationWarning>{t("aboutUs.companies.mjNewell.achievement1")}</li>
                    <li suppressHydrationWarning>{t("aboutUs.companies.mjNewell.achievement2")}</li>
                    <li suppressHydrationWarning>{t("aboutUs.companies.mjNewell.achievement3")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </PageContent>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("aboutUs.achievements.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
                {t("aboutUs.achievements.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-card border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Housing Crisis Commitment Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <PageContent size="lg">
          <div className="bg-card border-2 rounded-xl p-8 md:p-12 space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
                {t("aboutUs.housingCrisis.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                {t("aboutUs.housingCrisis.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2" suppressHydrationWarning>
                  <FileText className="h-5 w-5 text-primary" />
                  {t("aboutUs.housingCrisis.learnToBuild.title")}
                </h3>
                <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                  {t("aboutUs.housingCrisis.learnToBuild.description")}
                </p>
                <p className="text-muted-foreground leading-relaxed italic" suppressHydrationWarning>
                  {t("aboutUs.housingCrisis.learnToBuild.quote")}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2" suppressHydrationWarning>
                  <Target className="h-5 w-5 text-primary" />
                  {t("aboutUs.housingCrisis.commitment.title")}
                </h3>
                <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                  {t("aboutUs.housingCrisis.commitment.text")}
                </p>
              </div>
            </div>
          </div>
        </PageContent>
      </section>

      {/* Call to Action Section */}
      <PageContent size="lg">
        <div className="py-16 md:py-24">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-xl p-8 md:p-12 shadow-xl">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" suppressHydrationWarning>
                {t("aboutUs.cta.title") || "Ready to Find Your Dream Home?"}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground" suppressHydrationWarning>
                {t("aboutUs.cta.description") || "Let us guide you through the entire process of buying your new home."}
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground px-8 py-6 text-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                >
                  <Link href="/contact">
                    {t("aboutUs.cta.button") || "Get in Touch"}
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
