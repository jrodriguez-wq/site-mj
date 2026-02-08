/**
 * Structured data policy for Google Search (rich results).
 * Reference: https://developers.google.com/search/docs/appearance/structured-data
 *
 * Review / AggregateRating
 * - Only valid when the parent (or itemReviewed) is one of the types below.
 * - Service is NOT in the list; do not add aggregateRating or review to Service.
 * - Do not add aggregateRating/review to LocalBusiness or Organization when the
 *   entity controls the reviews about itself (e.g. reviews on own site).
 */

/** Types valid for Review.itemReviewed and AggregateRating (Google). */
export const VALID_ITEM_REVIEWED_TYPES = [
  "Book",
  "Course",
  "CreativeWorkSeason",
  "CreativeWorkSeries",
  "Episode",
  "Event",
  "Game",
  "HowTo",
  "LocalBusiness",
  "MediaObject",
  "Movie",
  "MusicPlaylist",
  "MusicRecording",
  "Organization",
  "Product",
  "Recipe",
  "SoftwareApplication",
] as const;

export type ValidItemReviewedType = (typeof VALID_ITEM_REVIEWED_TYPES)[number];

/** Check if a schema type can legally have review/aggregateRating per Google. */
export const canHaveReviewAggregateRating = (
  type: string
): type is ValidItemReviewedType =>
  (VALID_ITEM_REVIEWED_TYPES as readonly string[]).includes(type);
