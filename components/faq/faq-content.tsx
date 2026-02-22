"use client";

import { PageContent } from "@/components/layout/page-container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { HelpCircle } from "lucide-react";

const FAQ_CATEGORIES = [
  {
    title: "General",
    items: [
      { question: "Where do you build?", answer: "We build new construction homes in LaBelle and Lehigh Acres, Florida. Both communities are in Southwest Florida with easy access to Fort Myers and the Gulf Coast." },
      { question: "How many homes have you built?", answer: "We have built 500+ homes and helped hundreds of families into homeownership through both traditional purchase and our Rent to Own program." },
      { question: "What makes M.J. Newell different?", answer: "We offer Rent to Own so you can move in without a large down payment or bank loan, quality new construction, and a team that guides you from first contact to keys." },
    ],
  },
  {
    title: "Rent to Own",
    items: [
      { question: "What is Rent to Own?", answer: "Rent to Own lets you move into a new M.J. Newell home, pay monthly rent that includes a savings portion, and work toward buying the home at a locked-in price. No bank loan required to get started." },
      { question: "Do I need a down payment?", answer: "With Rent to Own you can get started without a large down payment. Part of your monthly payment builds your future down payment." },
      { question: "Can I purchase the home anytime?", answer: "Yes. Your purchase price is set from day one. When you're ready, you can buy the home using our in-house financing or a traditional mortgage." },
      { question: "What if I don't end up purchasing?", answer: "You're not locked into buying. If your situation changes, you can leave at the end of your agreement. The savings you built may be applied per your contract terms." },
    ],
  },
  {
    title: "Models & floor plans",
    items: [
      { question: "What floor plans do you offer?", answer: "We offer several single-family floor plans (e.g. Louisiana, Viana, Delanie, Aurora, Langdon, Emelia) and a duplex option. Each is available in LaBelle and/or Lehigh Acres with Rent to Own where applicable." },
      { question: "What's included as standard?", answer: "Our homes include quality finishes, standard features, and structural and mechanical warranties. Ask us for the full list of standard features for the model you like." },
      { question: "Can I customize my home?", answer: "Options and customization depend on the stage of construction. We'll walk you through what's possible for your home and timeline." },
    ],
  },
  {
    title: "Communities",
    items: [
      { question: "Where are LaBelle and Lehigh Acres?", answer: "LaBelle is in Hendry County; Lehigh Acres is in Lee County near Fort Myers. Both are in Southwest Florida with good access to schools, shopping, and the coast." },
      { question: "What are the amenities?", answer: "Our communities offer a quiet, family-friendly setting. LaBelle has a rural feel with acre+ lots and no HOA; Lehigh Acres has spacious lots and is close to Fort Myers amenities." },
      { question: "Are there HOA fees?", answer: "Our LaBelle homes do not have HOA fees. For Lehigh Acres, HOA details depend on the specific neighborhood; we can provide that when you choose a lot." },
    ],
  },
  {
    title: "Application & process",
    items: [
      { question: "How do I apply?", answer: "You can apply online via our Rent to Own application or contact form. For Rent to Own we'll review your income and documents; no bank loan is required to apply." },
      { question: "What do I need to apply?", answer: "We typically need proof of income (pay stubs, tax returns), bank statements, and ID. Our team will tell you exactly what's needed for your situation." },
      { question: "How long does approval take?", answer: "We aim to review applications quickly. You'll hear from our team within a few business days to discuss next steps." },
      { question: "How do I schedule a tour?", answer: "Use our contact form, call us, or request a meeting. We'll set up a time for you to see our models and available homes." },
    ],
  },
  {
    title: "Warranty",
    items: [
      { question: "What warranty do you offer?", answer: "Our new construction homes come with a structural warranty (e.g. 10 years) and a mechanical systems warranty (e.g. 1 year). Exact terms will be in your warranty documents." },
      { question: "What if I have an issue after move-in?", answer: "Submit a warranty request through our warranty page or contact us. Our warranty team will review and coordinate service so repairs are handled in a timely way." },
    ],
  },
];

export const FAQContent = () => {
  const faqCategories = FAQ_CATEGORIES;

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
              Answers to common questions about our homes, Rent to Own program, and communities.
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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

