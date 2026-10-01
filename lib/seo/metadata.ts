import { Metadata } from "next";
import { SEOConfig } from "@/types/seo";
import { SEO_CONFIG, defaultMetadata } from "@/config/seo";

export const generateMetadata = (config: SEOConfig): Metadata => {
  const {
    title,
    description,
    keywords,
    canonical,
    openGraph,
    twitter,
    robots,
    alternates,
    other,
  } = config;

  // Helper para obtener el título por defecto de forma segura
  const getDefaultTitle = (): string => {
    if (defaultMetadata.title && typeof defaultMetadata.title === "object" && "default" in defaultMetadata.title) {
      return defaultMetadata.title.default || SEO_CONFIG.siteName;
    }
    if (typeof defaultMetadata.title === "string") {
      return defaultMetadata.title;
    }
    return SEO_CONFIG.siteName;
  };

  const metadata: Metadata = {
    title: title || getDefaultTitle(),
    description: description || defaultMetadata.description || SEO_CONFIG.siteDescription,
    keywords: keywords || defaultMetadata.keywords,
    authors: defaultMetadata.authors,
    creator: defaultMetadata.creator || SEO_CONFIG.siteName,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: openGraph?.title || title || defaultMetadata.openGraph?.title || SEO_CONFIG.siteName,
      description:
        openGraph?.description ||
        description ||
        defaultMetadata.openGraph?.description ||
        SEO_CONFIG.siteDescription,
      url: openGraph?.url || canonical || SEO_CONFIG.siteUrl,
      siteName: openGraph?.siteName || defaultMetadata.openGraph?.siteName || SEO_CONFIG.siteName,
      images: openGraph?.images || defaultMetadata.openGraph?.images,
      locale: openGraph?.locale || defaultMetadata.openGraph?.locale || SEO_CONFIG.locale,
      ...(openGraph?.type ? { type: openGraph.type } : {}),
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...(twitter?.card ? { card: twitter.card } : (defaultMetadata.twitter && typeof defaultMetadata.twitter === "object" && "card" in defaultMetadata.twitter ? { card: defaultMetadata.twitter.card } : { card: "summary_large_image" as const })),
      title: twitter?.title || title || defaultMetadata.twitter?.title || SEO_CONFIG.siteName,
      description:
        twitter?.description ||
        description ||
        defaultMetadata.twitter?.description ||
        SEO_CONFIG.siteDescription,
      images: twitter?.images || defaultMetadata.twitter?.images,
      creator: twitter?.creator || defaultMetadata.twitter?.creator,
      site: twitter?.site || defaultMetadata.twitter?.creator,
    },
    robots: robots || defaultMetadata.robots,
    alternates: {
      canonical: alternates?.canonical || canonical || SEO_CONFIG.siteUrl,
      languages: alternates?.languages,
    },
    ...other,
  };

  return metadata;
};

export const generatePropertyMetadata = (
  propertyName: string,
  description: string,
  image?: string,
  price?: string,
  location?: string
): Metadata => {
  const title = `${propertyName} Home for Sale | New Construction`;
  const fullDescription = `Buy the ${propertyName} new construction home for sale in Southwest Florida. ${description.slice(0, 120)}${price ? ` Starting from ${price}.` : ""} View floor plan, photos, and standard features. LaBelle & Lehigh Acres.`;

  return generateMetadata({
    title,
    description: fullDescription.slice(0, 160),
    keywords: [
      `${propertyName} home for sale`,
      `${propertyName} new home`,
      `${propertyName} floor plan`,
      "new construction home for sale",
      "homes for sale Florida",
      "buy new home Florida",
      "new home LaBelle",
      "new home Lehigh Acres",
      propertyName,
      "home builder Florida",
      ...(location ? [`${propertyName} ${location}`, `homes for sale ${location}`] : []),
      ...(price ? [`homes from ${price}`, `new home ${price}`] : []),
    ],
    canonical: `${SEO_CONFIG.siteUrl}/models/${propertyName.toLowerCase()}`,
    openGraph: {
      title,
      description: fullDescription,
      type: "website",
      url: `${SEO_CONFIG.siteUrl}/models/${propertyName.toLowerCase()}`,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: `${propertyName} Home Model`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: fullDescription,
      images: image ? [image] : undefined,
    },
  });
};

export const generateCategoryMetadata = (
  category: string,
  description: string
): Metadata => {
  const title = `${category} | ${SEO_CONFIG.siteName}`;

  return generateMetadata({
    title,
    description,
    keywords: [category, "propiedades", "inmuebles", "inmobiliaria"],
  });
};

