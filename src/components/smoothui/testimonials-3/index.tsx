"use client";
import { cn } from "@/lib/utils";
import { getTestimonials } from "@/lib/smoothui-data";
import { Star } from "lucide-react";
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
    return (
        <motion.section {...fadeUp}>
            <div className="py-8">
                <div className="container mx-auto w-full max-w-7xl">
                    <motion.div
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        className="mb-6"
                        initial={
                            shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                        }
                        transition={
                            shouldReduceMotion
                                ? { duration: 0 }
                                : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                        }
                    >
                        <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                            What early customers say
                        </h2>
                        <p className="my-1 italic text-xs sm:text-base text-muted-foreground">
                            We're a small local team, so every single honest review means the world to us.
                        </p>
                    </motion.div>

                    <motion.div
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
                        className="grid 3xl:grid-cols-3 3xl:gap-12 gap-6 lg:grid-cols-2"
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                        transition={
                            shouldReduceMotion
                                ? { duration: 0 }
                                : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
                        }
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                animate={
                                    shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                                }
                                className="group flex h-full flex-col rounded-lg border border-transparent px-4 py-3 duration-200 hover:border-border hover:bg-background/50"
                                initial={
                                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }
                                }
                                key={testimonial.fullName}
                                transition={
                                    shouldReduceMotion
                                        ? { duration: 0 }
                                        : {
                                            duration: 0.5,
                                            ease: [0.22, 1, 0.36, 1],
                                            delay: index * 0.15,
                                        }
                                }
                                whileHover={
                                    shouldReduceMotion
                                        ? {}
                                        : {
                                            y: -4,
                                            transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                                        }
                                }
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <motion.div
                                        animate={
                                            shouldReduceMotion
                                                ? { opacity: 1 }
                                                : { opacity: 1, scale: 1 }
                                        }
                                        className="flex gap-1"
                                        initial={
                                            shouldReduceMotion
                                                ? { opacity: 1 }
                                                : { opacity: 0, scale: 0.8 }
                                        }
                                        transition={
                                            shouldReduceMotion
                                                ? { duration: 0 }
                                                : {
                                                    duration: 0.4,
                                                    delay: index * 0.15 + 0.2,
                                                    ease: [0.22, 1, 0.36, 1],
                                                }
                                        }
                                    >
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <motion.div
                                                animate={
                                                    shouldReduceMotion
                                                        ? { opacity: 1 }
                                                        : { opacity: 1, scale: 1 }
                                                }
                                                initial={
                                                    shouldReduceMotion
                                                        ? { opacity: 1 }
                                                        : { opacity: 0, scale: 0 }
                                                }
                                                key={`${testimonial.fullName}-star-${i}`}
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
                                                    className={cn(
                                                        "size-4 transition-colors duration-200",
                                                        i < (testimonial.stars || 0)
                                                            ? "fill-yellow-400 stroke-yellow-400"
                                                            : "fill-transparent stroke-border"
                                                    )}
                                                />
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    {/* Google Icon */}
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <GoogleIcon className="size-3" />
                                        <span className="text-[0.65rem]">Google</span>
                                    </div>
                                </div>

                                {/* Review Section */}
                                <motion.p
                                    animate={
                                        shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                                    }
                                    className="my-4 text-pretty text-sm text-foreground leading-relaxed"
                                    initial={
                                        shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
                                    }
                                    transition={
                                        shouldReduceMotion
                                            ? { duration: 0 }
                                            : {
                                                duration: 0.4,
                                                delay: index * 0.15 + 0.4,
                                                ease: [0.22, 1, 0.36, 1],
                                            }
                                    }
                                >
                                    {testimonial.review}
                                </motion.p>

                                {/* Footer */}
                                <motion.div
                                    animate={
                                        shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
                                    }
                                    className="mt-auto flex items-center gap-2 pt-2"
                                    initial={
                                        shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }
                                    }
                                    transition={
                                        shouldReduceMotion
                                            ? { duration: 0 }
                                            : {
                                                duration: 0.3,
                                                delay: index * 0.15 + 0.5,
                                                ease: [0.22, 1, 0.36, 1],
                                            }
                                    }
                                >
                                    <div
                                        aria-hidden="true"
                                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[0.70rem] font-semibold text-foreground/90 ring-1 ring-foreground/10"
                                    >
                                        {getInitials(testimonial.fullName)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate font-medium text-foreground/90 text-[0.80rem]">
                                            {testimonial.fullName}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

export default TestimonialsStars;
