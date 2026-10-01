"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, DollarSign, Shield } from "lucide-react";
import { getCopy } from "@/lib/constants/copy";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedSection } from "@/components/ui/animated-section";

export const Features = () => {
  const features = [
    {
      icon: Home,
      titleKey: "features.modern.title",
      descriptionKey: "features.modern.description",
      href: "/models",
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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <AnimatedSection className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-background px-2" suppressHydrationWarning>
            {getCopy("features.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-background/80 text-base sm:text-lg md:text-xl px-4">
            {getCopy("features.subtitle")}
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <AnimatedCard key={feature.titleKey} index={index}>
                <Card className="group relative overflow-hidden border-2 border-background/20 hover:border-primary/50 transition-all duration-200 hover:shadow-2xl bg-background/10 hover:bg-background/15 backdrop-blur-sm h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <CardHeader className="relative p-6 sm:p-8">
                  <div className="mb-6 sm:mb-8 flex items-start justify-between">
                    <div className={`inline-flex p-4 sm:p-5 rounded-2xl bg-primary/20 group-hover:bg-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200 shadow-lg border border-primary/30`}>
                      <Icon className={`h-8 w-8 sm:h-10 sm:w-10 text-primary`} />
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-background/10 group-hover:text-primary/20 transition-colors duration-200">
                      {features.indexOf(feature) + 1}
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-150 text-background">
                    {getCopy(feature.titleKey)}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-background/70">
                    {getCopy(feature.descriptionKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative pt-0 p-6 sm:p-8">
                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-150 group-hover:underline cursor-pointer text-sm sm:text-base"
                    aria-label={
                      feature.href === "/models"
                        ? "View new home models in Florida - Home builder models Miami, LaBelle, Lehigh Acres"
                        : feature.href === "/rent-to-own"
                        ? "Learn about Rent to Own program - $0 down payment Florida homes"
                        : "Learn more about M.J. Newell Homes - Best home builder in Florida"
                    }
                  >
                    <span suppressHydrationWarning>{getCopy("features.learnMore")}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
                  </Link>
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

