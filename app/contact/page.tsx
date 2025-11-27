import { generateMetadata } from "@/lib/seo/metadata";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT_INFO } from "@/config/seo";
import { PageContent } from "@/components/layout/page-container";

export const metadata = generateMetadata({
  title: "Contact Us",
  description: "Contact M.J. Newell Homes. Get in touch with our team for questions about our homes, Rent to Own program, or to schedule a viewing.",
});

export default function ContactPage() {
  return (
    <PageContent size="md">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground">
            Get in touch with our team
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                    {CONTACT_INFO.phoneSecondary && (
                      <a
                        href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s/g, "")}`}
                        className="block text-muted-foreground hover:text-primary"
                      >
                        {CONTACT_INFO.phoneSecondary}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">
                      {CONTACT_INFO.address.addressLocality}, {CONTACT_INFO.address.addressRegion}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(239) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContent>
  );
}

