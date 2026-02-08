"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getCopy } from "@/lib/constants/copy";

interface CommunityMapProps {
  community: "labelle" | "lehighAcres";
}

const MAP_EMBEDS: Record<"labelle" | "lehighAcres", string> = {
  labelle: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.4422068644217!2d-81.4369275!3d26.762170599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db856a8ff9fc6b%3A0xce6810c83740a1d4!2sMJ%20Newell%20Homes!5e0!3m2!1sen!2sus!4v1769646871527!5m2!1sen!2sus",
  lehighAcres: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22780.123456789!2d-81.6368!3d26.6050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db856a8ff9fc6b%3A0xce6810c83740a1d4!2sLehigh%20Acres%2C%20FL!5e0!3m2!1sen!2sus!4v1769646871527!5m2!1sen!2sus",
};

export const CommunityMap = ({ community }: CommunityMapProps) => {
  const mapUrl = MAP_EMBEDS[community];

  return (
    <section className="py-10 md:py-14 lg:py-18 bg-background">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
              {getCopy("location.title")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              {community === "labelle" ? "Find our LaBelle community on the map." : "Find our Lehigh Acres community on the map."}
            </p>
          </div>

          <Card className="overflow-hidden border-2 shadow-lg">
            <CardContent className="p-0">
              <div className="relative w-full h-[450px] md:h-[500px] lg:h-[600px]">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title={community === "labelle" ? "LaBelle community map" : "Lehigh Acres community map"}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
