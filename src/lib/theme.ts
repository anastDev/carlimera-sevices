export type Theme = "light" | "dark";

const KEY = "theme";

export function currentTheme(): Theme {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
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