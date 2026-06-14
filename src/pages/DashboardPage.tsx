import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

export function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                    Dashboard
                </h1>
                <p className="text-[var(--color-on-surface-variant)] mt-1">
                    Welcome to Judgify
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="elevated">
                    <CardHeader>
                        <CardTitle>Problems Solved</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-[var(--color-primary)]">42</p>
                    </CardContent>
                </Card>

                <Card variant="elevated">
                    <CardHeader>
                        <CardTitle>Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-[var(--color-tertiary)]">78%</p>
                    </CardContent>
                </Card>

                <Card variant="elevated">
                    <CardHeader>
                        <CardTitle>Ranking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-[var(--color-secondary)]">#156</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[var(--color-on-surface-variant)]">
                        No recent activity yet
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
