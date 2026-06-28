import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export function ProblemDetailPage() {
    const { problemId } = useParams();

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold font-(family-name:--font-geist) text-(--color-on-surface)">
                            Problem #{problemId}
                        </h1>
                        <Badge variant="primary">Easy</Badge>
                    </div>
                    <p className="text-(--color-on-surface-variant) mt-1">
                        Two Sum
                    </p>
                </div>
                <Button variant="primary">Submit Solution</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-(--color-on-surface-variant)">
                            Problem description will be displayed here.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Code Editor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-(--color-surface-container-lowest) p-4 rounded-[var(--radius-md)] font-(family-name:--font-jetbrains-mono) text-sm">
                            <code className="text-(--color-on-surface)">
                // Write your solution here
                            </code>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
