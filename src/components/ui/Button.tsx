import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)]",
            secondary: "bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-on-secondary)]",
            tertiary: "bg-[var(--color-tertiary-container)] text-[var(--color-on-tertiary-container)] hover:bg-[var(--color-tertiary)] hover:text-[var(--color-on-tertiary)]",
            outline: "border border-[var(--color-outline)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-high)]",
            ghost: "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)]",
        };

        const sizes = {
            sm: "text-sm px-3 py-1.5 rounded-[var(--radius-sm)]",
            md: "text-base px-4 py-2 rounded-[var(--radius-md)]",
            lg: "text-lg px-6 py-3 rounded-[var(--radius-md)]",
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
    }
);

Button.displayName = "Button";
