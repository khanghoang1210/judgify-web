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
            primary: "bg-(--color-primary-container) text-(--color-on-primary-container) hover:bg-(--color-primary) hover:text-(--color-on-primary)",
            secondary: "bg-(--color-secondary-container) text-(--color-on-secondary-container) hover:bg-(--color-secondary) hover:text-(--color-on-secondary)",
            tertiary: "bg-(--color-tertiary-container) text-(--color-on-tertiary-container) hover:bg-(--color-tertiary) hover:text-(--color-on-tertiary)",
            outline: "border border-(--color-outline) text-(--color-on-surface) hover:bg-(--color-surface-container-high)",
            ghost: "text-(--color-on-surface-variant) hover:bg-(--color-surface-container)",
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
