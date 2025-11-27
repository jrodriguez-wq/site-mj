"use client";

import { Shield, DollarSign, Home, Award, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" suppressHydrationWarning>
            {t("whyChooseUs.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl" suppressHydrationWarning>
            {t("whyChooseUs.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.titleKey}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-card/50"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg border border-primary/20">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors duration-300" suppressHydrationWarning>
                        {t(benefit.titleKey)}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                    {t(benefit.descriptionKey)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
