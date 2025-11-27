import { generateMetadata } from "@/lib/seo/metadata";
import { PageContent } from "@/components/layout/page-container";

export const metadata = generateMetadata({
  title: "About Us",
  description: "Learn about M.J. Newell Homes. Building American homes in South Florida with over 50 years of experience.",
});

export default function AboutUsPage() {
  return (
    <PageContent size="sm">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            About Us
          </h1>
        </div>

        <div className="space-y-6 prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground">
            Your dream became our purpose.
          </p>
          <p>
            M.J. Newell Homes is dedicated to building American homes in South
            Florida. With over 50 years of experience, we specialize in new
            construction homes in LaBelle and Lehigh Acres, Florida.
          </p>
          <p>
            We are building the future for American families in South Florida.
            Our commitment is to provide quality homes with exceptional pricing,
            no HOA fees, and flexible financing options including our innovative
            Rent to Own program.
          </p>
        </div>
      </div>
    </PageContent>
  );
}

