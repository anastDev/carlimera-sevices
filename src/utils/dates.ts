const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function formatListedDate(isoDate?: string | null): string {
    if (!isoDate) return "—";

    const then = new Date(isoDate);
    if (Number.isNaN(then.getTime())) return "—";

    const daysAgo = Math.floor((Date.now() - then.getTime()) / MS_PER_DAY);

    if (daysAgo === 0) return "Today";
    if (daysAgo === 1) return "Yesterday";
    if (daysAgo < 30) return `${daysAgo} days ago`;

    return then.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}