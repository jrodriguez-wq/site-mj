/**
 * Contact, social links, and Google Business/reviews. Update GOOGLE_REVIEWS periodically from your profile.
 */
export const CONTACT_INFO = {
  email: "customerservice@mjnewellhomes.com",
  phone: "(239) 323-9797",
  phoneSecondary: "(239) 323-9696",
  phoneFormatted: "+1 (239) 323-9797",
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

export const SOCIAL_LINKS = {
  twitter: "",
  twitterHandle: "",
  facebook: "https://www.facebook.com/MjNewellHomesFL/",
  instagram: "https://www.instagram.com/mjnewellhomes?igsh=emg5bHZpcnJnZnIy",
  linkedin: "https://www.linkedin.com/company/mj-newell-homes-fl/",
  youtube: "",
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
