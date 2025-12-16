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
    <div className={cn("container mx-auto px-4 sm:px-5 md:px-6", className)}>
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
    <section className={cn("w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-12 sm:pb-16 md:pb-20 lg:pb-24", className)}>
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

