import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { isFestiveSeason } from "@/lib/festive";

const STORAGE_KEY = "santas_found";
export const TOTAL_SANTAS = 5;

function readFound(): string[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
        return [];
    }
}

function saveFound(found: string[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    } catch {
    }
}

interface HiddenSantaProps {
    id: string;
    className?: string;
}

export const HiddenSanta = ({ id, className }: HiddenSantaProps) => {
    const [found, setFound] = useState(() => readFound().includes(id));

    if (!isFestiveSeason()) return null;

    const handleFind = () => {
        const all = readFound();
        if (!all.includes(id)) {
            all.push(id);
            saveFound(all);
        }
        setFound(true);

        if (all.length >= TOTAL_SANTAS) {
            toast.success("You found all the Santas! 🎄 Merry Christmas from the CARlimera team.");
        } else {
            toast(`🎅 You found Santa! ${all.length} of ${TOTAL_SANTAS}`);
        }
    };

    return (
        <button
            type="button"
            onClick={handleFind}
            aria-label="Hidden Santa"
            title="Ho ho ho!"
            className={cn(
                "inline-flex cursor-pointer select-none items-center justify-center text-base leading-none transition-all",
                found ? "opacity-100" : "opacity-30 hover:opacity-100 hover:scale-125",
                className,
            )}
        >
            🎅
        </button>
    );
};

export default HiddenSanta;