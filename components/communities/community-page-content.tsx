"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { 
  Fish, TreePine, Sailboat, Droplets, Users, 
  Home, Square, Car 
} from "lucide-react";

// Mapa de iconos por nombre
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Fish,
  TreePine,
  Sailboat,
  Waves: Droplets, // Waves no existe en lucide-react, usamos Droplets como alternativa
  Droplets,
  Users,
  Home,
  Square,
  Car,
};

interface Activity {
  icon: string; // Nombre del icono como string
  title: string;
  description: string;
}

interface Feature {
  icon: string; // Nombre del icono como string
  label: string;
}

interface CommunityPageContentProps {
  aboutTitle: string;
  aboutDescription: string;
  activitiesTitle: string;
  activities: Activity[];
  features: Feature[];
  futureTitle: string;
  futureDescription: string;
  scheduleTitle: string;
  scheduleDescription: string;
  scheduleButton: string;
  galleryTitle: string;
  galleryImages: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
}

export const CommunityPageContent = ({
  aboutTitle,
  aboutDescription,
  activitiesTitle,
  activities,
  features,
  futureTitle,
  futureDescription,
  scheduleTitle,
  scheduleDescription,
  scheduleButton,
  galleryTitle,
  galleryImages,
  ctaTitle,
  ctaDescription,
  ctaButton,
}: CommunityPageContentProps) => {
  return (
    <>
      {/* About Section */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 mb-20 md:mb-24">
        <div className="relative overflow-hidden bg-muted/30 rounded-3xl p-10 md:p-14 lg:p-16 border border-border/50 shadow-lg">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-foreground" suppressHydrationWarning>
              {aboutTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl" suppressHydrationWarning>
              {aboutDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Family-Friendly Activities */}
      <section className="pt-12 md:pt-16 pb-12 md:pb-16 mb-20 md:mb-24">
        <div className="text-center space-y-4 mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>
            {activitiesTitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.icon];
            if (!Icon) return null;
            return (
              <div key={index} className="text-center group">
                <div className="flex flex-col items-center space-y-5">
                  <div className="p-5 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground" suppressHydrationWarning>
                      {activity.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 mb-20 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            if (!Icon) return null;
            return (
              <div key={index} className="text-center group">
                <div className="flex flex-col items-center space-y-6">
                  <div className="p-6 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110 shadow-md">
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground" suppressHydrationWarning>
                      {feature.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Future of Florida Section */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 mb-20 md:mb-24">
        <div className="py-20 md:py-24 px-8 md:px-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl border border-primary/20 shadow-xl">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground" suppressHydrationWarning>
              {futureTitle}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary rounded-full mx-auto"></div>
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium" suppressHydrationWarning>
              {futureDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Your Visit Section */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 mb-20 md:mb-24">
        <div className="bg-primary/5 rounded-3xl p-10 md:p-14 lg:p-16 border border-primary/10 shadow-lg">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="p-5 bg-primary/10 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <Calendar className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" suppressHydrationWarning>
                {scheduleTitle}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                {scheduleDescription}
              </p>
            </div>
            <div className="pt-6">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-10 py-7 text-lg md:text-xl font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group hover:scale-105">
                <Link href="/contact">
                  {scheduleButton}
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 mb-20 md:mb-24">
        <div className="space-y-12 md:space-y-16">
          <div className="text-center space-y-5">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground" suppressHydrationWarning>
              {galleryTitle}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary rounded-full mx-auto"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the beauty and charm of our community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-border/30 hover:border-primary/50 transition-all duration-500 group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`${galleryTitle} - ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-20 mb-12 md:mb-16">
        <div className="text-center">
          <Card className="bg-gradient-to-br from-primary/15 via-primary/8 to-background border-2 border-primary/30 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="pt-20 pb-20 px-8 md:px-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground" suppressHydrationWarning>
                {ctaTitle}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                {ctaDescription}
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-12 py-8 text-xl font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                <Link href="/rent-to-own">
                  {ctaButton}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

