"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";

export const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" suppressHydrationWarning>
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl" suppressHydrationWarning>
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={(e) => {
                e.preventDefault();
                const formSection = document.getElementById("quick-register-form");
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              size="lg"
              className="px-8"
            >
              <span suppressHydrationWarning>{t("cta.applyNow")}</span>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="/contact" suppressHydrationWarning>{t("cta.schedule")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

