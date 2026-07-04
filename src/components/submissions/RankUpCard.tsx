import { Award } from "lucide-react";

interface RankUpCardProps {
  title: string;
  message: string;
}

export function RankUpCard({ title, message }: RankUpCardProps) {
  return (
    <div className="relative bg-surface-container border border-outline-variant rounded-xl overflow-hidden p-6 group">
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 shrink-0">
          <Award
            size={24}
            className="text-primary"
            fill="currentColor"
            fillOpacity={0.2}
          />
        </div>
        <div>
          <p className="text-on-surface font-bold">{title}</p>
          <p className="text-body-sm text-on-surface-variant">{message}</p>
        </div>
      </div>
    </div>
  );
}
