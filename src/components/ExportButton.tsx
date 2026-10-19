import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import {downloadReport} from "@/services/api.export.ts";

const PERIODS = [
    { value: 30, label: "Last 30 days" },
    { value: 90, label: "Last 90 days" },
    { value: 365, label: "Last 12 months" },
];

export const ExportReportButton = () => {
    const [days, setDays] = useState(90);
    const [includeContacts, setIncludeContacts] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await downloadReport(days, includeContacts);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Couldn't create the report.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
                <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    aria-label="Report period"
                    className="cursor-pointer rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                    {PERIODS.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                </select>

                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                    <input
                        type="checkbox"
                        checked={includeContacts}
                        onChange={(e) => setIncludeContacts(e.target.checked)}
                        className="h-4 w-4 accent-teal-600"
                    />
                    Include customer contact details
                </label>

                <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isLoading}
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-background
                        px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted
                        disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                        <Download className="h-4 w-4" aria-hidden="true" />
                    )}
                    {isLoading ? "Preparing…" : "Download report"}
                </button>
            </div>

            {includeContacts && (
                <p className="text-xs text-amber-700">
                    The file will contain customers' personal details. Store it securely and delete
                    it when you're done.
                </p>
            )}

            {error && (
                <p role="alert" className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default ExportReportButton;