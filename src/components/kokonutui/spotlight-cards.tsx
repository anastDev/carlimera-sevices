"use client";

/**
 * @author dorianbaffier
 * @description Feature grid with aurora ambient, magnetic 3D tilt, and focus-dim siblings.
 * @version 2.0.0
 * @date 2025-02-20
 * @license MIT
 * @website https://kokonutui.com
 * @github https://github.com/kokonut-labs/kokonutui
 */
import type { LucideIcon } from "lucide-react";
import { ShieldCheck, TruckIcon, Users } from "lucide-react";
import { motion } from "motion/react";
// useRef, useMotionValue, useSpring, useTransform, and useState were only
// needed by the hover tilt/glow/dim animation, which is disabled below.
// import { useRef, useMotionValue, useSpring, useTransform } from "motion/react";
// import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Hover tilt/glow/dim animation is disabled below (not used) — kept as comments
// instead of deleted, so it's easy to switch back on later if you change your mind.
// const TILT_MAX = 9;
// const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
// const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

function withAlpha(color: string, alpha: number): string {
    return color.replace(/\)\s*$/, ` / ${alpha})`);
}
// ─── Data ────────────────────────────────────────────────────────────────────────

export interface SpotlightItem {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
}

const DEFAULT_ITEMS: SpotlightItem[] = [
    {
        icon: ShieldCheck,
        title: "Trusted Quality",
        description: "Every car inspected and serviced before it reaches you.",
        color: "oklch(0.569 0.093 193.915)",
    },
    {
        icon: TruckIcon,
        title: "Nationwide Delivery",
        description: "Delivered straight to your door, anywhere in the UK.",
        color: "oklch(0.362 0.056 213.118)",
    },
    {
        icon: Users,
        title: "Family Values",
        description: "A family run team — straightforward, no-pressure deals.",
        color: "oklch(0.769 0.188 70.08)",

    },
];

// ─── Card ────────────────────────────────────────────────────────────────────────

interface CardProps {
    item: SpotlightItem;
    // dimmed: boolean;
    // onHoverStart: () => void;
    // onHoverEnd: () => void;
}

function Card({
                  item,
                  // dimmed, onHoverStart, onHoverEnd — unused now that the hover animation
                  // below is disabled
              }: CardProps) {
    const Icon = item.icon;
    // const cardRef = useRef<HTMLDivElement>(null);

    // normX/normY tracked the pointer's 0–1 position inside the card and drove
    // the 3D tilt via rotateX/rotateY below. Disabled.
    // const normX = useMotionValue(0.5);
    // const normY = useMotionValue(0.5);

    // const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
    // const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);

    // const rotateX = useSpring(rawRotateX, TILT_SPRING);
    // const rotateY = useSpring(rawRotateY, TILT_SPRING);
    // const glowOpacity = useSpring(0, GLOW_SPRING);

    // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    //     const el = cardRef.current;
    //     if (!el) {
    //         return;
    //     }
    //     const rect = el.getBoundingClientRect();
    //     normX.set((e.clientX - rect.left) / rect.width);
    //     normY.set((e.clientY - rect.top) / rect.height);
    // };

    // const handleMouseEnter = () => {
    //     glowOpacity.set(1);
    //     onHoverStart();
    // };

    // const handleMouseLeave = () => {
    //     normX.set(0.5);
    //     normY.set(0.5);
    //     glowOpacity.set(0);
    //     onHoverEnd();
    // };

    return (
        <motion.div
            // animate={{
            //     scale: dimmed ? 0.96 : 1,
            //     opacity: dimmed ? 0.5 : 1,
            // }}
            className={cn(
                // items-center centers the icon badge + text block horizontally;
                // text-center cascades down to the h3/p so title and description
                // align center too, without needing text-center on each one
                "group relative flex flex-col items-center gap-5 overflow-hidden rounded-lg border p-6 text-center",
                "border-zinc-200 bg-background shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                "transition-[border-color] duration-300",
                "hover:border-zinc-300 "
            )}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            // onMouseMove={handleMouseMove}
            // ref={cardRef}
            // style={{
            //     rotateX,
            //     rotateY,
            //     transformPerspective: 900,
            // }}
            // transition={{ duration: 0.18, ease: "easeOut" }}
        >
            {/* Static accent tint — always visible */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg"
                style={{
                    background: `radial-gradient(ellipse at 20% 20%, ${withAlpha(item.color, 0.08)}, transparent 65%)`,
                }}
            />

            {/* Hover glow layer — disabled along with glowOpacity above
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg"
                style={{
                    opacity: glowOpacity,
                    background: `radial-gradient(ellipse at 20% 20%, ${withAlpha(item.color, 0.18)}, transparent 65%)`,
                }}
            />
            */}

            {/* Shimmer sweep — pure CSS group-hover animation, disabled
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-linear-to-r from-transparent via-white/4.5 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
            />
            */}

            {/* Icon badge */}
            <div
                className="relative z-10 flex h-15 w-15 items-center justify-center rounded-lg"
                style={{
                    background: withAlpha(item.color, 0.09),
                    boxShadow: `inset 0 0 0 1px ${withAlpha(item.color, 0.19)}`,
                }}
            >
                <Icon size={26} strokeWidth={1.9} style={{ color: item.color }} />
            </div>

            {/* Text */}
            <div className="relative z-10 flex flex-col gap-2">
                <h3 className="font-semibold text-[0.875rem] text-foreground tracking-tight ">
                    {item.title}
                </h3>
                <p className="text-[0.781rem] text-muted-foreground leading-relaxed ">
                    {item.description}
                </p>
            </div>

            {/* Accent bottom line — pure CSS group-hover animation, disabled
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                style={{
                    background: `linear-gradient(to right, ${withAlpha(item.color, 0.5)}, transparent)`,
                }}
            />
            */}
        </motion.div>
    );
}

Card.displayName = "Card";

// ─── Main export ──────────────────────────────────────────────────────────────────

export interface SpotlightCardsProps {
    items?: SpotlightItem[];
    eyebrow?: string;
    heading?: string;
    showHeader?: boolean;
    className?: string;
}

export default function SpotlightCards({
                                           items = DEFAULT_ITEMS,
                                           eyebrow = "Why choose us",
                                           heading = "What you can count on",
                                           showHeader = true,
                                           className,
                                       }: SpotlightCardsProps) {
    // Tracked which card was hovered, to dim its siblings. Disabled along with
    // the rest of the hover animation.
    // const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden rounded-lg py-4",
                "bg-background ",
                className
            )}
        >
            {/* Dot grid — light mode only */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 dark:hidden"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                }}
            />

            {showHeader && (
                <div className="relative mb-8 flex flex-col gap-1.5">
                    <p className="font-semibold text-[0.625rem] text-primary uppercase tracking-[0.22em]">
                        {eyebrow}
                    </p>
                    <h2 className="font-semibold text-lg text-foreground tracking-tight sm:text-2xl">
                        {heading}
                    </h2>
                </div>
            )}

            <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3">
                {items.map((item) => (
                    <Card
                        // dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
                        item={item}
                        key={item.title}
                        // onHoverEnd={() => setHoveredTitle(null)}
                        // onHoverStart={() => setHoveredTitle(item.title)}
                    />
                ))}
            </div>
        </div>
    );
}