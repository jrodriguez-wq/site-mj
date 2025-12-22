"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { PageContent } from "@/components/layout/page-container";
import { useTranslation } from "@/hooks/use-translation";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <PageContent size="md">
      <div className="text-center space-y-8 py-12 md:py-20">
        {/* 404 Number */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-black text-primary/20 select-none">
            404
          </h1>
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" suppressHydrationWarning>
              {t("notFound.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
              {t("notFound.description")}
            </p>
          </div>
        </div>

        {/* Illustration or Icon */}
        <div className="flex justify-center py-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
            <Search className="w-24 h-24 md:w-32 md:h-32 text-primary/30 relative z-10" />
          </div>
        </div>

        {/* Helpful Links */}
        <div className="space-y-6 pt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                <span suppressHydrationWarning>{t("notFound.goToHomepage")}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/models">
                <Search className="w-4 h-4 mr-2" />
                <span suppressHydrationWarning>{t("notFound.browseModels")}</span>
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4" suppressHydrationWarning>
              {t("notFound.popularPages")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/rent-to-own"
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                suppressHydrationWarning
              >
                {t("notFound.rentToOwn")}
              </Link>
              <Link
                href="/communities/labelle"
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                suppressHydrationWarning
              >
                {t("notFound.labelle")}
              </Link>
              <Link
                href="/communities/lehigh-acres"
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                suppressHydrationWarning
              >
                {t("notFound.lehighAcres")}
              </Link>
              <Link
                href="/contact"
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                suppressHydrationWarning
              >
                {t("notFound.contactUs")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
}

