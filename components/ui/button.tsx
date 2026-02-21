import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer active:scale-[0.98] min-h-[44px] min-w-[44px] touch-manipulation",
  {
    variants: {
      variant: {
        /* Fallbacks evitan bug de botón blanco sobre blanco en ciertos viewports/navegadores */
        default:
          "bg-[var(--primary,oklch(0.45_0.22_255))] text-[var(--primary-foreground,oklch(0.99_0_0))] border border-[var(--primary,oklch(0.45_0.22_255))] shadow-md hover:opacity-95 hover:shadow-lg hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-white border border-destructive/90 hover:bg-destructive/90 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2 border-[var(--border,oklch(0.75_0.02_250))] bg-[var(--background)] text-[var(--foreground,oklch(0.2_0.05_250))] shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/80 hover:bg-secondary/80 hover:shadow-md hover:-translate-y-0.5",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline min-h-0 min-w-0",
      },
      size: {
        default: "h-11 min-h-[44px] px-5 py-2.5 sm:h-10 sm:min-h-[40px] sm:px-4 has-[>svg]:px-3",
        sm: "h-10 min-h-[40px] rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 min-h-[48px] rounded-md px-6 has-[>svg]:px-4",
        icon: "size-11 min-w-[44px] min-h-[44px] sm:size-10",
        "icon-sm": "size-10 min-w-[40px] min-h-[40px]",
        "icon-lg": "size-12 min-w-[48px] min-h-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
