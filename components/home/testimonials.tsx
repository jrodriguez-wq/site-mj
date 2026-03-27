"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MapPin } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GoogleReviewsLink } from "@/components/reviews/google-reviews-link";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";

const TESTIMONIALS = [
  {
    name: "Maria G.",
    location: "LaBelle, FL",
    text: "We got our home through Rent to Own. The process was clear and the team was always there to answer our questions. We love our new home.",
    rating: 5,
    image: getCloudinaryImageUrl("/recursos/clientes/testimonio-6.webp"),
  },
  {
    name: "James & Lisa T.",
    location: "Lehigh Acres, FL",
    text: "M.J. Newell made it possible for us to own a home without a big down payment. The quality of the build is great and we couldn't be happier.",
    rating: 5,
    image: getCloudinaryImageUrl("/recursos/clientes/testimonio-5.webp"),
  },
  {
    name: "Carlos R.",
    location: "LaBelle, FL",
    text: "From the first visit to the keys, everything was professional. They explained every step and helped us with the Rent to Own program. Highly recommend.",
    rating: 5,
    image: getCloudinaryImageUrl("/recursos/clientes/testimonio-4.webp"),
  },
  {
    name: "Jennifer M.",
    location: "Lehigh Acres, FL",
    text: "We were first-time buyers and a bit nervous. The team made it easy. Our new home is beautiful and the neighborhood is perfect for our family.",
    rating: 5,
    image: getCloudinaryImageUrl("/recursos/clientes/testimonio-3.webp"),
  },
  {
    name: "Robert & Ana S.",
    location: "LaBelle, FL",
    text: "Rent to Own was the right choice for us. We're building equity while we live here and the monthly payment was something we could manage.",
    rating: 5,
    image: getCloudinaryImageUrl("/recursos/clientes/testimonio-2.webp"),
  },
  {
    name: "David K.",
    location: "Lehigh Acres, FL",
    text: "Great experience from start to finish. The house is well built, the price was fair, and the team was responsive. Would recommend to anyone.",
    rating: 5,
    image: getCloudinaryImageUrl("/recursos/clientes/testimonio-1.webp"),
  },
];

export const Testimonials = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(3,106,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(3,106,255,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
        <AnimatedSection className="text-center space-y-4 sm:space-y-5 md:space-y-6 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="inline-block">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent px-2">
              What Our Families Say
            </h2>
            <div className="h-1 sm:h-1.5 md:h-2 w-24 sm:w-28 md:w-32 bg-gradient-to-r from-primary via-primary/80 to-primary/40 mx-auto mt-3 sm:mt-4 md:mt-6 rounded-full shadow-lg shadow-primary/20" />
          </div>
          <p className="mx-auto max-w-[750px] text-muted-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light tracking-wide px-4">
            Real stories from families who built or bought their new home with M.J. Newell Homes.
          </p>
          <div className="flex justify-center pt-2">
            <GoogleReviewsLink variant="outline" />
          </div>
        </AnimatedSection>

        <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <AnimatedCard key={index} index={index}>
              <Card className="group relative overflow-hidden border-2 bg-card hover:shadow-2xl transition-all duration-200 p-0 flex flex-col h-full">
              <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 bg-muted/30 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name} - M.J. Newell Homes testimonial`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-medium">{testimonial.location}</span>
                </div>
              </div>
              <CardContent className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="h-10 w-10 text-primary/30 mb-4" />
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
              </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};
