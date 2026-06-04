"use client";

import { PageContent } from "@/components/layout/page-container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { HelpCircle } from "lucide-react";
import { SITE_FAQ_CATEGORIES } from "@/lib/faq/site-faq-categories";

export const FAQContent = () => {
  const faqCategories = SITE_FAQ_CATEGORIES;

  return (
    <PageContent size="lg">
      <div className="space-y-12 py-8 md:py-12">
        {/* Header */}
        <AnimatedSection delay={0}>
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-4">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary/10 mb-3 sm:mb-4">
              <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight" suppressHydrationWarning>
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed" suppressHydrationWarning>
              Answers about buying new homes for sale, our Rent to Own program, and communities in Southwest Florida.
            </p>
          </div>
        </AnimatedSection>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <AnimatedSection key={category.title} delay={categoryIndex * 50}>
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground border-b border-border pb-2 leading-tight">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem
                      key={`${category.title}-${itemIndex}`}
                      value={`${category.title}-${itemIndex}`}
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA Section */}
        <AnimatedSection delay={300}>
          <div className="bg-primary/5 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 text-center space-y-3 sm:space-y-4 border border-primary/10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight px-4" suppressHydrationWarning>
              Still have questions?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4" suppressHydrationWarning>
              We&apos;re here to help. Reach out or schedule a visit and we&apos;ll get you the answers you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 flex-wrap">
              <a
                href="/new-homes-for-sale"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View homes for sale
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                suppressHydrationWarning
              >
                Contact us
              </a>
              <a
                href="/schedule-appointment"
                className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border-2 border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                suppressHydrationWarning
              >
                Schedule a visit
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </PageContent>
  );
};

