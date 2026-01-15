"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Home, DollarSign, Award, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const WhyChooseUs = () => {
  const { t } = useTranslation();

  const stats = [
    {
      number: "$0",
      labelKey: "whyChooseUs.highlights.downPayment",
      icon: DollarSign,
    },
    {
      number: "100%",
      labelKey: "whyChooseUs.highlights.noHOA",
      icon: Home,
    },
    {
      number: "15+",
      labelKey: "whyChooseUs.highlights.yearsExperience",
      icon: Award,
    },
    {
      number: "500+",
      labelKey: "whyChooseUs.highlights.happyFamilies",
      icon: TrendingUp,
    },
  ];

  const benefits = [
    "whyChooseUs.points.quality",
    "whyChooseUs.points.flexibility",
    "whyChooseUs.points.experience",
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        {/* Main Layout - Split Design */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image with Integrated Stats */}
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/img/hero/1w5a0741-1.webp"
                alt="M.J. Newell Homes - Quality new construction homes in Florida - Best home builder Miami, LaBelle, Lehigh Acres"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Stats Overlay - Bottom Right, Integrated */}
              <div className="absolute bottom-6 right-6 left-6">
                <div className="grid grid-cols-2 gap-3">
                  {stats.slice(0, 2).map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-foreground mb-0.5" suppressHydrationWarning>
                          {stat.number}
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight" suppressHydrationWarning>
                          {t(stat.labelKey)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Stats - Below Image */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.slice(2).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-muted/50 border border-border/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-foreground mb-2" suppressHydrationWarning>
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium" suppressHydrationWarning>
                      {t(stat.labelKey)}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-6" suppressHydrationWarning>
                  {t("whyChooseUs.title")}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl" suppressHydrationWarning>
                  {t("whyChooseUs.subtitle")}
                </p>
              </div>

              {/* Benefits List - Clean Design */}
              <div className="space-y-4 pt-4">
                {benefits.map((benefitKey, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-base sm:text-lg text-foreground leading-relaxed flex-1" suppressHydrationWarning>
                      {t(benefitKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                <Link href="/rent-to-own#rto-application-form">
                  <span suppressHydrationWarning>{t("hero.applyNow")}</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
