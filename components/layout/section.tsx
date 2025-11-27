import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted" | "accent";
  spacing?: "sm" | "md" | "lg" | "xl";
  container?: boolean;
}

const variantClasses = {
  default: "bg-background",
  muted: "bg-muted",
  accent: "bg-primary/5",
};

const spacingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
};

export const Section = ({
  children,
  className,
  variant = "default",
  spacing = "md",
  container = true,
}: SectionProps) => {
  return (
    <section
      className={cn(
        "w-full",
        variantClasses[variant],
        spacingClasses[spacing],
        className
      )}
    >
      {container ? (
        <div className="container mx-auto px-4 md:px-6">{children}</div>
      ) : (
        children
      )}
    </section>
  );
};

