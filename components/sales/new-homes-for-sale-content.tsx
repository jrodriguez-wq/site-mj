"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModelCard } from "@/components/models/model-card";
import { getModelData } from "@/lib/models/model-data";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { getAllModelKeys } from "@/lib/models/model-data";
import { sortModelsByPrice } from "@/lib/models/model-utils";
import { HOME_SALES_FAQ_ITEMS } from "@/lib/seo/home-sales-structured-data";
import type { ModelData } from "@/types/model";
import { MapPin, Home, ArrowRight, CheckCircle2 } from "lucide-react";

const MODEL_KEYS = [
  "louisiana",
  "viana",
  "delanie",
  "aurora",
  "langdon",
  "emelia",
  "duplex",
] as const;

export function NewHomesForSaleContent() {
  const [models, setModels] = useState<(ModelData & { key: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const keys = await getAllModelKeys();
      const data = await Promise.all(
        keys.map(async (key) => {
          const modelData = await getModelData(key, "labelle");
          return modelData ? { ...modelData, key } : null;
        })
      );
      const valid = data.filter((m): m is ModelData & { key: string } => m !== null);
      setModels(sortModelsByPrice(valid));
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main id="main-content">
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              Southwest Florida
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
              New Construction Homes for Sale
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Buy a brand-new home from M.J. Newell Homes in LaBelle or Lehigh Acres.
              Seven floor plans, transparent pricing from $316,900, and flexible financing
              including traditional purchase and Rent to Own.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/schedule-appointment">Schedule a Visit</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/models">Browse All Floor Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-t">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 md:p-8 space-y-4">
                <MapPin className="h-8 w-8 text-primary" aria-hidden />
                <h2 className="text-2xl font-bold">Homes for Sale in LaBelle, FL</h2>
                <p className="text-muted-foreground">
                  Six single-family models on spacious lots. New construction homes for sale
                  with no HOA fees on many communities.
                </p>
                <Button asChild variant="link" className="p-0 h-auto font-semibold">
                  <Link href="/communities/labelle">
                    View LaBelle homes <ArrowRight className="ml-1 h-4 w-4 inline" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 md:p-8 space-y-4">
                <MapPin className="h-8 w-8 text-primary" aria-hidden />
                <h2 className="text-2xl font-bold">Homes for Sale in Lehigh Acres, FL</h2>
                <p className="text-muted-foreground">
                  Langdon, Emelia, Delanie, and our Duplex model. Buy new construction near
                  Fort Myers with strong investment potential.
                </p>
                <Button asChild variant="link" className="p-0 h-auto font-semibold">
                  <Link href="/communities/lehigh-acres">
                    View Lehigh Acres homes <ArrowRight className="ml-1 h-4 w-4 inline" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-black">Models for Sale</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore new construction floor plans available for purchase. Click any model
              for photos, features, and pricing.
            </p>
          </div>
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
              {MODEL_KEYS.map((key) => (
                <div key={key} className="h-96 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
              {models.map((modelData, index) => (
                <ModelCard
                  key={modelData.key}
                  modelKey={modelData.key}
                  name={modelData.name}
                  description={modelData.description}
                  image={getModelMainImage(modelData.key)}
                  images={getModelImages(modelData.key)}
                  price={modelData.price}
                  rtoPrice={modelData.rtoPrice}
                  beds={modelData.bedrooms}
                  bedsLabel="Beds"
                  baths={modelData.bathrooms}
                  bathsLabel="Baths"
                  sqft={modelData.sqft}
                  sqftLabel="Sq. Ft."
                  community="labelle"
                  initialDelay={index * 0.05}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center space-y-4 mb-10">
            <Home className="h-10 w-10 text-primary mx-auto" aria-hidden />
            <h2 className="text-3xl md:text-4xl font-black">How to Buy Your New Home</h2>
          </div>
          <ul className="space-y-4">
            {[
              "Browse models and communities on this page or schedule a visit to our office.",
              "Choose your floor plan and community (LaBelle or Lehigh Acres).",
              "Secure financing — traditional mortgage, cash, or our Rent to Own program.",
              "Sign your purchase agreement and watch your home built with quality craftsmanship.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" aria-hidden />
                <span className="text-muted-foreground text-lg">{step}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Button asChild>
              <Link href="/home-buying-guide">Home Buying Guide</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/rent-to-own">Rent to Own Option</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30" id="faq">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8">
            Frequently Asked Questions — Buying a New Home
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {HOME_SALES_FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-foreground text-background text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-background">Ready to buy your new home?</h2>
          <p className="text-background/80">
            Contact our team today to see homes for sale and get personalized pricing for
            LaBelle and Lehigh Acres.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 rounded-xl"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold border-2 border-background/40 bg-transparent text-white hover:text-white hover:bg-background/10 hover:border-background/60 transition-all duration-300 rounded-xl"
            >
              <Link href="/schedule-appointment">Schedule Appointment</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
