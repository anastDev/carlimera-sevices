export function isFestiveSeason(date = new Date()): boolean {
    const month = date.getMonth();
    const day = date.getDate();
    return month === 10 || (month === 0 && day <= 6);
}