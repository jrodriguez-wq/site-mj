import Image from "next/image";
import { PageContent } from "@/components/layout/page-container";
import { CommunityModelsSection } from "@/components/communities/community-models-section";
import { CommunityPageContent } from "@/components/communities/community-page-content";

const labelleImages = [
  "/recursos/shutterstock_1065297917.jpg",
  "/recursos/shutterstock_1197062707.jpg",
  "/recursos/shutterstock_2252703911.jpg",
  "/recursos/shutterstock_440999080.jpg",
];

const labelleActivities = [
  {
    icon: "Fish",
    title: "Fishing",
    description: "Enjoy freshwater fishing in the beautiful waters of LaBelle",
  },
  {
    icon: "TreePine",
    title: "Outdoor Walks",
    description: "Explore nature trails surrounded by oak trees",
  },
  {
    icon: "Sailboat",
    title: "Boating",
    description: "Experience boating on the Caloosahatchee River",
  },
];

const labelleModels = [
  { key: "louisiana" },
  { key: "viana" },
  { key: "delanie" },
  { key: "aurora" },
  { key: "langdon" },
  { key: "emelia" },
];

export default function LaBellePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Image */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <Image
          src={labelleImages[0]}
          alt="LaBelle, Florida - Beautiful community"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <div className="max-w-5xl mx-auto">
            <div className="mb-4">
              <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider bg-background/90 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 shadow-lg">
                Communities
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground drop-shadow-2xl mb-4 leading-tight">
              LaBelle Country
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/95 drop-shadow-lg font-semibold">
              Discover Your Dream Home in Southwest Florida
            </p>
          </div>
        </div>
      </div>

      <PageContent size="lg">
        <div className="py-16 md:py-20 lg:py-24">
          <CommunityPageContent
            aboutTitle="About LaBelle"
            aboutDescription="The city of LaBelle is located in a region with exuberant forests and wildlife, immersed in oak trees that characterize its landscape and provide shade to its land. With the oak tree being a species that still remains an insignia in the region, it continues to inhabit most residential developments throughout the area. The city of LaBelle is the main urban conglomerate in the region today and preserves an important historical center with buildings constructed at the end of the 19th century and the beginning of the 20th century. LaBelle continues to contribute to the conservation of the rich architectural heritage in Florida. While cultivating its history, it proudly welcomes the urbanization of its developing areas."
            activitiesTitle="Family-friendly Activities"
            activities={labelleActivities}
            features={[
              { icon: "Square", label: "1/4 Acre Lots" },
              { icon: "Home", label: "No HOA Fees" },
              { icon: "Car", label: "Family-Friendly" },
            ]}
            futureTitle="The Future of Florida"
            futureDescription="Purchase your home in a dream city. New constructions in Southwest Florida. Purchase your new home with $0 down payment benefits and closing cost assistance!"
            scheduleTitle="Schedule your visit to our model homes with us"
            scheduleDescription="Receive personalized consultation in choosing your property and financing options"
            scheduleButton="Schedule Your Visit"
            galleryTitle="Discover LaBelle"
            galleryImages={labelleImages}
            ctaTitle="Ready to Call LaBelle Home?"
            ctaDescription="Explore our Rent to Own program and start your journey to homeownership today."
            ctaButton="Apply Now"
          />

          <div className="pt-20 md:pt-24 pb-12 md:pb-16">
            <CommunityModelsSection
              modelKeys={labelleModels.map((m) => m.key)}
              title="Available Models"
              subtitle="Choose from our beautiful home models available in LaBelle"
            />
          </div>
        </div>
      </PageContent>
    </div>
  );
}
