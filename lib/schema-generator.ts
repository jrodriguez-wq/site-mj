// Schema.org JSON-LD generator for SEO/AEO
export interface SchemaOptions {
  type: "Article" | "FAQPage" | "HowTo" | "BreadcrumbList" | "LocalBusiness";
  title: string;
  description: string;
  image?: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
  // Article-specific
  articleBody?: string;
  // FAQPage-specific
  faqs?: Array<{ question: string; answer: string }>;
  // HowTo-specific
  steps?: Array<{ name: string; text: string }>;
  // BreadcrumbList-specific
  breadcrumbs?: Array<{ name: string; url: string }>;
  // LocalBusiness-specific
  address?: string;
  telephone?: string;
  priceRange?: string;
}

export function generateArticleSchema(options: SchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    image: options.image || "https://mjnewellhomes.com/og-image.png",
    datePublished: options.datePublished || new Date().toISOString(),
    dateModified: options.dateModified || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: options.author || "MJ Newell Homes",
      url: "https://mjnewellhomes.com",
      logo: "https://mjnewellhomes.com/logo.png",
    },
    publisher: {
      "@type": "Organization",
      name: "MJ Newell Homes",
      logo: {
        "@type": "ImageObject",
        url: "https://mjnewellhomes.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": options.url,
    },
    keywords: options.keywords?.join(", "),
  };
}

export function generateFAQPageSchema(options: SchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: options.faqs?.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })) || [],
  };
}

export function generateHowToSchema(options: SchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: options.title,
    description: options.description,
    image: options.image,
    step: options.steps?.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })) || [],
  };
}

export function generateBreadcrumbSchema(options: SchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: options.breadcrumbs?.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })) || [],
  };
}

export function generateLocalBusinessSchema(options: SchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MJ Newell Homes",
    image: "https://mjnewellhomes.com/logo.png",
    description: options.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main St",
      addressLocality: "LaBelle",
      addressRegion: "FL",
      postalCode: "33935",
      addressCountry: "US",
    },
    telephone: "(863) 555-0123",
    url: "https://mjnewellhomes.com",
    priceRange: options.priceRange || "$$",
  };
}

export function generateSchema(options: SchemaOptions) {
  switch (options.type) {
    case "Article":
      return generateArticleSchema(options);
    case "FAQPage":
      return generateFAQPageSchema(options);
    case "HowTo":
      return generateHowToSchema(options);
    case "BreadcrumbList":
      return generateBreadcrumbSchema(options);
    case "LocalBusiness":
      return generateLocalBusinessSchema(options);
    default:
      return generateArticleSchema(options);
  }
}
