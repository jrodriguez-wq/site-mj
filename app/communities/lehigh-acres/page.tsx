import Image from "next/image";
import { PageContent } from "@/components/layout/page-container";
import { CommunityModelsSection } from "@/components/communities/community-models-section";
import { CommunityPageContent } from "@/components/communities/community-page-content";

const lehighAcresImages = [
  "/recursos/shutterstock_1197062707.jpg",
  "/recursos/shutterstock_2252703911.jpg",
  "/recursos/shutterstock_440999080.jpg",
  "/recursos/shutterstock_1065297917.jpg",
];

const lehighAcresActivities = [
  {
    icon: "Droplets",
    title: "Beaches",
    description: "Explore Florida's most beautiful beaches",
  },
  {
    icon: "Users",
    title: "Entertainment",
    description: "Entertainment for the whole family",
  },
  {
    icon: "TreePine",
    title: "Nature",
    description: "Enjoy the harmony of nature's wonders",
  },
];

const lehighAcresModels = [
  { key: "viana" },
  { key: "delanie" },
  { key: "langdon" },
  { key: "emelia" },
];

export default function LehighAcresPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Image */}
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px] overflow-hidden">
        <Image
          src={lehighAcresImages[0]}
          alt="Lehigh Acres, Florida - Beautiful community"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
          <div className="max-w-5xl mx-auto">
            <div className="mb-2 sm:mb-3 md:mb-4">
              <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider bg-background/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20 shadow-lg">
                Communities
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-foreground drop-shadow-2xl mb-2 sm:mb-3 md:mb-4 leading-tight">
              Lehigh Acres Country
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-foreground/95 drop-shadow-lg font-semibold">
              Your Perfect Home Awaits in Southwest Florida
            </p>
          </div>
        </div>
      </div>

      <PageContent size="lg">
        <div className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24">
          <CommunityPageContent
            aboutTitle="About Lehigh Acres"
            aboutDescription="Lehigh Acres is situated on one of the most elevated areas of land in Lee County, between 27 and 30 feet above sea level. In this community, residents can enjoy freshwater fishing year-round, world-class golf courses, tennis, bicycling, nature trails, and numerous other activities at various clubs and organizations. As one of the fastest growing cities in the state of Florida, Lehigh Acres has nearly doubled in new home construction within the last 24 months. It is located only 15 minutes east of Cape Coral, 12 miles (19 kilometers) east of Fort Myers, and is equidistant to 3 major cities: Miami, Orlando and Tampa. Lehigh Acres offers beautiful lakes and is approximately 35 minutes away from a few of Florida's most breathtaking beaches, including Bonita Beach, Fort Myers Beach, and the Islands of Sanibel and Captiva."
            activitiesTitle="Family-friendly Activities"
            activities={lehighAcresActivities}
            features={[
              { icon: "Square", label: "Spacious Lots" },
              { icon: "Home", label: "Great Schools" },
              { icon: "Car", label: "Prime Location" },
            ]}
            futureTitle="The Future of Florida"
            futureDescription="Purchase your home in a dream city. New constructions in Southwest Florida. Purchase your new home with $0 down payment benefits and closing cost assistance!"
            scheduleTitle="Schedule your visit to our model homes with us"
            scheduleDescription="Receive personalized consultation in choosing your property and financing options"
            scheduleButton="Schedule Your Visit"
            galleryTitle="Discover Lehigh Acres"
            galleryImages={lehighAcresImages}
            ctaTitle="Ready to Call Lehigh Acres Home?"
            ctaDescription="Explore our Rent to Own program and start your journey to homeownership today."
            ctaButton="Apply Now"
          />

          <div className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
            <CommunityModelsSection
              modelKeys={lehighAcresModels.map((m) => m.key)}
              title="Available Models"
              subtitle="Choose from our beautiful home models available in Lehigh Acres"
            />
          </div>
        </div>
      </PageContent>
    </div>
  );
}
