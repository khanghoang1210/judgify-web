import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export function SubmissionResultPage() {
    const { submissionId } = useParams();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                    Submission #{submissionId}
                </h1>
                <p className="text-[var(--color-on-surface-variant)] mt-1">
                    View submission results
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="elevated">
                    <CardHeader>
                        <CardTitle>Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="tertiary">Accepted</Badge>
                    </CardContent>
                </Card>

                <Card variant="elevated">
                    <CardHeader>
                        <CardTitle>Runtime</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-[var(--color-on-surface)]">24ms</p>
                    </CardContent>
                </Card>

                <Card variant="elevated">
                    <CardHeader>
                        <CardTitle>Memory</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-[var(--color-on-surface)]">14.2MB</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Test Cases</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[var(--color-on-surface-variant)]">
                        Test case results will be displayed here
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
