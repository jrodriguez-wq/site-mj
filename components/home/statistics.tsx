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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-background px-2" suppressHydrationWarning>
            {t("statistics.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-background/80 text-base sm:text-lg md:text-xl px-4" suppressHydrationWarning>
            {t("statistics.subtitle")}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.labelKey}
                className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-lg bg-background/5 hover:bg-background/10 transition-colors duration-300"
              >
                <div className="flex justify-center">
                  <div className="p-3 sm:p-4 bg-primary/20 rounded-full">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary" suppressHydrationWarning>
                    {t(stat.valueKey)}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-background" suppressHydrationWarning>{t(stat.labelKey)}</h3>
                  <p className="text-xs sm:text-sm text-background/70 px-1" suppressHydrationWarning>{t(stat.descriptionKey)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
