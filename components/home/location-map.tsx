"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, ExternalLink, Globe } from "lucide-react";
import { getCopy } from "@/lib/constants/copy";

const address = "45 Bridge St, LaBelle, FL 33935";
const googleMapsUrl = "https://maps.app.goo.gl/iPK2Xa6eG8RCyT8m8";
const googleMapsEmbedBaseUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d515.3257077253446!2d-81.43737737748471!3d26.762324092310248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db856a8ff9fc6b%3A0xce6810c83740a1d4!2sMJ%20Newell%20Homes!5e0!4v1765941661174";
const phone = "+12393239797";
const website = "mjnewellhomes.com";

const googleMapsEmbedUrl = `${googleMapsEmbedBaseUrl}&hl=en&gl=US`;

export const LocationMap = () => {

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" suppressHydrationWarning>{getCopy("location.title")}</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl" suppressHydrationWarning>{getCopy("location.subtitle")}</p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {/* Mapa — altura moderada en móvil para scroll/usabilidad */}
          <Card className="overflow-hidden border-2 order-2 md:order-1">
            <CardContent className="p-0">
              <div className="relative w-full h-[min(55vh,420px)] sm:h-[400px] md:h-[500px] min-h-[260px]">
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="M.J. Newell Homes Office Location - 45 Bridge St, LaBelle, FL 33935"
                  className="absolute inset-0 w-full h-full max-w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto — primero en móvil (orden natural) */}
          <Card className="border-2 order-1 md:order-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2" suppressHydrationWarning>
                <MapPin className="h-6 w-6 text-primary" />
                {getCopy("location.officeInfo")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2" suppressHydrationWarning>{getCopy("location.address")}</h3>
                  <p className="text-muted-foreground">{address}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2" suppressHydrationWarning>
                    <Phone className="h-5 w-5 text-primary" />
                    {getCopy("location.phone")}
                  </h3>
                  <a
                    href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {phone}
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2" suppressHydrationWarning>
                    <Globe className="h-5 w-5 text-primary" />
                    {getCopy("location.website")}
                  </h3>
                  <a
                    href={`https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {website}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <Button
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span suppressHydrationWarning>{getCopy("location.directions")}</span>
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <a
                    href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span suppressHydrationWarning>{getCopy("location.callNow")}</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

