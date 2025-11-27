import { generateMetadata } from "@/lib/seo/metadata";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContent } from "@/components/layout/page-container";
import { FileCheck, MapPin, Home, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: FileCheck,
    title: "Get Pre-Approved",
    description: "Start by getting pre-approved for financing. This helps you understand your budget and shows sellers you're serious.",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Choose Your Location",
    description: "Select between our communities in LaBelle or Lehigh Acres, each offering unique benefits and amenities.",
  },
  {
    number: "03",
    icon: Home,
    title: "Select Your Model",
    description: "Choose from our available models: Louisiana, Viana, Delanie, Aurora, Langdon, or Emelia.",
  },
  {
    number: "04",
    icon: DollarSign,
    title: "Financing Options",
    description: "Explore our financing options including traditional mortgages and our Rent to Own program with $0 down payment.",
  },
];

export const metadata = generateMetadata({
  title: "Home Buying Guide",
  description: "Complete guide to buying your new home. Get free advice on the buying process of your property.",
});

export default function HomeBuyingGuidePage() {
  return (
    <PageContent size="md">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Home Buying Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get free advice on the buying process of your property. Follow these simple steps to make your homeownership dream a reality.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                className={cn(
                  "group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/50"
                )}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-primary/60 mb-1">
                        Step {step.number}
                      </div>
                      <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageContent>
  );
}

