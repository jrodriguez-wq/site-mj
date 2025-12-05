"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguageStore } from "@/store/language-store";

interface HeroSlideConfig {
  image: string;
  titleKey: string;
  subtitleKey?: string;
}

interface HeroSlide {
  image: string;
  title: string;
  subtitle?: string;
}

const heroSlidesConfig: HeroSlideConfig[] = [
  { image: "/img/hero/AURORA.png", titleKey: "hero.title1", subtitleKey: "hero.subtitle1" },
  { image: "/img/hero/1W5A1505 E5.jpg", titleKey: "hero.title2", subtitleKey: "hero.subtitle2" },
  { image: "/img/hero/1W5A1493 E5.jpg", titleKey: "hero.title3", subtitleKey: "hero.subtitle3" },
  { image: "/img/hero/1W5A1489 E5.jpg", titleKey: "hero.title4", subtitleKey: "hero.subtitle4" },
  { image: "/img/hero/1W5A1456 E5.jpg", titleKey: "hero.title5", subtitleKey: "hero.subtitle5" },
  { image: "/img/hero/1W5A0754 E4.jpg", titleKey: "hero.title6", subtitleKey: "hero.subtitle6" },
  { image: "/img/hero/1W5A0814_1.jpg", titleKey: "hero.title7", subtitleKey: "hero.subtitle7" },
  { image: "/img/hero/1W5A0741_1.jpg", titleKey: "hero.title8", subtitleKey: "hero.subtitle8" },
];

export const HeroSlider = () => {
  const { t } = useTranslation();
  const translations = useLanguageStore((state) => state.translations);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const heroSlides = useMemo(() => {
    // Re-calcular cuando las traducciones cambien
    return heroSlidesConfig.map((slide) => ({
      image: slide.image,
      title: t(slide.titleKey),
      subtitle: slide.subtitleKey ? t(slide.subtitleKey) : undefined,
    }));
  }, [t, translations]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 20000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleSlideChange = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const currentSlide = heroSlides[currentIndex];

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <Image
              src={slide.image}
              alt={heroSlidesConfig[index].titleKey}
              fill
              className={cn(
                "object-cover",
                index === currentIndex && "animate-subtle-zoom"
              )}
              priority={index === 0}
              quality={75}
              sizes="100vw"
              suppressHydrationWarning
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55 z-20" />
      </div>

      <div className="relative z-30 w-full h-full flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl text-center space-y-6 mx-auto">
          <div
            className={cn(
              "space-y-4",
              "transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}
            style={{
              transitionDelay: isTransitioning ? "0ms" : "100ms",
            }}
          >
            <h1
              className={cn(
                "text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white",
                "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isTransitioning
                  ? "translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              )}
              style={{
                textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)",
                transitionDelay: isTransitioning ? "0ms" : "150ms",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
              suppressHydrationWarning
            >
              {currentSlide.title}
              {currentSlide.subtitle && (
                <span
                  className={cn(
                    "block text-primary mt-2 font-black",
                    "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isTransitioning
                      ? "translate-x-4 opacity-0"
                      : "translate-x-0 opacity-100"
                  )}
                  style={{
                    textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6), 0 0 30px rgba(3,106,255,0.3)",
                    transitionDelay: isTransitioning ? "0ms" : "250ms",
                    fontWeight: 900,
                  }}
                  suppressHydrationWarning
                >
                  {currentSlide.subtitle}
                </span>
              )}
            </h1>
            <p
              className={cn(
                "mx-auto max-w-[700px] text-white text-lg md:text-xl font-semibold",
                "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isTransitioning
                  ? "translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              )}
              style={{
                textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)",
                transitionDelay: isTransitioning ? "0ms" : "300ms",
              }}
              suppressHydrationWarning
            >
              {t("hero.description")}
            </p>
          </div>

          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center flex-wrap",
              "transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isTransitioning
                ? "opacity-0"
                : "opacity-100"
            )}
            style={{
              transitionDelay: isTransitioning ? "0ms" : "400ms",
            }}
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                const formSection = document.getElementById("quick-register-form");
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              size="lg"
              className={cn(
                "bg-primary hover:bg-primary/90 text-white",
                "px-8 py-6 text-base font-semibold",
                "shadow-lg hover:shadow-xl hover:shadow-primary/30",
                "transition-all duration-300 ease-out",
                "hover:scale-105 active:scale-100",
                "relative overflow-hidden group"
              )}
            >
              <span className="relative z-10" suppressHydrationWarning>{t("hero.applyNow")}</span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                "bg-white/15 border-2 border-white/40 text-white",
                "px-8 py-6 text-base font-semibold",
                "hover:bg-white/25 hover:border-white/60",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-300 ease-out",
                "hover:scale-105 active:scale-100"
              )}
            >
              <Link href="/communities/labelle" suppressHydrationWarning>{t("hero.viewCommunities")}</Link>
            </Button>
          </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2",
          "animate-fade-in"
        )}
        style={{ animationDelay: "600ms" }}
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-500 ease-out cursor-pointer",
              "smooth-hover",
              index === currentIndex
                ? "w-8 bg-primary shadow-lg shadow-primary/50"
                : "w-2 bg-white/50 hover:bg-white/70 hover:w-3"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

