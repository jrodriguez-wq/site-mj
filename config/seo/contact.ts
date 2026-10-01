/**
 * Contact, social links, and Google Business/reviews. Update GOOGLE_REVIEWS periodically from your profile.
 */
export const CONTACT_INFO = {
  email: "customercare@mjnewellhomes.com",
  /** Use for visible link text — reduces plain-text email harvesting; `mailto:` still works. */
  emailLinkLabel: "Email customer care",
  phone: "(239) 268-6644",
  phoneExtension: "500",
  phoneDisplay: "(239) 268-6644 ext. 500",
  /** `tel:` links use a DTMF pause (,) before the extension so mobile dialers submit it automatically. */
  phoneTelHref: "tel:+12392686644,,500",
  phoneFormatted: "+12392686644",
  /** Secondary / escalation line — kept as the prior main number for warranty escalation. */
  phoneSecondary: "(239) 323-9797",
  phoneSecondaryLabel: "Warranty Escalation Line",
  address: {
    streetAddress: "LaBelle, FL",
    addressLocality: "LaBelle",
    addressRegion: "FL",
    postalCode: "33935",
    addressCountry: "US",
  },
  coordinates: {
    latitude: 26.7615,
    longitude: -81.4381,
  },
  openingHours: {
    weekdays: { opens: "09:00", closes: "18:00" },
    saturday: { opens: "09:00", closes: "18:00" },
    sunday: { opens: "09:00", closes: "18:00" },
  },
  openingHoursDisplay: {
    opens: "9:00am",
    closes: "6:00pm",
  },
} as const;

/** Standard Land Development (parent company) – use for links when we mention SLD. */
export const SLD_WEBSITE_URL = "https://www.standardlanddevelopment.com/" as const;

export const SOCIAL_LINKS = {
  twitter: "",
  twitterHandle: "",
  facebook: "https://www.facebook.com/MjNewellHomesFL/",
  instagram: "https://www.instagram.com/mjnewellhomes?igsh=emg5bHZpcnJnZnIy",
  linkedin: "https://www.linkedin.com/company/mj-newell-homes-fl/",
  youtube: "https://www.youtube.com/@MJNewellHomes",
  tiktok: "https://www.tiktok.com/@mjnhomesofficial?_r=1&_t=ZM-92HUBTS1UFP",
  website: "https://www.mjnewellhomes.com",
  googleBusiness: "https://maps.app.goo.gl/iPK2Xa6eG8RCyT8m8",
} as const;

/** Update reviewCount and ratingValue from Google Business Profile when they change. */
export const GOOGLE_REVIEWS = {
  reviewCount: 96,
  ratingValue: "4.4",
  googleBusinessProfileUrl: "https://maps.app.goo.gl/iPK2Xa6eG8RCyT8m8",
  googleMapsUrl: "https://www.google.com/maps/place/MJ+Newell+Homes/@26.7623241,-81.4373774,17z/data=!3m1!4b1!4m6!3m5!1s0x88db856a8ff9fc6b:0xce6810c83740a1d4!8m2!3d26.7623241!4d-81.4373774!16s%2Fg%2F11fxw3s97f?entry=ttu",
} as const;
