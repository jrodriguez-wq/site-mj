"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";

export const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter px-2" suppressHydrationWarning>
            {t("cta.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4" suppressHydrationWarning>
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto px-4 sm:px-0">
            <Button
              onClick={(e) => {
                e.preventDefault();
                const formSection = document.getElementById("quick-register-form");
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base"
            >
              <span suppressHydrationWarning>{t("cta.applyNow")}</span>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base">
              <Link href="/contact" suppressHydrationWarning>{t("cta.schedule")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

