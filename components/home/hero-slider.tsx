"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

interface HeroSlideConfig {
  image: string;
  titleKey: string;
  subtitleKey?: string;
  descriptionKey?: string;
  primaryButtonKey?: string;
  primaryButtonLink?: string;
  primaryButtonAction?: "link" | "scroll" | "none";
  primaryButtonScrollTarget?: string;
  secondaryButtonKey?: string;
  secondaryButtonLink?: string;
  secondaryButtonAction?: "link" | "scroll" | "none";
  secondaryButtonScrollTarget?: string;
}

const heroSlidesConfig: HeroSlideConfig[] = [
  {
    image: "/img/hero/1w5a0741-1.webp",
    titleKey: "hero.title1",
    subtitleKey: "hero.subtitle1",
    descriptionKey: "hero.description1",
    primaryButtonKey: "hero.contactUs",
    primaryButtonAction: "scroll",
    primaryButtonScrollTarget: "quick-register-form",
    secondaryButtonKey: "hero.applyNow",
    secondaryButtonLink: "/schedule-appointment",
    secondaryButtonAction: "link",
  },
  {
    image: "/img/hero/1w5a0814-1.webp",
    titleKey: "hero.title2",
    subtitleKey: "hero.subtitle2",
    descriptionKey: "hero.description2",
    primaryButtonKey: "hero.getPreQualified",
    primaryButtonLink: "/rent-to-own#rto-application-form",
    primaryButtonAction: "link",
  },
  {
    image: "/img/hero/1w5a1489-e5.webp",
    titleKey: "hero.title3",
    subtitleKey: "hero.subtitle3",
    descriptionKey: "hero.description3",
    primaryButtonKey: "hero.applyNow",
    primaryButtonLink: "/schedule-appointment",
    primaryButtonAction: "link",
    secondaryButtonKey: "hero.viewCommunities",
    secondaryButtonLink: "/communities/labelle",
    secondaryButtonAction: "link",
  },
];

export const HeroSlider = () => {
  const { t, translations } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const heroSlides = useMemo(() => {
    // Re-calcular solo cuando las traducciones cambien
    return heroSlidesConfig.map((slide) => ({
      image: slide.image,
      title: t(slide.titleKey),
      subtitle: slide.subtitleKey ? t(slide.subtitleKey) : undefined,
      description: slide.descriptionKey ? t(slide.descriptionKey) : undefined,
      primaryButton: slide.primaryButtonKey
        ? t(slide.primaryButtonKey)
        : undefined,
      primaryButtonLink: slide.primaryButtonLink,
      primaryButtonAction: slide.primaryButtonAction || "link",
      primaryButtonScrollTarget:
        slide.primaryButtonScrollTarget || "quick-register-form",
      secondaryButton: slide.secondaryButtonKey
        ? t(slide.secondaryButtonKey)
        : undefined,
      secondaryButtonLink: slide.secondaryButtonLink,
      secondaryButtonAction: slide.secondaryButtonAction || "link",
      secondaryButtonScrollTarget:
        slide.secondaryButtonScrollTarget || "quick-register-form",
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
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden pb-16">
      {/* Background Images - Slider */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
              index === currentIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <Image
              src={slide.image}
              alt={
                index === 0
                  ? "New construction homes in Florida - Rent to Own with $0 down payment - M.J. Newell Homes"
                  : index === 1
                  ? "Best home builder in Florida - Quality new homes for sale Miami, LaBelle, Lehigh Acres"
                  : "Buy house in Florida - New homes Miami, LaBelle - Home builder Florida"
              }
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
              sizes="100vw"
              suppressHydrationWarning
            />
          </div>
        ))}
        {/* Gradient Overlay - Lighter for more natural look */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
      </div>

      {/* Badge - Top Right Corner */}
      <div className="absolute top-4 sm:top-6 md:top-8 lg:top-12 right-4 sm:right-6 md:right-8 lg:right-12 z-30 animate-fade-in">
        <Link
          href="/schedule-appointment"
          className={cn(
            "relative w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto block",
            "cursor-pointer badge-3d-container"
          )}
          aria-label="Schedule your appointment - $0 Down Payment"
        >
          <Image
            src="/0down.png"
            alt="Down Payment & Closing Cost $0"
            width={256}
            height={256}
            className="w-full h-auto object-contain badge-image"
            priority
          />
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl">
            <div
              className={cn(
                "space-y-6 sm:space-y-8",
                "transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                isTransitioning ? "opacity-0" : "opacity-100"
              )}
              style={{
                transitionDelay: isTransitioning ? "0ms" : "100ms",
              }}
            >
              {/* Title */}
              <h1
                className={cn(
                  "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-white",
                  "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isTransitioning
                    ? "translate-y-4 opacity-0"
                    : "translate-y-0 opacity-100"
                )}
                style={{
                  textShadow:
                    "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
                  transitionDelay: isTransitioning ? "0ms" : "150ms",
                }}
                suppressHydrationWarning
              >
                {currentSlide.title}
                {currentSlide.subtitle && (
                  <span
                    className={cn(
                      "block text-primary mt-1 sm:mt-2 font-black",
                      "transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                      isTransitioning
                        ? "translate-x-4 opacity-0"
                        : "translate-x-0 opacity-100"
                    )}
                    style={{
                      textShadow:
                        "0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6), 0 0 30px rgba(3,106,255,0.3)",
                      transitionDelay: isTransitioning ? "0ms" : "250ms",
                    }}
                    suppressHydrationWarning
                  >
                    {currentSlide.subtitle}
                  </span>
                )}
              </h1>

              {/* Description */}
              {currentSlide.description && (
                <p
                  className={cn(
                    "text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-medium max-w-3xl leading-relaxed",
                    "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isTransitioning
                      ? "translate-y-4 opacity-0"
                      : "translate-y-0 opacity-100"
                  )}
                  style={{
                    textShadow:
                      "0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)",
                    transitionDelay: isTransitioning ? "0ms" : "300ms",
                  }}
                  suppressHydrationWarning
                >
                  {currentSlide.description}
                </p>
              )}

              {/* CTA Buttons */}
              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2",
                  "transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                  isTransitioning ? "opacity-0" : "opacity-100"
                )}
                style={{
                  transitionDelay: isTransitioning ? "0ms" : "400ms",
                }}
              >
                {currentSlide.primaryButton &&
                  (currentSlide.primaryButtonAction === "scroll" ? (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        const formSection = document.getElementById(
                          currentSlide.primaryButtonScrollTarget ||
                            "quick-register-form"
                        );
                        if (formSection) {
                          formSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
                      size="lg"
                      className={cn(
                        "bg-primary hover:bg-primary/90 text-white",
                        "px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6",
                        "text-base sm:text-lg font-bold",
                        "shadow-2xl hover:shadow-primary/40",
                        "transition-all duration-300 ease-out",
                        "hover:scale-105 active:scale-100",
                        "relative overflow-hidden group",
                        "border-2 border-primary/50"
                      )}
                    >
                      <span className="relative z-10" suppressHydrationWarning>
                        {currentSlide.primaryButton}
                      </span>
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Button>
                  ) : currentSlide.primaryButtonLink ? (
                    <Button
                      asChild
                      size="lg"
                      className={cn(
                        "bg-primary hover:bg-primary/90 text-white",
                        "px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6",
                        "text-base sm:text-lg font-bold",
                        "shadow-2xl hover:shadow-primary/40",
                        "transition-all duration-300 ease-out",
                        "hover:scale-105 active:scale-100",
                        "relative overflow-hidden group",
                        "border-2 border-primary/50"
                      )}
                    >
                      <Link
                        href={currentSlide.primaryButtonLink}
                        suppressHydrationWarning
                      >
                        <span className="relative z-10">
                          {currentSlide.primaryButton}
                        </span>
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      </Link>
                    </Button>
                  ) : null)}
                {currentSlide.secondaryButton &&
                  (currentSlide.secondaryButtonAction === "scroll" ? (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        const formSection = document.getElementById(
                          currentSlide.secondaryButtonScrollTarget ||
                            "quick-register-form"
                        );
                        if (formSection) {
                          formSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
                      variant="outline"
                      size="lg"
                      className={cn(
                        "bg-white/10 backdrop-blur-md border-2 border-white/40 text-white",
                        "px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6",
                        "text-base sm:text-lg font-bold",
                        "hover:bg-white/20 hover:border-white/60",
                        "shadow-xl hover:shadow-2xl",
                        "transition-all duration-300 ease-out",
                        "hover:scale-105 active:scale-100"
                      )}
                    >
                      <span suppressHydrationWarning>
                        {currentSlide.secondaryButton}
                      </span>
                    </Button>
                  ) : currentSlide.secondaryButtonLink ? (
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className={cn(
                        "bg-white/10 backdrop-blur-md border-2 border-white/40 text-white",
                        "px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6",
                        "text-base sm:text-lg font-bold",
                        "hover:bg-white/20 hover:border-white/60",
                        "shadow-xl hover:shadow-2xl",
                        "transition-all duration-300 ease-out",
                        "hover:scale-105 active:scale-100"
                      )}
                    >
                      <Link
                        href={currentSlide.secondaryButtonLink}
                        aria-label={
                          currentSlide.secondaryButtonLink ===
                          "/schedule-appointment"
                            ? "Schedule appointment - Home builder consultation Florida"
                            : "Learn more about Rent to Own - $0 down payment homes"
                        }
                        suppressHydrationWarning
                      >
                        {currentSlide.secondaryButton}
                      </Link>
                    </Button>
                  ) : null)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Natural Fade Out - Very smooth and subtle transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.4) 20%, hsl(var(--background) / 0.2) 40%, hsl(var(--background) / 0.08) 60%, hsl(var(--background) / 0.03) 80%, transparent 100%)",
        }}
      />

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
              "h-1.5 sm:h-2 rounded-full transition-all duration-200 ease-out cursor-pointer",
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
