"use client";

import { Home, Users, Award, TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export const Statistics = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Home,
      valueKey: "statistics.stats.homesBuilt.value",
      labelKey: "statistics.stats.homesBuilt.label",
      descriptionKey: "statistics.stats.homesBuilt.description",
    },
    {
      icon: Users,
      valueKey: "statistics.stats.happyFamilies.value",
      labelKey: "statistics.stats.happyFamilies.label",
      descriptionKey: "statistics.stats.happyFamilies.description",
    },
    {
      icon: Award,
      valueKey: "statistics.stats.yearsExperience.value",
      labelKey: "statistics.stats.yearsExperience.label",
      descriptionKey: "statistics.stats.yearsExperience.description",
    },
    {
      icon: TrendingUp,
      valueKey: "statistics.stats.downPayment.value",
      labelKey: "statistics.stats.downPayment.label",
      descriptionKey: "statistics.stats.downPayment.description",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-background" suppressHydrationWarning>
            {t("statistics.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-background/80 text-lg md:text-xl" suppressHydrationWarning>
            {t("statistics.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.labelKey}
                className="text-center space-y-4 p-6 rounded-lg bg-background/5 hover:bg-background/10 transition-colors duration-300"
              >
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/20 rounded-full">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-black text-primary" suppressHydrationWarning>
                    {t(stat.valueKey)}
                  </div>
                  <h3 className="text-xl font-bold text-background" suppressHydrationWarning>{t(stat.labelKey)}</h3>
                  <p className="text-sm text-background/70" suppressHydrationWarning>{t(stat.descriptionKey)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
