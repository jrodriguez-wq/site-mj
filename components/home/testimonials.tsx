"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t("testimonials.testimonials.1.name"),
      location: t("testimonials.testimonials.1.location"),
      text: t("testimonials.testimonials.1.text"),
      rating: 5,
      image: "/img/testimonios/t1.webp",
    },
    {
      name: t("testimonials.testimonials.2.name"),
      location: t("testimonials.testimonials.2.location"),
      text: t("testimonials.testimonials.2.text"),
      rating: 5,
      image: "/img/testimonios/t2.jpg",
    },
    {
      name: t("testimonials.testimonials.3.name"),
      location: t("testimonials.testimonials.3.location"),
      text: t("testimonials.testimonials.3.text"),
      rating: 5,
      image: "/img/testimonios/t3.jpg",
    },
    {
      name: t("testimonials.testimonials.4.name"),
      location: t("testimonials.testimonials.4.location"),
      text: t("testimonials.testimonials.4.text"),
      rating: 5,
      image: "/img/testimonios/t4.jpg",
    },
    {
      name: t("testimonials.testimonials.5.name"),
      location: t("testimonials.testimonials.5.location"),
      text: t("testimonials.testimonials.5.text"),
      rating: 5,
      image: "/img/testimonios/t5.jpg",
    },
    {
      name: t("testimonials.testimonials.6.name"),
      location: t("testimonials.testimonials.6.location"),
      text: t("testimonials.testimonials.6.text"),
      rating: 5,
      image: "/img/testimonios/t6.jpg",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-linear-to-b from-background via-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(3,106,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(3,106,255,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center space-y-6 mb-24">
          <div className="inline-block">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-linear-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent" suppressHydrationWarning>
              {t("testimonials.title")}
            </h2>
            <div className="h-2 w-32 bg-linear-to-r from-primary via-primary/80 to-primary/40 mx-auto mt-6 rounded-full shadow-lg shadow-primary/20" />
          </div>
          <p className="mx-auto max-w-[750px] text-muted-foreground/80 text-lg md:text-xl lg:text-2xl leading-relaxed font-light tracking-wide" suppressHydrationWarning>
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group relative overflow-visible border-0 bg-card/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_80px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-4 rounded-4xl"
              style={{
                transform: "perspective(1000px) rotateX(0deg)",
              }}
            >
              <div className="absolute -inset-px bg-linear-to-br from-primary/20 via-primary/5 to-primary/10 rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              
              <div className="absolute inset-0 bg-linear-to-br from-primary/3 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-4xl" />
              
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/8 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200" />
              
              <CardContent className="p-0 relative z-10">
                <div className="relative w-full aspect-5/4 bg-linear-to-br from-muted/60 via-muted/40 to-muted/50 overflow-hidden rounded-t-4xl">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(3,106,255,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <Image
                    src={testimonial.image}
                    alt={`Testimonial ${index + 1}`}
                    fill
                    className="object-contain p-10 transition-all duration-700 group-hover:scale-[1.12] group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  <div className="absolute top-7 right-7 flex items-center gap-1.5 bg-white/98 backdrop-blur-xl rounded-full px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.15)] border border-white/70 group-hover:scale-110 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4.5 w-4.5 fill-amber-400 text-amber-400 drop-shadow-md"
                      />
                    ))}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-card via-card/98 to-transparent" />
                </div>

                <div className="p-10 md:p-12 lg:p-14 space-y-8">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 w-20 h-20 text-primary/10 group-hover:text-primary/15 transition-all duration-700 group-hover:scale-110">
                      <Quote className="w-full h-full" strokeWidth={1.5} />
                    </div>
                    <p className="relative text-foreground/90 leading-[1.85] text-base md:text-lg font-extralight italic line-clamp-4 group-hover:text-foreground transition-colors duration-500 pl-8 tracking-wide" suppressHydrationWarning>
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>

                  <div className="pt-8 border-t border-border/20 space-y-4">
                    <div className="font-bold text-xl md:text-2xl lg:text-2xl text-foreground group-hover:text-primary transition-colors duration-500 tracking-tight leading-tight" suppressHydrationWarning>
                      {testimonial.name}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground/70 flex items-center gap-3 font-medium group-hover:text-muted-foreground transition-colors duration-500">
                      <MapPin className="h-4 w-4 text-primary/60 group-hover:text-primary/80 transition-colors duration-500" />
                      <span className="tracking-wide" suppressHydrationWarning>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
