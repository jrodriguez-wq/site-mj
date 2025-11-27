import { generateMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";

export const metadata = generateMetadata({
  title: "LaBelle, Florida",
  description: "New homes in LaBelle, Florida. Family homes on 1/4 acre lots. Rent to Own available. Apply now!",
});

export default function LaBellePage() {
  return (
    <PageContent size="md">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            LaBelle, Florida
          </h1>
          <p className="text-xl text-muted-foreground">
            New and modern constructions. Family homes on a 1/4 acre.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About LaBelle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              LaBelle is a charming community in Southwest Florida, perfect for
              families looking for a peaceful lifestyle with easy access to
              major cities. Our new construction homes in LaBelle offer modern
              amenities, spacious lots, and exceptional value.
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

