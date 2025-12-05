"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, Mail, FileText } from "lucide-react";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";
import { useTranslation } from "@/hooks/use-translation";

function ThankYouContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const formType = searchParams.get("type") || "contact";

  const formConfig = {
    contact: {
      titleKey: "thankYou.contact.title",
      subtitleKey: "thankYou.contact.subtitle",
      messageKey: "thankYou.contact.message",
      icon: Mail,
    },
    warranty: {
      titleKey: "thankYou.warranty.title",
      subtitleKey: "thankYou.warranty.subtitle",
      messageKey: "thankYou.warranty.message",
      icon: FileText,
    },
  };

  const config = formConfig[formType as keyof typeof formConfig] || formConfig.contact;
  const Icon = config.icon;

  return (
    <PageContent size="md">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" suppressHydrationWarning>
            {t(config.titleKey) || "Thank You!"}
          </h1>
          <p className="text-xl text-muted-foreground" suppressHydrationWarning>
            {t(config.subtitleKey) || "We've received your message"}
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle suppressHydrationWarning>
              {t(config.titleKey) || "Thank You!"}
            </CardTitle>
            <CardDescription className="text-base" suppressHydrationWarning>
              {t(config.messageKey) || "We'll get back to you as soon as possible."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground" suppressHydrationWarning>
                {formType === "warranty" 
                  ? t("thankYou.warranty.nextSteps") || "Our warranty team will review your request and contact you shortly."
                  : t("thankYou.contact.nextSteps") || "Our team will review your message and get back to you within 24-48 hours."
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="flex-1">
                <Link href="/" suppressHydrationWarning>
                  <Home className="h-4 w-4 mr-2" />
                  {t("thankYou.backHome") || "Back to Home"}
                </Link>
              </Button>
              {formType === "warranty" ? (
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link href="/warranty" suppressHydrationWarning>
                    {t("thankYou.viewWarranty") || "View Warranty Info"}
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link href="/contact" suppressHydrationWarning>
                    {t("thankYou.contactAgain") || "Contact Us Again"}
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContent>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <PageContent size="md">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </PageContent>
    }>
      <ThankYouContent />
    </Suspense>
  );
}

