export type Theme = "light" | "dark";

const KEY = "theme";
const systemQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

export function getStoredTheme(): Theme | null {
    try {
        const value = localStorage.getItem(KEY);
        return value === "light" || value === "dark" ? value : null;
    } catch {
        return null;
    }
}


export function resolveTheme(): Theme {
    return getStoredTheme() ?? (systemQuery().matches ? "dark" : "light");
}

export function applyTheme(theme: Theme): void {
    document.documentElement.classList.toggle("dark", theme === "dark");
}

export function saveTheme(theme: Theme): void {
    try {
        localStorage.setItem(KEY, theme);
    } catch {
    }
    applyTheme(theme);
}

export { systemQuery };