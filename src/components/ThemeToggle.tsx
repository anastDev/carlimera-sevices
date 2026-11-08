import { Moon, Sun } from "lucide-react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { currentTheme, saveTheme, type Theme } from "@/lib/theme";

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const ThemeToggle = ({ className }: { className?: string }) => {
    const [theme, setTheme] = useState<Theme>(currentTheme);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggle = () => {
        const next: Theme = theme === "dark" ? "light" : "dark";

        const switchTheme = () => {
            saveTheme(next);
            setTheme(next);
        };

        const button = buttonRef.current;

        if (!button || !document.startViewTransition || prefersReducedMotion()) {
            switchTheme();
            return;
        }

        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
        );

        const transition = document.startViewTransition(() => {
            flushSync(switchTheme);
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${radius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 800,
                    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
                    pseudoElement: "::view-transition-new(root)",
                },
            );
        });
    };

    const isDark = theme === "dark";

    return (
        <button
            ref={buttonRef}
            type="button"
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            className={cn(
                "flex cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors",
                "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                className,
            )}
        >
            {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
        </button>
    );
};

export default ThemeToggle;