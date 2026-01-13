"use client";

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

export const HomePageContent = () => {
  // TranslationLoader en el layout maneja la carga de traducciones globalmente
  // Los componentes hijos usan useTranslation() que automáticamente muestra
  // las traducciones cuando están disponibles, o la key como fallback
  // Esto evita errores de hidratación mientras mantiene la funcionalidad
  
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
