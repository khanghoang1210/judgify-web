import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    onValueChange: (value: string) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
}

export function Select({ value, onValueChange, options, placeholder, className }: SelectProps) {
    return (
        <div className={cn("relative", className)}>
            <select
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className="appearance-none bg-[var(--color-surface-container-high)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] text-sm pl-3 pr-8 py-2 rounded-[var(--radius-md)] cursor-pointer focus:outline-none focus:border-[var(--color-primary)] transition-colors w-full"
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[var(--color-on-surface-variant)]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </div>
    );
}
