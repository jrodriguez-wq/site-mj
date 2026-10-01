import { SEO_CONFIG } from "@/config/seo";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";
import { MODEL_PRICING } from "@/lib/models/model-pricing";
import type { StructuredData } from "@/types/seo";

const MODEL_KEYS = [
  "louisiana",
  "viana",
  "delanie",
  "aurora",
  "langdon",
  "emelia",
  "duplex",
] as const;

function getLowestPriceForModel(modelKey: string): string | undefined {
  const labelle = MODEL_PRICING.labelle[modelKey]?.price;
  const lehigh = MODEL_PRICING["lehigh-acres"][modelKey]?.price;
  return labelle || lehigh;
}

export function generateModelsItemListSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "New Construction Homes for Sale",
    description: "Floor plans and new homes for sale by M.J. Newell Homes in LaBelle and Lehigh Acres, Florida",
    url: `${SEO_CONFIG.siteUrl}/models`,
    numberOfItems: MODEL_KEYS.length,
    itemListElement: MODEL_KEYS.map((key, index) => {
      const price = getLowestPriceForModel(key);
      const name = key.charAt(0).toUpperCase() + key.slice(1);
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: `${name} Home for Sale`,
          url: `${SEO_CONFIG.siteUrl}/models/${key}`,
          ...(price
            ? {
                offers: {
                  "@type": "Offer",
                  price: price.replace(/[^0-9.]/g, ""),
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: `${SEO_CONFIG.siteUrl}/models/${key}`,
                },
              }
            : {}),
        },
      };
    }),
  };
}

export function generateModelProductSchema(
  modelKey: string,
  modelName: string,
  description: string,
  price?: string,
  imageUrl?: string
): StructuredData {
  const image =
    imageUrl && (imageUrl.startsWith("http") ? imageUrl : getCloudinaryImageUrl(imageUrl));
  const numericPrice = price?.replace(/[^0-9.]/g, "");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${modelName} New Home for Sale`,
    description: description.slice(0, 500),
    category: "New Construction Home",
    brand: {
      "@type": "Brand",
      name: SEO_CONFIG.siteName,
    },
    image: image ? [image] : undefined,
    url: `${SEO_CONFIG.siteUrl}/models/${modelKey}`,
    ...(numericPrice
      ? {
          offers: {
            "@type": "Offer",
            price: numericPrice,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${SEO_CONFIG.siteUrl}/models/${modelKey}`,
            seller: {
              "@type": "RealEstateAgent",
              name: SEO_CONFIG.siteName,
              url: SEO_CONFIG.siteUrl,
            },
          },
        }
      : {}),
  };
}
