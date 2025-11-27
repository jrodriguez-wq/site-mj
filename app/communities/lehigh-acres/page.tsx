import { generateMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";

export const metadata = generateMetadata({
  title: "Lehigh Acres, Florida",
  description: "New homes in Lehigh Acres, Florida. Enjoy 5 years of rent stability. Apply now!",
});

export default function LehighAcresPage() {
  return (
    <PageContent size="md">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Lehigh Acres, Florida
          </h1>
          <p className="text-xl text-muted-foreground">
            Enjoy 5 years of rent stability
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About Lehigh Acres</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Lehigh Acres is a growing community in Southwest Florida, offering
              affordable living with great amenities. Our new construction homes
              in Lehigh Acres feature modern designs, spacious layouts, and our
              innovative Rent to Own program with 5 years of rent stability.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/rent-to-own">Apply Now</Link>
          </Button>
        </div>
      </div>
    </PageContent>
  );
}

