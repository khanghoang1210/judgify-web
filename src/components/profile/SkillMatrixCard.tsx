import type { SkillScore } from "../../types/profile";

interface SkillMatrixCardProps {
    skills: SkillScore[];
}

function toPoint(index: number, n: number, cx: number, cy: number, r: number): [number, number] {
    const angle = (index / n) * 2 * Math.PI - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

function polygonPoints(
    values: number[],
    cx: number,
    cy: number,
    maxR: number
): string {
    return values
        .map((v, i) => {
            const [x, y] = toPoint(i, values.length, cx, cy, (v / 100) * maxR);
            return `${x},${y}`;
        })
        .join(" ");
}

function gridPolygonPoints(cx: number, cy: number, r: number, n: number): string {
    return Array.from({ length: n }, (_, i) => {
        const [x, y] = toPoint(i, n, cx, cy, r);
        return `${x},${y}`;
    }).join(" ");
}

const GRID_LEVELS = [0.25, 0.5, 0.75, 1];

export function SkillMatrixCard({ skills }: SkillMatrixCardProps) {
    const cx = 110;
    const cy = 105;
    const maxR = 72;
    const labelR = maxR + 20;
    const n = skills.length;

    return (
        <div className="bg-[var(--color-surface-container)] rounded-xl border border-[var(--color-outline-variant)] p-5">
            <h3 className="text-base font-semibold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)] mb-2">
                Skill Matrix
            </h3>
            <div className="flex justify-center">
                <svg width="220" height="220" viewBox="0 0 220 220">
                    {/* Grid rings */}
                    {GRID_LEVELS.map((lvl, gi) => (
                        <polygon
                            key={gi}
                            points={gridPolygonPoints(cx, cy, maxR * lvl, n)}
                            fill="none"
                            stroke="var(--color-outline-variant)"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Axis lines */}
                    {skills.map((_, i) => {
                        const [x, y] = toPoint(i, n, cx, cy, maxR);
                        return (
                            <line
                                key={i}
                                x1={cx}
                                y1={cy}
                                x2={x}
                                y2={y}
                                stroke="var(--color-outline-variant)"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {/* Skill fill polygon */}
                    <polygon
                        points={polygonPoints(
                            skills.map((s) => s.value),
                            cx,
                            cy,
                            maxR
                        )}
                        fill="var(--color-secondary-container)"
                        fillOpacity="0.35"
                        stroke="var(--color-secondary)"
                        strokeWidth="1.5"
                    />

                    {/* Vertex dots */}
                    {skills.map((s, i) => {
                        const [x, y] = toPoint(i, n, cx, cy, (s.value / 100) * maxR);
                        return (
                            <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="3"
                                fill="var(--color-secondary)"
                            />
                        );
                    })}

                    {/* Labels */}
                    {skills.map((s, i) => {
                        const [x, y] = toPoint(i, n, cx, cy, labelR);
                        return (
                            <text
                                key={i}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="var(--color-on-surface-variant)"
                                fontSize="10"
                                fontFamily="var(--font-jetbrains-mono)"
                            >
                                {s.name}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
