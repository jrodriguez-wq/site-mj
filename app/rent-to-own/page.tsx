import { generateMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";

export const metadata = generateMetadata({
  title: "Rent to Own",
  description: "Rent today, own tomorrow. Enjoy 5 years of rent stability. Apply now for your new home with $0 down payment benefits.",
});

export default function RentToOwnPage() {
  return (
    <PageContent size="sm">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Rent to Own
          </h1>
          <p className="text-xl text-muted-foreground">
            Rent today, Own Tomorrow
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enjoy 5 Years of Rent Stability</CardTitle>
              <CardDescription>
                Lock in your rent for 5 years while you work toward homeownership
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our Rent to Own program allows you to move into your dream home
                today while building equity for tomorrow. With $0 down payment
                benefits and closing cost assistance, homeownership has never
                been more accessible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">1. Apply Now</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out our simple application to get started.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">2. Choose Your Home</h3>
                <p className="text-sm text-muted-foreground">
                  Select from our available models in LaBelle or Lehigh Acres.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">3. Move In</h3>
                <p className="text-sm text-muted-foreground">
                  Start renting while building toward ownership.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageContent>
  );
}

