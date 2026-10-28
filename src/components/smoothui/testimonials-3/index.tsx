"use client";
import { cn } from "@/lib/utils";
import { getTestimonials } from "@/lib/smoothui-data";
import {Quote, Star} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: "easeOut" },
} as const;

const testimonials = getTestimonials(4);

function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
                d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.64h6.458c-.282 1.5-1.136 2.773-2.418 3.623v3.008h3.912c2.29-2.11 3.567-5.216 3.567-8.816z"
                fill="#4285F4"
            />
            <path
                d="M12 24c3.24 0 5.955-1.075 7.94-2.91l-3.912-3.008c-1.085.727-2.472 1.157-4.028 1.157-3.098 0-5.72-2.09-6.656-4.898H1.29v3.077C3.264 21.31 7.31 24 12 24z"
                fill="#34A853"
            />
            <path
                d="M5.344 14.34a7.19 7.19 0 0 1 0-4.68V6.583H1.29a11.997 11.997 0 0 0 0 10.834l4.054-3.077z"
                fill="#FBBC05"
            />
            <path
                d="M12 4.773c1.762 0 3.344.606 4.59 1.795l3.444-3.444C17.95 1.19 15.236 0 12 0 7.31 0 3.264 2.69 1.29 6.583l4.054 3.077C6.28 6.85 8.902 4.773 12 4.773z"
                fill="#EA4335"
            />
        </svg>
    );
}

function getInitials(fullName: string): string {
    return fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

export function TestimonialsStars() {
    const shouldReduceMotion = useReducedMotion();
    const ease = [0.22, 1, 0.36, 1] as const;

    return (
        <motion.section {...fadeUp}>
            <div className="py-8">
                <div className="container mx-auto w-full max-w-7xl">
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease }}
                        className="mb-6"
                    >
                        <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                            What early customers say
                        </h2>
                        <p className="my-1 text-xs sm:text-base text-muted-foreground">
                            We're a small local team, so every single honest review means the world to us.
                        </p>
                    </motion.div>

                    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                        {testimonials.map((testimonial, index) => (
                            <motion.figure
                                key={testimonial.fullName}
                                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={
                                    shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease, delay: index * 0.15 }
                                }
                                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2, ease } }}
                                className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card p-5
                                    shadow-sm transition-colors duration-200 hover:border-primary/40 dark:shadow-black/30"
                            >
                                {/* Large quote mark  */}
                                <Quote
                                    aria-hidden="true"
                                    className="absolute right-4 top-4 h-10 w-10 text-primary/10 dark:text-primary/15"
                                    fill="currentColor"
                                    strokeWidth={0}
                                />

                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex gap-1" aria-label={`${testimonial.stars} out of 5 stars`} role="img">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <motion.div
                                                key={`${testimonial.fullName}-star-${i}`}
                                                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={
                                                    shouldReduceMotion
                                                        ? { duration: 0 }
                                                        : {
                                                            duration: 0.3,
                                                            delay: index * 0.15 + 0.2 + i * 0.05,
                                                            ease: [0.68, -0.55, 0.265, 1.55],
                                                        }
                                                }
                                            >
                                                <Star
                                                    aria-hidden="true"
                                                    className={cn(
                                                        "size-4",
                                                        i < (testimonial.stars || 0)
                                                            ? "fill-amber-400 stroke-amber-400"
                                                            : "fill-transparent stroke-muted-foreground/40",
                                                    )}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                                        <GoogleIcon className="size-3" />
                                        <span className="text-[0.65rem] font-medium">Google</span>
                                    </div>
                                </div>

                                <blockquote className="my-4 text-pretty text-sm leading-relaxed text-foreground">
                                    {testimonial.review}
                                </blockquote>

                                <figcaption className="mt-auto flex items-center gap-2.5 border-t border-border pt-3">
                                    <div
                                        aria-hidden="true"
                                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10
                                            text-[0.72rem] font-bold text-primary ring-1 ring-primary/20"
                                    >
                                        {getInitials(testimonial.fullName)}
                                    </div>
                                    <span className="truncate text-[0.85rem] font-semibold text-foreground">
                                        {testimonial.fullName}
                                    </span>
                                </figcaption>
                            </motion.figure>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default TestimonialsStars;
