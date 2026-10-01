import { BlogPostMetadata } from "@/types/blog";
import { getAllPosts } from "./blog-utils";

/**
 * Internal linking strategy for blog articles
 * Provides related articles and internal links based on content
 */

export interface InternalLink {
  href: string;
  text: string;
  description?: string;
}

/**
 * Get related articles based on category or keywords
 */
export const getRelatedArticles = (
  currentSlug: string,
  category?: string,
  limit: number = 3
): BlogPostMetadata[] => {
  const allPosts = getAllPosts();
  
  // Filter out current article
  const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);
  
  // If category provided, prioritize same category
  if (category) {
    const sameCategory = otherPosts.filter((post) => post.category === category);
    const differentCategory = otherPosts.filter((post) => post.category !== category);
    
    // Return mix: 2 from same category, 1 from different category
    return [...sameCategory.slice(0, 2), ...differentCategory.slice(0, 1)].slice(0, limit);
  }
  
  // Return most recent posts
  return otherPosts.slice(0, limit);
};

/**
 * Get contextual internal links for specific topics
 */
export const getContextualLinks = (keywords: string[]): InternalLink[] => {
  const links: InternalLink[] = [];
  
  // Rent to Own related
  if (keywords.some((k) => /rent.?to.?own|lease.?option|rent.?to.?buy/i.test(k))) {
    links.push({
      href: "/rent-to-own",
      text: "Rent to Own Program",
      description: "Learn about our $0 down payment Rent to Own program",
    });
    links.push({
      href: "/blog/ultimate-guide-rent-to-own-florida",
      text: "Complete Rent to Own Guide",
      description: "Everything you need to know about Rent to Own in Florida",
    });
  }
  
  // Home buying / sales related
  if (keywords.some((k) => /home.?buy|first.?time|buying.?home|homeowner|for.?sale|purchase|new.?home/i.test(k))) {
    links.push({
      href: "/new-homes-for-sale",
      text: "New Homes for Sale",
      description: "Browse new construction homes for sale in LaBelle and Lehigh Acres",
    });
    links.push({
      href: "/blog/first-time-home-buyer-guide-complete-checklist",
      text: "First-Time Home Buyer Guide",
      description: "Complete checklist for first-time home buyers",
    });
    links.push({
      href: "/models",
      text: "View Floor Plans",
      description: "Explore models and purchase pricing",
    });
  }
  
  // Tax related
  if (keywords.some((k) => /tax|refund|homestead|exemption/i.test(k))) {
    links.push({
      href: "/blog/homestead-exemption-florida-complete-guide",
      text: "Homestead Exemption Guide",
      description: "Learn how to save on property taxes",
    });
    links.push({
      href: "/blog/home-buying-taxes-florida-complete-guide",
      text: "Home Buying Taxes Guide",
      description: "Complete guide to taxes when buying a home",
    });
  }
  
  // Finance/Mortgage related
  if (keywords.some((k) => /mortgage|finance|loan|financing/i.test(k))) {
    links.push({
      href: "/blog/rent-to-own-vs-traditional-mortgage-comparison",
      text: "Rent to Own vs Mortgage",
      description: "Compare Rent to Own with traditional mortgages",
    });
  }
  
  // Investment related
  if (keywords.some((k) => /invest|wealth|equity|appreciation/i.test(k))) {
    links.push({
      href: "/blog/why-buy-home-2026-investment-florida",
      text: "Why Buy a Home in 2026",
      description: "Learn why buying a home is your best investment",
    });
  }
  
  // Always include these key links
  links.push({
    href: "/schedule-appointment",
    text: "Schedule Appointment",
    description: "Schedule a visit to see our homes",
  });
  
  return links;
};

/**
 * Get service page links based on content
 */
export const getServiceLinks = (): InternalLink[] => {
  return [
    {
      href: "/new-homes-for-sale",
      text: "Homes for Sale",
      description: "New construction homes for sale in Southwest Florida",
    },
    {
      href: "/models",
      text: "Floor Plans & Models",
      description: "Browse models, photos, and pricing",
    },
    {
      href: "/rent-to-own",
      text: "Rent to Own Program",
      description: "$0 down payment program",
    },
    {
      href: "/communities/labelle",
      text: "LaBelle Community",
      description: "Explore our LaBelle community",
    },
    {
      href: "/communities/lehigh-acres",
      text: "Lehigh Acres Community",
      description: "Explore our Lehigh Acres community",
    },
  ];
};

/**
 * Get community links
 */
export const getCommunityLinks = (): InternalLink[] => {
  return [
    {
      href: "/communities/labelle",
      text: "LaBelle, FL",
      description: "New homes in LaBelle",
    },
    {
      href: "/communities/lehigh-acres",
      text: "Lehigh Acres, FL",
      description: "New homes in Lehigh Acres",
    },
  ];
};

