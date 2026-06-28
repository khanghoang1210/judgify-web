import { Zap } from "lucide-react";
import type { CTABannerData } from "../../types/leaderboard";

interface CTABannerProps {
    data: CTABannerData;
    onPrimary: () => void;
    onSecondary: () => void;
}

function HighlightedMessage({ message, highlight }: { message: string; highlight: string }) {
    const idx = message.indexOf(highlight);
    if (idx === -1) return <span>{message}</span>;
    return (
        <>
            {message.slice(0, idx)}
            <span className="text-(--color-primary) font-semibold">{highlight}</span>
            {message.slice(idx + highlight.length)}
        </>
    );
}

export function CTABanner({ data, onPrimary, onSecondary }: CTABannerProps) {
    return (
        <div className="flex flex-col items-center gap-4 py-6 px-6 bg-(--color-surface-container) rounded-xl border border-(--color-outline-variant) text-center">
            <p className="text-sm text-(--color-on-surface-variant) max-w-xl">
                <HighlightedMessage message={data.message} highlight={data.highlight} />
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
                <button
                    onClick={onPrimary}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-(--color-primary-container) text-(--color-on-surface) hover:opacity-90 transition-opacity"
                >
                    <Zap size={15} />
                    {data.primaryLabel}
                </button>
                <button
                    onClick={onSecondary}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-(--color-outline-variant) text-(--color-on-surface-variant) hover:text-(--color-on-surface) hover:border-(--color-outline) transition-colors"
                >
                    {data.secondaryLabel}
                </button>
            </div>
        </div>
    );
}
