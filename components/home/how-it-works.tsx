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
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" suppressHydrationWarning>
            {t("howItWorks.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl" suppressHydrationWarning>
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                <CardHeader className="relative pb-4">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {step.number}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="text-xs font-bold text-primary/60 uppercase tracking-wider mb-1" suppressHydrationWarning>
                        {t("howItWorks.step")} {step.number}
                      </div>
                      <CardTitle className="text-xl md:text-2xl lg:text-3xl group-hover:text-primary transition-colors duration-300 leading-tight" suppressHydrationWarning>
                        {title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative flex-1 flex flex-col pt-0 pb-6 px-6">
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg flex-1" suppressHydrationWarning>
                    {description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span className="font-medium" suppressHydrationWarning>{t("howItWorks.next")}: {nextTitle}</span>
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

