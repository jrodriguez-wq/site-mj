"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";

export const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01", // Número estático - no necesita traducción
      titleKey: "howItWorks.steps.1.title",
      descriptionKey: "howItWorks.steps.1.description",
    },
    {
      number: "02",
      titleKey: "howItWorks.steps.2.title",
      descriptionKey: "howItWorks.steps.2.description",
    },
    {
      number: "03",
      titleKey: "howItWorks.steps.3.title",
      descriptionKey: "howItWorks.steps.3.description",
    },
    {
      number: "04",
      titleKey: "howItWorks.steps.4.title",
      descriptionKey: "howItWorks.steps.4.description",
    },
    {
      number: "05",
      titleKey: "howItWorks.steps.5.title",
      descriptionKey: "howItWorks.steps.5.description",
    },
    {
      number: "06",
      titleKey: "howItWorks.steps.6.title",
      descriptionKey: "howItWorks.steps.6.description",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter px-2" suppressHydrationWarning>
            {t("howItWorks.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl px-4" suppressHydrationWarning>
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const title = t(step.titleKey);
            const description = t(step.descriptionKey);
            const nextTitle = index < steps.length - 1 ? t(steps[index + 1].titleKey) : t("howItWorks.complete");
            
            return (
              <Card
                key={step.number}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 h-full flex flex-col"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-black text-base sm:text-lg md:text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {step.number}
                    </div>
                    <div className="flex-1 pt-1 min-w-0">
                      <div className="text-[10px] sm:text-xs font-bold text-primary/60 uppercase tracking-wider mb-1" suppressHydrationWarning>
                        {t("howItWorks.step")} {step.number}
                      </div>
                      <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl group-hover:text-primary transition-colors duration-300 leading-tight" suppressHydrationWarning>
                        {title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative flex-1 flex flex-col pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed flex-1" suppressHydrationWarning>
                    {description}
                  </p>
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary animate-pulse shrink-0" />
                      <span className="font-medium truncate" suppressHydrationWarning>{t("howItWorks.next")}: {nextTitle}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

