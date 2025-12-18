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
  descriptionKey?: string;
  primaryButtonKey?: string;
  primaryButtonLink?: string;
  primaryButtonAction?: "link" | "scroll" | "none";
  secondaryButtonKey?: string;
  secondaryButtonLink?: string;
  secondaryButtonAction?: "link" | "scroll" | "none";
}

interface HeroSlide {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryButton?: string;
  primaryButtonLink?: string;
  primaryButtonAction?: "link" | "scroll" | "none";
  secondaryButton?: string;
  secondaryButtonLink?: string;
  secondaryButtonAction?: "link" | "scroll" | "none";
}

const heroSlidesConfig: HeroSlideConfig[] = [
  { 
    image: "/img/hero/1W5A0741_1.jpg", 
    titleKey: "hero.title1", 
    subtitleKey: "hero.subtitle1",
    descriptionKey: "hero.description1",
    primaryButtonKey: "hero.contactUs",
    primaryButtonAction: "scroll",
    secondaryButtonKey: "hero.applyNow",
    secondaryButtonAction: "scroll"
  },
  { 
    image: "/img/hero/1W5A0814_1.jpg", 
    titleKey: "hero.title2", 
    subtitleKey: "hero.subtitle2",
    descriptionKey: "hero.description2",
    primaryButtonKey: "hero.getPreQualified",
    primaryButtonLink: "/rent-to-own",
    primaryButtonAction: "link"
  },
  { 
    image: "/img/hero/1W5A1489 E5.jpg", 
    titleKey: "hero.title3", 
    subtitleKey: "hero.subtitle3",
    descriptionKey: "hero.description3",
    primaryButtonKey: "hero.applyNow",
    primaryButtonAction: "scroll",
    secondaryButtonKey: "hero.viewCommunities",
    secondaryButtonLink: "/communities/labelle",
    secondaryButtonAction: "link"
  },
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
      description: slide.descriptionKey ? t(slide.descriptionKey) : undefined,
      primaryButton: slide.primaryButtonKey ? t(slide.primaryButtonKey) : undefined,
      primaryButtonLink: slide.primaryButtonLink,
      primaryButtonAction: slide.primaryButtonAction || "link",
      secondaryButton: slide.secondaryButtonKey ? t(slide.secondaryButtonKey) : undefined,
      secondaryButtonLink: slide.secondaryButtonLink,
      secondaryButtonAction: slide.secondaryButtonAction || "link",
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
    <section className="relative w-full h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden">
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
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-4xl text-center space-y-4 sm:space-y-5 md:space-y-6 mx-auto">
          <div
            className={cn(
              "space-y-3 sm:space-y-4",
              "transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}
            style={{
              transitionDelay: isTransitioning ? "0ms" : "100ms",
            }}
          >
            <h1
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white px-2",
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
                    "block text-primary mt-1 sm:mt-2 font-black",
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
            {currentSlide.description && (
              <p
                className={cn(
                  "mx-auto max-w-[700px] text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold px-4",
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
                {currentSlide.description}
              </p>
            )}
          </div>

          <div
            className={cn(
              "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap px-4",
              "transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isTransitioning
                ? "opacity-0"
                : "opacity-100"
            )}
            style={{
              transitionDelay: isTransitioning ? "0ms" : "400ms",
            }}
          >
            {currentSlide.primaryButton && (
              currentSlide.primaryButtonAction === "scroll" ? (
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
                    "bg-primary hover:bg-primary/90 text-white w-full sm:w-auto",
                    "px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold",
                    "shadow-lg hover:shadow-xl hover:shadow-primary/30",
                    "transition-all duration-300 ease-out",
                    "hover:scale-105 active:scale-100",
                    "relative overflow-hidden group"
                  )}
                >
                  <span className="relative z-10" suppressHydrationWarning>{currentSlide.primaryButton}</span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Button>
              ) : currentSlide.primaryButtonLink ? (
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "bg-primary hover:bg-primary/90 text-white w-full sm:w-auto",
                    "px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold",
                    "shadow-lg hover:shadow-xl hover:shadow-primary/30",
                    "transition-all duration-300 ease-out",
                    "hover:scale-105 active:scale-100",
                    "relative overflow-hidden group"
                  )}
                >
                  <Link href={currentSlide.primaryButtonLink} suppressHydrationWarning>
                    <span className="relative z-10">{currentSlide.primaryButton}</span>
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Link>
                </Button>
              ) : null
            )}
            {currentSlide.secondaryButton && (
              currentSlide.secondaryButtonAction === "scroll" ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    const formSection = document.getElementById("quick-register-form");
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  variant="outline"
                  size="lg"
                  className={cn(
                    "bg-white/15 border-2 border-white/40 text-white w-full sm:w-auto",
                    "px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold",
                    "hover:bg-white/25 hover:border-white/60",
                    "shadow-lg hover:shadow-xl",
                    "transition-all duration-300 ease-out",
                    "hover:scale-105 active:scale-100"
                  )}
                >
                  <span suppressHydrationWarning>{currentSlide.secondaryButton}</span>
                </Button>
              ) : currentSlide.secondaryButtonLink ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className={cn(
                    "bg-white/15 border-2 border-white/40 text-white w-full sm:w-auto",
                    "px-6 sm:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold",
                    "hover:bg-white/25 hover:border-white/60",
                    "shadow-lg hover:shadow-xl",
                    "transition-all duration-300 ease-out",
                    "hover:scale-105 active:scale-100"
                  )}
                >
                  <Link href={currentSlide.secondaryButtonLink} suppressHydrationWarning>{currentSlide.secondaryButton}</Link>
                </Button>
              ) : null
            )}
          </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2",
          "animate-fade-in"
        )}
        style={{ animationDelay: "600ms" }}
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={cn(
              "h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out cursor-pointer",
              "smooth-hover",
              index === currentIndex
                ? "w-6 sm:w-8 bg-primary shadow-lg shadow-primary/50"
                : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/70 hover:w-2 sm:hover:w-3"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

