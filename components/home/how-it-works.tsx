"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedSection } from "@/components/ui/animated-section";

export const HowItWorks = () => {
  const steps = [
    { number: "01", title: "Reach us first", description: "Contact us online or by phone. Tell us what you're looking for and we'll guide you through the next steps." },
    { number: "02", title: "Choose your home", description: "Browse our floor plans and communities. We'll help you find a home and a path to ownership that fits your situation." },
    { number: "03", title: "Apply", description: "Submit your application. For Rent to Own, we'll review your income and documents. No bank loan required to get started." },
    { number: "04", title: "Sign & move in", description: "Sign your agreement and get the keys. You'll move into your new home and start building toward ownership." },
    { number: "05", title: "Save while you live", description: "Part of your monthly payment goes toward your future down payment. Build equity and credit while you live in your home." },
    { number: "06", title: "Own your home", description: "When you're ready, purchase the home at the agreed price. Use our in-house financing or get a traditional mortgage." },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <AnimatedSection className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-background px-2" suppressHydrationWarning>
            How It Works
          </h2>
          <p className="mx-auto max-w-[700px] text-background/80 text-base sm:text-lg md:text-xl px-4" suppressHydrationWarning>
            From first contact to keys—and beyond. We make the process clear and straightforward.
          </p>
        </AnimatedSection>

        <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const nextTitle = index < steps.length - 1 ? steps[index + 1].title : "You're done!";
            return (
              <AnimatedCard key={step.number} index={index}>
                <Card className="group relative overflow-hidden border-2 border-background/20 hover:border-primary/50 transition-all duration-200 hover:shadow-xl bg-background/10 hover:bg-background/15 backdrop-blur-sm h-full flex flex-col">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <CardHeader className="relative pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-black text-base sm:text-lg md:text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-200">
                      {step.number}
                    </div>
                    <div className="flex-1 pt-1 min-w-0">
                      <div className="text-[10px] sm:text-xs font-bold text-primary/60 uppercase tracking-wider mb-1" suppressHydrationWarning>
                        Step {step.number}
                      </div>
                      <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl group-hover:text-primary transition-colors duration-150 leading-tight text-background" suppressHydrationWarning>
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative flex-1 flex flex-col pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
                  <p className="text-sm sm:text-base md:text-lg text-background/70 leading-relaxed flex-1" suppressHydrationWarning>
                    {step.description}
                  </p>
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-background/20">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-background/60">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary animate-pulse shrink-0" />
                      <span className="font-medium truncate" suppressHydrationWarning>Next: {nextTitle}</span>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

