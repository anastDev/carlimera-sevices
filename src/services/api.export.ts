import {apiFetch, errorFrom} from "@/utils/apiFetch.ts";

export async function downloadReport(days: number, includeContacts = false): Promise<void> {
    const params = new URLSearchParams({
        days: String(days),
        include_contacts: String(includeContacts),
    });

    const res = await apiFetch(`/exports/report.xlsx?${params}`, { requiresAuth: true });
    if (!res.ok) throw await errorFrom(res, "Couldn't create the report.");

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `carlimera-report-${new Date().toISOString().slice(0, 10)}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}