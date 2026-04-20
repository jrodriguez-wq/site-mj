// Internal linking strategy for AEO
export const blogRelations: Record<string, string[]> = {
  "how-to-buy-home-without-down-payment": [
    "how-does-rent-to-own-work-complete-guide",
    "rent-to-own-vs-traditional-mortgage-comparison",
    "first-time-home-buyer-guide-complete-checklist",
    "how-to-apply-mj-rent-to-own",
  ],
  "bad-credit-home-buying-guide": [
    "how-does-rent-to-own-work-complete-guide",
    "rent-to-own-flexible-terms",
    "rent-to-own-timeline-qualification",
    "customer-stories-rent-to-own-success",
  ],
  "rent-to-own-companies-comparison": [
    "how-does-rent-to-own-work-complete-guide",
    "rent-to-own-vs-traditional-mortgage-comparison",
    "rent-to-own-flexible-terms",
  ],
  "rent-to-own-flexible-terms": [
    "how-does-rent-to-own-work-complete-guide",
    "rent-to-own-timeline-qualification",
    "how-to-apply-mj-rent-to-own",
    "flexibility-in-rent-to-own",
  ],
  "rent-to-own-timeline-qualification": [
    "how-to-apply-mj-rent-to-own",
    "rent-to-own-flexible-terms",
    "how-does-rent-to-own-work-complete-guide",
  ],
  "how-to-apply-mj-rent-to-own": [
    "rent-to-own-timeline-qualification",
    "rent-to-own-flexible-terms",
    "how-does-rent-to-own-work-complete-guide",
  ],
  "rent-to-own-for-first-time-buyers": [
    "how-does-rent-to-own-work-complete-guide",
    "first-time-home-buyer-guide-complete-checklist",
    "how-to-apply-mj-rent-to-own",
    "rent-to-own-flexible-terms",
  ],
  "flexibility-in-rent-to-own": [
    "rent-to-own-flexible-terms",
    "rent-to-own-timeline-qualification",
    "how-does-rent-to-own-work-complete-guide",
  ],
  "customer-stories-rent-to-own-success": [
    "how-does-rent-to-own-work-complete-guide",
    "bad-credit-home-buying-guide",
    "rent-to-own-for-first-time-buyers",
  ],
};

export function getRelatedPosts(slug: string, limit = 3): string[] {
  const related = blogRelations[slug] || [];
  return related.slice(0, limit);
}
