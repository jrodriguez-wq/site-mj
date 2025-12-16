"use client";

import { Shield, DollarSign, Home, Award, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";

export const WhyChooseUs = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Shield,
      titleKey: "whyChooseUs.benefits.quality.title",
      descriptionKey: "whyChooseUs.benefits.quality.description",
    },
    {
      icon: DollarSign,
      titleKey: "whyChooseUs.benefits.downPayment.title",
      descriptionKey: "whyChooseUs.benefits.downPayment.description",
    },
    {
      icon: Home,
      titleKey: "whyChooseUs.benefits.lots.title",
      descriptionKey: "whyChooseUs.benefits.lots.description",
    },
    {
      icon: Award,
      titleKey: "whyChooseUs.benefits.noHOA.title",
      descriptionKey: "whyChooseUs.benefits.noHOA.description",
    },
    {
      icon: Users,
      titleKey: "whyChooseUs.benefits.familyFocused.title",
      descriptionKey: "whyChooseUs.benefits.familyFocused.description",
    },
    {
      icon: Clock,
      titleKey: "whyChooseUs.benefits.quickMoveIn.title",
      descriptionKey: "whyChooseUs.benefits.quickMoveIn.description",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter px-2" suppressHydrationWarning>
            {t("whyChooseUs.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl px-4" suppressHydrationWarning>
            {t("whyChooseUs.subtitle")}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.titleKey}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-card/50"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg border border-primary/20 shrink-0">
                      <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl group-hover:text-primary transition-colors duration-300" suppressHydrationWarning>
                        {t(benefit.titleKey)}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>
                    {t(benefit.descriptionKey)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 text-center px-4">
          <Button
            onClick={(e) => {
              e.preventDefault();
              const formSection = document.getElementById("quick-register-form");
              if (formSection) {
                formSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            size="lg"
            className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold"
          >
            <span suppressHydrationWarning>{t("hero.applyNow")}</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
