/**
 * Promotion modal config – single source for all home-page promos.
 * Edit this file to add/change promotions. Only these variants are shown.
 */

import { getCloudinaryImageUrl } from "@/lib/cloudinary";

export interface PromotionItem {
  id: string;
  title: string;
  tagline: string;
  image?: string;
  imageAlt?: string;
}

export interface PromotionConfig {
  enabled: boolean;
  /** List of promotions; one is chosen at random when the modal opens */
  promotions: PromotionItem[];
  delaySeconds?: number;
  buttons: {
    primary: { text: string; href: string; variant?: "default" | "outline" | "secondary" };
    secondary?: { text: string; href: string; variant?: "default" | "outline" | "secondary" };
  };
}

export const PROMOTION_CONFIG: PromotionConfig = {
  enabled: true,
  delaySeconds: 3,

  promotions: [
    {
      id: "50-moving",
      title: "50% Off Your Moving Cost",
      tagline: "Limited time. Exclusive savings when you choose us.",
      image: getCloudinaryImageUrl("/img/hero/1w5a0754-e4.webp"),
      imageAlt: "New construction home - M.J. Newell Homes",
    },
    {
      id: "2-months-free",
      title: "2 Months Free",
      tagline: "Move in with confidence. Two months free on select homes.",
      image: getCloudinaryImageUrl("/img/hero/1w5a0754-e4.webp"),
      imageAlt: "Special offer - M.J. Newell Homes",
    },
  ],

  buttons: {
    primary: {
      text: "Schedule Appointment",
      href: "https://meetings.hubspot.com/jrodriguez134/meeting-web",
      variant: "default",
    },
    secondary: {
      text: "Call Now",
      href: "tel:+12393239797",
      variant: "outline",
    },
  },
};
