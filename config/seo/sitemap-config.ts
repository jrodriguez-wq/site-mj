/**
 * Sitemap routes and priorities for app/sitemap.ts
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
    { path: "/warranty", priority: 0.7, changeFrequency: "monthly" as const },
  ],
} as const;
