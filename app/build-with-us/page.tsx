import { generateMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";

export const metadata = generateMetadata({
  title: "Build With Us",
  description: "Build your custom home with M.J. Newell Homes. New construction homes in South Florida.",
});

export default function BuildWithUsPage() {
  return (
    <PageContent size="md">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Build With Us
          </h1>
          <p className="text-xl text-muted-foreground">
            Your first home should feel just right from the beginning
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Move-In Ready with All the Right Appliances</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              These new homes feature fully equipped kitchens with all the
              essential appliances — including a stove, oven, refrigerator,
              dishwasher, and microwave — so you&apos;re ready to settle in and start
              making memories.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quality Construction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Over 50 years of experience building quality homes for American
                families.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modern Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Contemporary floor plans with modern amenities and finishes.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </PageContent>
  );
}

