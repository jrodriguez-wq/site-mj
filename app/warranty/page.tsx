import { generateMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";

export const metadata = generateMetadata({
  title: "Warranty",
  description: "Warranty and service request for your M.J. Newell Home. We stand behind our quality construction.",
});

export default function WarrantyPage() {
  return (
    <PageContent size="md">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Warranty & Service
          </h1>
          <p className="text-xl text-muted-foreground">
            We stand behind our quality construction
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Warranty Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              M.J. Newell Homes provides comprehensive warranty coverage for all
              new construction homes. We are committed to ensuring your home
              remains in excellent condition.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Submit Service Request</Link>
          </Button>
        </div>
      </div>
    </PageContent>
  );
}

