import { ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
  spacing?: "sm" | "md" | "lg" | "xl";
};

export default function Section({
  title,
  description,
  children,
  className,
  centered = false,
  spacing = "lg",
}: SectionProps) {
  const spacingClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-24",
  }[spacing];

  const textAlign = centered ? "text-center" : "";

  return (
    <section className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", spacingClasses, className)}>
      {(title || description) && (
        <div className={clsx("mb-12", textAlign)}>
          {title && (
            <h2 className="heading-font text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {title}
            </h2>
          )}
          {description && (
            <p className="body-font text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="relative">
        {children}
      </div>
    </section>
  );
}