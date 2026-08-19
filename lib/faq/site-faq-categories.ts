/**
 * Single source for /faq content and FAQPage JSON-LD (must stay in sync).
 */
export type FAQCategory = {
  title: string;
  items: Array<{ question: string; answer: string }>;
};

export const SITE_FAQ_CATEGORIES: FAQCategory[] = [
  {
    title: "General",
    items: [
      {
        question: "Where do you build?",
        answer:
          "We build new construction homes in LaBelle and Lehigh Acres, Florida. Both communities are in Southwest Florida with easy access to Fort Myers and the Gulf Coast.",
      },
      {
        question: "How many homes have you built?",
        answer:
          "We have built 1,500+ homes and helped hundreds of families into homeownership through both traditional purchase and our Rent to Own program.",
      },
      {
        question: "What makes M.J. Newell different?",
        answer:
          "We build and sell new construction homes in Southwest Florida with transparent pricing, quality craftsmanship, and flexible paths to ownership — including traditional purchase and our Rent to Own program.",
      },
      {
        question: "Can I buy a home instead of Rent to Own?",
        answer:
          "Yes. Most buyers purchase with cash or a traditional mortgage. Browse our New Homes for Sale page or schedule a visit to see models and pricing in LaBelle and Lehigh Acres.",
      },
    ],
  },
  {
    title: "Buying a new home",
    items: [
      {
        question: "How do I buy a new construction home from M.J. Newell?",
        answer:
          "Browse models online, visit our New Homes for Sale hub, or schedule an appointment. Choose your floor plan and community, secure financing, and we guide you through contract and construction to closing.",
      },
      {
        question: "What do new homes for sale start at?",
        answer:
          "Single-family models start from approximately $316,900 in LaBelle, depending on model and community. Each model page lists current purchase price and square footage.",
      },
      {
        question: "Where are homes for sale located?",
        answer:
          "We sell new homes in LaBelle (Hendry County) and Lehigh Acres (Lee County), Southwest Florida — both near Fort Myers and the Gulf Coast.",
      },
      {
        question: "What financing options are available for buyers?",
        answer:
          "Buyers may use conventional mortgages, FHA, VA, cash, or our Rent to Own program where available. We help you choose the path that fits your timeline and budget.",
      },
      {
        question: "How is buying different from Rent to Own?",
        answer:
          "Buying means you purchase the home upfront or with a mortgage at closing. Rent to Own lets you move in first and build toward ownership with monthly payments — ideal if you need flexibility. Both options are available on qualifying models.",
      },
    ],
  },
  {
    title: "Rent to Own",
    items: [
      {
        question: "What is Rent to Own?",
        answer:
          "Rent to Own lets you move into a new M.J. Newell home, pay monthly rent that includes a savings portion, and work toward buying the home at a locked-in price. No bank loan required to get started.",
      },
      {
        question: "Do I need a down payment?",
        answer:
          "With Rent to Own you can get started without a large down payment. Part of your monthly payment builds your future down payment.",
      },
      {
        question: "Can I purchase the home anytime?",
        answer:
          "Yes. Your purchase price is set from day one. When you're ready, you can buy the home using our in-house financing or a traditional mortgage.",
      },
      {
        question: "What if I don't end up purchasing?",
        answer:
          "You're not locked into buying. If your situation changes, you can leave at the end of your agreement. The savings you built may be applied per your contract terms.",
      },
    ],
  },
  {
    title: "Models & floor plans",
    items: [
      {
        question: "What floor plans do you offer?",
        answer:
          "We offer Louisiana, Viana, Delanie, Aurora, Langdon, Emelia, and a Duplex model. Each is available in LaBelle and/or Lehigh Acres; purchase and Rent to Own depend on the model and community.",
      },
      {
        question: "What's included as standard?",
        answer:
          "Our homes include quality finishes, standard features, and structural and mechanical warranties. Ask us for the full list of standard features for the model you like.",
      },
      {
        question: "Can I customize my home?",
        answer:
          "Options and customization depend on the stage of construction. We'll walk you through what's possible for your home and timeline.",
      },
    ],
  },
  {
    title: "Communities",
    items: [
      {
        question: "Where are LaBelle and Lehigh Acres?",
        answer:
          "LaBelle is in Hendry County; Lehigh Acres is in Lee County near Fort Myers. Both are in Southwest Florida with good access to schools, shopping, and the coast.",
      },
      {
        question: "What are the amenities?",
        answer:
          "Our communities offer a quiet, family-friendly setting. LaBelle has a rural feel with acre+ lots and no HOA; Lehigh Acres has spacious lots and is close to Fort Myers amenities.",
      },
      {
        question: "Are there HOA fees?",
        answer:
          "Our LaBelle homes do not have HOA fees. For Lehigh Acres, HOA details depend on the specific neighborhood; we can provide that when you choose a lot.",
      },
    ],
  },
  {
    title: "Application & process",
    items: [
      {
        question: "How do I apply?",
        answer:
          "For purchase, schedule a visit or contact us. For Rent to Own, apply online via our Rent to Own application. We'll review your information and guide next steps.",
      },
      {
        question: "What do I need to apply?",
        answer:
          "We typically need proof of income (pay stubs, tax returns), bank statements, and ID. Our team will tell you exactly what's needed for your situation.",
      },
      {
        question: "How long does approval take?",
        answer:
          "We aim to review applications quickly. You'll hear from our team within a few business days to discuss next steps.",
      },
      {
        question: "How do I schedule a tour?",
        answer:
          "Use our contact form, call us, or request a meeting. We'll set up a time for you to see our models and available homes for sale.",
      },
    ],
  },
  {
    title: "Warranty",
    items: [
      {
        question: "What warranty do you offer?",
        answer:
          "Our new construction homes come with a structural warranty (10 years) and mechanical systems warranties for plumbing, electrical, septic, and general finishes (1 year each). Exact terms will be in your warranty documents.",
      },
      {
        question: "What if I have an issue after move-in?",
        answer:
          "Submit a warranty request through our warranty page or contact us. We respond to phone calls within 24 hours and emails within 48 hours, and coordinate repairs so issues are handled in a timely way.",
      },
      {
        question: "Am I entitled to a warranty even if it isn't in my contract?",
        answer:
          "Yes. Under Florida Statute §553.837, all newly constructed homes in Florida carry a mandatory 1-year builder warranty covering construction defects that violate the Florida Building Code, regardless of what's written in your contract. This is in addition to our structural and mechanical warranty.",
      },
      {
        question: "What if my warranty request isn't resolved in a reasonable time?",
        answer:
          "If your original point of contact hasn't scheduled or resolved your request, call our Warranty Escalation Line directly — see the step-by-step process on our Warranty page. This line is reviewed by warranty management, separate from the general customer care line.",
      },
      {
        question: "How do I file a formal Notice of Claim for a construction defect?",
        answer:
          "Florida Statute Chapter 558 lets homeowners submit a written Notice of Claim describing a construction defect in reasonable detail. Once we receive it, we have 45 days to respond in writing — either resolving the issue or offering a repair plan. Send your Notice of Claim by email or mail using the contact details on our Warranty page.",
      },
      {
        question: "Do I have to go through Chapter 558 before I can take legal action?",
        answer:
          "Yes, under Florida law a written Notice of Claim must generally be served at least 60 days before filing a construction defect lawsuit, giving the builder a chance to respond and offer repairs first. We follow this process in good faith and encourage every homeowner to use it — it's usually faster than litigation.",
      },
      {
        question: "Is my contractor's license verifiable?",
        answer:
          "Yes. All Florida contractor licenses, including ours, can be verified for free at MyFloridaLicense.com, the official portal of the Florida Department of Business and Professional Regulation (DBPR). You can also file a complaint there if you believe a licensing issue hasn't been addressed.",
      },
    ],
  },
];

export function getAllFAQItems(): Array<{ question: string; answer: string }> {
  return SITE_FAQ_CATEGORIES.flatMap((c) => c.items);
}
