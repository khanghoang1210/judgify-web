import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "primary" | "secondary" | "tertiary" | "error" | "outline";
}

export function Badge({ variant = "primary", className, children, ...props }: BadgeProps) {
    const baseStyles = "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-[var(--radius-sm)] font-[family-name:var(--font-jetbrains-mono)]";

    const variants = {
        primary: "bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]",
        secondary: "bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]",
        tertiary: "bg-[var(--color-tertiary-container)] text-[var(--color-on-tertiary-container)]",
        error: "bg-[var(--color-error-container)] text-[var(--color-on-error-container)]",
        outline: "border border-[var(--color-outline)] text-[var(--color-on-surface-variant)]",
    };

    return (
        <span className={cn(baseStyles, variants[variant], className)} {...props}>
            {children}
        </span>
    );
}
