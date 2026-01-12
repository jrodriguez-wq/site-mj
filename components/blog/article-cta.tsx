"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export const ArticleCTA = () => {
  return (
    <section className="mt-12 md:mt-16 py-8 md:py-12 px-6 md:px-10 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
          Ready to Find Your Florida Home?
        </h3>
        <p className="text-base md:text-lg text-muted-foreground">
          Explore your options with M.J. Newell Homes today. We are here to guide you every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/schedule-appointment">
              <Calendar className="h-4 w-4" />
              Schedule Appointment
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/rent-to-own">
              Learn About Rent to Own
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

