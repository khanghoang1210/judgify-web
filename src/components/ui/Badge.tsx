import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "primary" | "secondary" | "tertiary" | "error" | "outline";
}

export function Badge({ variant = "primary", className, children, ...props }: BadgeProps) {
    const baseStyles = "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-[var(--radius-sm)] font-(family-name:--font-jetbrains-mono)";

    const variants = {
        primary: "bg-(--color-primary-container) text-(--color-on-primary-container)",
        secondary: "bg-(--color-secondary-container) text-(--color-on-secondary-container)",
        tertiary: "bg-(--color-tertiary-container) text-(--color-on-tertiary-container)",
        error: "bg-(--color-error-container) text-(--color-on-error-container)",
        outline: "border border-(--color-outline) text-(--color-on-surface-variant)",
    };

    return (
        <span className={cn(baseStyles, variants[variant], className)} {...props}>
            {children}
        </span>
    );
}
