"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/language-store";
import { HeroSlider } from "@/components/home/hero-slider";
import { InfiniteTextCarousel } from "@/components/home/infinite-text-carousel";
import { Features } from "@/components/home/features";
import { CommunitiesShowcase } from "@/components/home/communities-showcase";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Statistics } from "@/components/home/statistics";
import { HomeModels } from "@/components/home/home-models";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { LocationMap } from "@/components/home/location-map";
import { CTASection } from "@/components/home/cta-section";
import { HubSpotFormSection } from "@/components/home/hubspot-form-section";
import { PromotionModal } from "@/components/promotion/promotion-modal";
import { HappyFamiliesGallery } from "@/components/home/happy-families-gallery";
import { AnimatedSection } from "@/components/ui/animated-section";

/**
 * Verifica si las traducciones son válidas
 */
const isValidTranslations = (translations: unknown): translations is Record<string, unknown> => {
  return (
    !!translations &&
    typeof translations === "object" &&
    !Array.isArray(translations) &&
    Object.keys(translations).length > 0 &&
    "home" in translations &&
    "nav" in translations &&
    "rentToOwn" in translations
  );
};

export const HomePageContent = () => {
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const [isReady, setIsReady] = useState(() => {
    // Inicializar estado basado en traducciones actuales
    if (typeof window !== "undefined") {
      return isValidTranslations(translations);
    }
    return false;
  });
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    // Verificar si las traducciones están disponibles y son válidas
    const hasValidTranslations = isValidTranslations(translations);

    if (hasValidTranslations && !isLoading) {
      // Usar setTimeout para evitar llamar setState directamente en el efecto
      setTimeout(() => {
        setIsReady(true);
      }, 0);
      return;
    }

    // Timeout de seguridad: después de 100ms, renderizar de todos modos
    // Esto previene un flash de loading muy largo
    const timeout = setTimeout(() => {
      setHasTimedOut(true);
      setIsReady(true);
    }, 100);

    // Si no hay traducciones válidas y no está cargando, cargar el idioma guardado o inglés por defecto
    if (!hasValidTranslations && !isLoading) {
      let targetLang: "en" | "es" = "en";
      
      // Intentar obtener idioma guardado
      try {
        const stored = localStorage.getItem("language-storage");
        if (stored) {
          const parsed = JSON.parse(stored);
          const storedLang = parsed?.state?.language;
          if (storedLang === "en" || storedLang === "es") {
            targetLang = storedLang;
          }
        }
      } catch {
        // Si hay error, usar inglés por defecto
      }

      // Cargar el idioma seleccionado
      setLanguage(targetLang)
        .then(() => {
          clearTimeout(timeout);
          setTimeout(() => {
            setIsReady(true);
          }, 0);
        })
        .catch(() => {
          // Si falla, intentar inglés como fallback
          setLanguage("en")
            .then(() => {
              clearTimeout(timeout);
              setTimeout(() => {
                setIsReady(true);
              }, 0);
            })
            .catch(() => {
              // Aún así marcar como listo después del timeout
              clearTimeout(timeout);
              setTimeout(() => {
                setIsReady(true);
              }, 0);
            });
        });
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [translations, isLoading, setLanguage]);

  // Esperar a que las traducciones estén listas antes de renderizar
  // Esto previene que se muestren claves sin traducir en la primera carga
  // Pero con un timeout muy corto (100ms) para evitar flash de loading
  // Si las traducciones no están listas después de 100ms, renderizar de todos modos
  // (la función t() usará el cache si está disponible)
  if (!isReady && !hasTimedOut) {
    return null; // Renderizar null brevemente mientras se cargan las traducciones
  }

  return (
    <div className="flex flex-col w-full max-w-full">
      {/* 1. Hero Section - First impression with call to action */}
      <HeroSlider />

      {/* 2. Infinite Text Carousel - Brand message right after hero */}
      <AnimatedSection delay={50}>
        <InfiniteTextCarousel />
      </AnimatedSection>

      {/* 3. Happy Families Gallery - Real families, real trust (builds confidence) */}
      <AnimatedSection delay={100}>
        <HappyFamiliesGallery />
      </AnimatedSection>

      {/* 4. Home Models - Showcase available models immediately (main product) */}
      <AnimatedSection delay={150}>
        <HomeModels />
      </AnimatedSection>

      {/* 5. Features - Key benefits and what we offer */}
      <AnimatedSection delay={200}>
        <Features />
      </AnimatedSection>

      {/* 6. Communities Showcase - Where we build (locations) */}
      <AnimatedSection delay={100}>
        <CommunitiesShowcase />
      </AnimatedSection>

      {/* 7. Why Choose Us - Trust and credibility building */}
      <AnimatedSection delay={150}>
        <WhyChooseUs />
      </AnimatedSection>

      {/* 8. Statistics - Social proof with numbers and achievements */}
      <AnimatedSection delay={200}>
        <Statistics />
      </AnimatedSection>

      {/* 9. Testimonials - Customer stories and reviews */}
      <AnimatedSection delay={100}>
        <Testimonials />
      </AnimatedSection>

      {/* 10. How It Works - Process explanation (educational) */}
      <AnimatedSection delay={150}>
        <HowItWorks />
      </AnimatedSection>

      {/* 11. HubSpot Form - Lead capture (conversion point) */}
      <AnimatedSection delay={200}>
        <HubSpotFormSection />
      </AnimatedSection>

      {/* 12. Location Map - Physical presence and contact info */}
      <AnimatedSection delay={100}>
        <LocationMap />
      </AnimatedSection>

      {/* 13. Final CTA - Last call to action before footer */}
      <AnimatedSection delay={150}>
        <CTASection />
      </AnimatedSection>

      {/* Modal de promoción - solo aparece en home */}
      <PromotionModal />
    </div>
  );
};

