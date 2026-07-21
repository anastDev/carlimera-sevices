import type {Variants} from "framer-motion";
import {stagger} from "motion";

export const container : Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: stagger(0.1, { from: "first" })
        },
    },
} as const;

export const fadeUp = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
} as const;

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: 0.4 },
    },
}as const ;

export const card: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    hover: {
        scale: 1.04,
        y: -4,
        transition: { duration: 0.2 },
    },
}as const;