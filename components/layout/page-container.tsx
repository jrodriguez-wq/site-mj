import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-8xl",
  full: "max-w-full",
};

export const PageContainer = ({
  children,
  className,
  size = "lg",
}: PageContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4 md:px-6", className)}>
      <div className={cn("mx-auto", sizeClasses[size])}>{children}</div>
    </div>
  );
};

export const PageSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn("w-full pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-24", className)}>
      {children}
    </section>
  );
};

export const PageContent = ({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  return (
    <PageSection>
      <PageContainer size={size} className={className}>
        {children}
      </PageContainer>
    </PageSection>
  );
};

