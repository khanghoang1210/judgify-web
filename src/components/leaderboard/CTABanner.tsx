import { Zap } from "lucide-react";
import type { CTABannerData } from "../../types/leaderboard";

interface CTABannerProps {
  data: CTABannerData;
  onPrimary: () => void;
  onSecondary: () => void;
}

function HighlightedMessage({
  message,
  highlight,
}: {
  message: string;
  highlight: string;
}) {
  const idx = message.indexOf(highlight);
  if (idx === -1) return <span>{message}</span>;
  return (
    <>
      {message.slice(0, idx)}
      <span className="text-primary font-semibold">{highlight}</span>
      {message.slice(idx + highlight.length)}
    </>
  );
}

export function CTABanner({ data, onPrimary, onSecondary }: CTABannerProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-6 px-6 bg-surface-container rounded-xl border border-outline-variant text-center">
      <p className="text-body-sm text-on-surface-variant max-w-xl">
        <HighlightedMessage message={data.message} highlight={data.highlight} />
      </p>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          onClick={onPrimary}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-body-sm font-semibold bg-primary-container text-on-surface hover:opacity-90 transition-opacity"
        >
          <Zap size={15} />
          {data.primaryLabel}
        </button>
        <button
          onClick={onSecondary}
          className="px-5 py-2.5 rounded-lg text-body-sm font-semibold border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-outline transition-colors"
        >
          {data.secondaryLabel}
        </button>
      </div>
    </div>
  );
}
