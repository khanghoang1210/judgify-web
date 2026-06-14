import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

export function LeaderboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                    Leaderboard
                </h1>
                <p className="text-[var(--color-on-surface-variant)] mt-1">
                    Top performers
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Rankings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((rank) => (
                            <div
                                key={rank}
                                className="flex items-center justify-between p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-container-low)]"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold text-[var(--color-primary)] font-[family-name:var(--font-geist)]">
                                        #{rank}
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-[var(--color-on-surface)]">
                                            User {rank}
                                        </h3>
                                        <p className="text-sm text-[var(--color-on-surface-variant)]">
                                            Problems solved: {100 - rank * 5}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-lg font-bold text-[var(--color-on-surface)]">
                                    {1000 - rank * 50} pts
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
