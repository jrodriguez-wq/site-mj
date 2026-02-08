# Promotion Modal

## Overview

Single promotion modal on the home page. One of the configured **promotions** is chosen at random when the modal opens. Content is 100% driven by `config/promotion.ts`; there are no legacy or alternate modal components.

## Files

```
├── promotion-modal.tsx         # Picks a random promo, shows dialog on home after delay
├── professional-promo-modal.tsx # Renders one promotion (title, tagline, image, CTAs, close)
├── global-stars.tsx            # Decorative stars (layout)
└── README.md
```

## Configuration (`config/promotion.ts`)

- **enabled** – Turn the modal on/off.
- **promotions** – Array of `{ id, title, tagline, image?, imageAlt? }`. One is shown at random.
- **delaySeconds** – Seconds before the modal appears (e.g. `3`).
- **buttons.primary** – Main CTA (e.g. "Schedule Appointment", HubSpot link).
- **buttons.secondary** – Optional (e.g. "Call Now", tel:).

Add or edit items in `promotions` to change what users see. Only these variants exist.

## Usage

Rendered in `components/home/home-page-content.tsx`:

```tsx
<PromotionModal />
```

Opens only when `pathname === "/"` and after the configured delay.

## Preview

Visit **/promotion-preview** to open each promotion variant.

## Deploy / cache

To avoid serving an old cached modal after changes:

1. **Local:** `npm run clean:cache` then `npm run dev` (or `npm run build`).
2. **Deploy:** Use a clean build so the new bundle is deployed, e.g. `npm run build:clean` (runs `clean:cache` then `next build`). In CI, run `clean:cache` before `build` if you don’t use `build:clean`.

## Dependencies

- Next.js (Link, Image)
- Radix UI Dialog
- Tailwind CSS
- shadcn/ui Button
