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
import { useScrollAnimation } from "@/lib/utils/animations";

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const HomePageContent = () => {
  return (
    <div className="flex flex-col">
      <HeroSlider />
      
      <InfiniteTextCarousel />

      <AnimatedSection>
        <Features />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <CommunitiesShowcase />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <WhyChooseUs />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <HubSpotFormSection />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <Statistics />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <HomeModels />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <Testimonials />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <LocationMap />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <CTASection />
      </AnimatedSection>
    </div>
  );
};

