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

export const HomePageContent = () => {
  return (
    <div className="flex flex-col">
      <HeroSlider />
      
      <HubSpotFormSection />
      
      <InfiniteTextCarousel />

      <Features />

      <CommunitiesShowcase />

      <WhyChooseUs />

      <Statistics />

      <HomeModels />

      <HowItWorks />

      <Testimonials />

      <LocationMap />

      <CTASection />
    </div>
  );
};

