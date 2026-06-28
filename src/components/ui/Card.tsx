import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "elevated" | "outlined";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ variant = "default", className, children, ...props }, ref) => {
        const baseStyles = "rounded-[var(--radius-md)] transition-colors";

        const variants = {
            default: "bg-(--color-surface-container)",
            elevated: "bg-(--color-surface-container-high)",
            outlined: "bg-(--color-surface) border border-(--color-outline-variant)",
        };

        return (
            <div ref={ref} className={cn(baseStyles, variants[variant], className)} {...props}>
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("px-6 py-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn("text-lg font-semibold font-(family-name:--font-geist) text-(--color-on-surface)", className)}
            {...props}
        />
    );
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("px-6 py-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("px-6 py-4 flex items-center gap-2", className)} {...props} />;
}
