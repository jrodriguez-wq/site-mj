"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, DollarSign, Shield } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Home,
      titleKey: "features.modern.title",
      descriptionKey: "features.modern.description",
      href: "/build-with-us",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: DollarSign,
      titleKey: "features.pricing.title",
      descriptionKey: "features.pricing.description",
      href: "/rent-to-own",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Shield,
      titleKey: "features.noHOA.title",
      descriptionKey: "features.noHOA.description",
      href: "/about-us",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter px-2" suppressHydrationWarning>
            {t("features.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl px-4" suppressHydrationWarning>
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.titleKey}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative p-4 sm:p-6">
                  <div className="mb-4 sm:mb-6 flex items-start justify-between">
                    <div className={`inline-flex p-3 sm:p-4 rounded-2xl ${feature.bgColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${feature.color}`} />
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-muted/20 group-hover:text-primary/20 transition-colors duration-500">
                      {features.indexOf(feature) + 1}
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300" suppressHydrationWarning>
                    {t(feature.titleKey)}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed" suppressHydrationWarning>
                    {t(feature.descriptionKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative pt-0 p-4 sm:p-6">
                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group-hover:underline cursor-pointer text-sm sm:text-base"
                  >
                    <span suppressHydrationWarning>{t("features.learnMore")}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

