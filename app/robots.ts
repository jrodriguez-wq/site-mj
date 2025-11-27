import { MetadataRoute } from "next";
import { SEO_CONFIG, ROBOTS_CONFIG } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  const disallowPaths = [...ROBOTS_CONFIG.disallowPaths];
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowPaths,
      },
    ],
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
  };
}

