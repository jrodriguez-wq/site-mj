"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContent } from "@/components/layout/page-container";
import { FileCheck, MapPin, Home, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoSlider } from "@/components/ui/logo-slider";
import { PARTNER_LOGOS } from "@/config/partner-logos";
import { AnimatedSection } from "@/components/ui/animated-section";

const iconMap = {
  "1": FileCheck,
  "2": MapPin,
  "3": Home,
  "4": DollarSign,
};

export default function HomeBuyingGuidePage() {
  const steps = [
    { number: "1", icon: FileCheck, title: "Get pre-approved or explore Rent to Own", description: "Know your budget. With Rent to Own you can skip the bank at the start and build toward ownership while you live in your new home." },
    { number: "2", icon: MapPin, title: "Choose your community and floor plan", description: "We build in LaBelle and Lehigh Acres. Pick a floor plan that fits your family and a community you'll love." },
    { number: "3", icon: Home, title: "Tour and sign", description: "Visit our models, pick your lot, and sign your agreement. We'll guide you through every step so you're ready to move in." },
    { number: "4", icon: DollarSign, title: "Close and move in", description: "With Rent to Own you move in and pay monthly; when you're ready you can purchase. With traditional financing you'll close with your lender and get the keys." },
  ];

  return (
    <PageContent size="md">
      <div className="space-y-12">
        <div className="text-center space-y-3 sm:space-y-4 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-tight" suppressHydrationWarning>
            First-Time Home Buyer Guide
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" suppressHydrationWarning>
            A simple roadmap from first step to keys. We'll help you choose the right path—Rent to Own or traditional purchase.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                className={cn(
                  "group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/50"
                )}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-primary/60 mb-1" suppressHydrationWarning>
                        Step {step.number}
                      </div>
                      <CardTitle className="text-lg sm:text-xl md:text-2xl group-hover:text-primary transition-colors duration-300 leading-tight" suppressHydrationWarning>
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Partner Logos Slider */}
      <AnimatedSection delay={200}>
        <LogoSlider
          logos={PARTNER_LOGOS}
          speed="normal"
          pauseOnHover={true}
          showTitle={false}
          variant="default"
        />
      </AnimatedSection>
    </PageContent>
  );
}

