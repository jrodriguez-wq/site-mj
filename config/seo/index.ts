/**
 * SEO config – single entry point. Re-exports from config/, contact/, metadata, etc.
 */
export { SEO_CONFIG, ROBOTS_CONFIG } from "./config";
export { CONTACT_INFO, SOCIAL_LINKS, GOOGLE_REVIEWS } from "./contact";
export { SITEMAP_CONFIG } from "./sitemap-config";
export { LOCATION_KEYWORDS, SERVICE_AREAS } from "./keywords-export";
export { defaultMetadata } from "./metadata";

import { getAllKeywords } from "../keywords";
import { SEO_CONFIG, ROBOTS_CONFIG } from "./config";
import { CONTACT_INFO, SOCIAL_LINKS, GOOGLE_REVIEWS } from "./contact";
import { SITEMAP_CONFIG } from "./sitemap-config";
import { LOCATION_KEYWORDS, SERVICE_AREAS } from "./keywords-export";
import { defaultMetadata } from "./metadata";

export const KEYWORDS = getAllKeywords();

export const SEO = {
  config: SEO_CONFIG,
  contact: CONTACT_INFO,
  social: SOCIAL_LINKS,
  keywords: KEYWORDS as unknown as string[],
  locationKeywords: LOCATION_KEYWORDS as unknown as string[],
  serviceAreas: SERVICE_AREAS,
  robots: ROBOTS_CONFIG,
  sitemap: SITEMAP_CONFIG,
  metadata: defaultMetadata,
} as const;
