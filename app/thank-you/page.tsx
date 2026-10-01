"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, Mail, FileText } from "lucide-react";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { motion } from "framer-motion";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const formType = searchParams.get("type") || "contact";

  const formConfig = {
    contact: {
      title: "Thank You!",
      message: "We'll get back to you as soon as possible.",
      icon: Mail,
    },
    warranty: {
      title: "Request Received",
      message: "We've received your warranty request.",
      icon: FileText,
    },
  };

  const config = formConfig[formType as keyof typeof formConfig] || formConfig.contact;
  const Icon = config.icon;

  return (
    <PageContent size="md">
      <AnimatedSection delay={0}>
        <div className="space-y-8">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              <div className="p-4 bg-primary/10 rounded-full">
                <CheckCircle2 className="h-16 w-16 text-primary" />
              </div>
            </motion.div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" suppressHydrationWarning>
            {config.title}
          </h1>
          </motion.div>

          <AnimatedSection delay={0.15}>
            <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle suppressHydrationWarning>
              {config.title}
            </CardTitle>
            <CardDescription className="text-base" suppressHydrationWarning>
              {config.message}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground" suppressHydrationWarning>
                {formType === "warranty" 
                  ? "Our warranty team will review your request and contact you shortly."
                  : "Our team will review your message and get back to you within 24-48 hours."
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="flex-1">
                <Link href="/" suppressHydrationWarning>
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              {formType === "warranty" ? (
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link href="/warranty" suppressHydrationWarning>
                    View Warranty Info
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link href="/contact" suppressHydrationWarning>
                    Contact Us Again
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        </AnimatedSection>
      </div>
      </AnimatedSection>
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

