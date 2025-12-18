/**
 * Utility functions for model data manipulation
 */

/**
 * Extract numeric price from string like "$469,900"
 */
export const extractPrice = (priceString: string): number => {
  const cleaned = priceString.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
};

/**
 * Sort models by price (cheapest first)
 */
export const sortModelsByPrice = <T extends { price: string }>(models: T[]): T[] => {
  return [...models].sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
};

