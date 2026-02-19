/**
 * Sitemap routes and priorities for app/sitemap.ts
 * Todas las páginas indexables deben estar aquí para buen SEO.
 */
export const SITEMAP_CONFIG = {
  mainRoutes: [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/rent-to-own", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/schedule-appointment", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/models", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/communities/labelle", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/communities/lehigh-acres", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/about-us", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/home-buying-guide", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/section8", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/rental-application", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/warranty", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/terms-conditions", priority: 0.7, changeFrequency: "yearly" as const },
  ],
} as const;
