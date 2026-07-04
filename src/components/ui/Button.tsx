import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary",
      secondary:
        "bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary",
      tertiary:
        "bg-tertiary-container text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary",
      outline:
        "border border-outline text-on-surface hover:bg-surface-container-high",
      ghost: "text-on-surface-variant hover:bg-surface-container",
    };

    const sizes = {
      sm: "text-body-sm px-3 py-1.5 rounded-sm",
      md: "text-body-md px-4 py-2 rounded-md",
      lg: "text-headline-sm px-6 py-3 rounded-md",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
