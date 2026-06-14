import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                    Profile
                </h1>
                <p className="text-[var(--color-on-surface-variant)] mt-1">
                    Your coding journey
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card variant="elevated">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-24 h-24 rounded-full bg-[var(--color-primary-container)] flex items-center justify-center">
                                <span className="text-4xl font-bold text-[var(--color-on-primary-container)]">
                                    U
                                </span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                                    Username
                                </h2>
                                <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">
                                    Joined January 2026
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="primary">Level 5</Badge>
                                <Badge variant="secondary">Pro</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-[var(--color-on-surface-variant)]">
                                        Problems Solved
                                    </p>
                                    <p className="text-2xl font-bold text-[var(--color-on-surface)]">42</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[var(--color-on-surface-variant)]">
                                        Success Rate
                                    </p>
                                    <p className="text-2xl font-bold text-[var(--color-on-surface)]">78%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[var(--color-on-surface-variant)]">
                                        Total Submissions
                                    </p>
                                    <p className="text-2xl font-bold text-[var(--color-on-surface)]">127</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[var(--color-on-surface-variant)]">
                                        Ranking
                                    </p>
                                    <p className="text-2xl font-bold text-[var(--color-on-surface)]">#156</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Submissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[var(--color-on-surface-variant)]">
                                No recent submissions
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
