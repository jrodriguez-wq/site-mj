"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, ExternalLink, Globe } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const address = "45 Bridge St, LaBelle, FL 33935";
const googleMapsUrl = "https://www.google.com/maps?q=45+Bridge+St,+LaBelle,+FL+33935";
const phone = "+12393239797";
const website = "mjnewellhomes.com";

export const LocationMap = () => {
  const { t } = useTranslation();
  const encodedAddress = encodeURIComponent(address);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" suppressHydrationWarning>{t("location.title")}</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl" suppressHydrationWarning>{t("location.subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Mapa */}
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              <div className="relative w-full h-[400px] md:h-[500px]">
                <iframe
                  src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="M.J. Newell Homes Office Location - 45 Bridge St, LaBelle, FL 33935"
                  className="absolute inset-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2" suppressHydrationWarning>
                <MapPin className="h-6 w-6 text-primary" />
                {t("location.officeInfo")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2" suppressHydrationWarning>{t("location.address")}</h3>
                  <p className="text-muted-foreground">{address}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2" suppressHydrationWarning>
                    <Phone className="h-5 w-5 text-primary" />
                    {t("location.phone")}
                  </h3>
                  <a
                    href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {phone}
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2" suppressHydrationWarning>
                    <Globe className="h-5 w-5 text-primary" />
                    {t("location.website")}
                  </h3>
                  <a
                    href={`https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
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
                    <span suppressHydrationWarning>{t("location.directions")}</span>
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
                    <span suppressHydrationWarning>{t("location.callNow")}</span>
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

