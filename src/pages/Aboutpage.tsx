import { motion } from "motion/react";
import {card, container,  fadeUp} from "@/utils/transitions.ts";
import Breadcrumb from "@/components/smoothui/breadcrumb";
import {steps} from "@/data/aboutSteps.ts";
import {trustPillars} from "@/data/trustPillarsData.ts";
import Seo from "@/components/Seo.tsx";
import HiddenSanta from "@/components/festive/HiddenSanat.tsx";

const items = [
    { label: "Home", value: "/" },
    { label: "About Us" },
];

export const AboutPage = () => {
    return (
        <motion.section
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="container mx-auto max-w-7xl px-4 pb-10 mt-12 sm:mt-20 sm:px-6 lg:px-8"
        >
            <Seo
                title="About Us – Family-Run Car Dealership in Coventry"
                description="CARlimera Services is a small, family-run used car dealership in Coventry. Every car inspected and serviced, with finance options and UK-wide delivery."
                path="/about"
            />

            <Breadcrumb items={items} className="hover:text-primary" />

            {/* Title */}
            <motion.div variants={fadeUp} className="mt-6 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">About us</p>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    A Family-run used car dealership in Coventry
                </h1>
            </motion.div>

            {/* Story */}
            <motion.div variants={fadeUp} className="mt-4 mb-10 max-w-2xl space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                <p>
                    Welcome to CARlimera Services, your go-to destination for high-quality used cars. We are a
                    family-run business and we understand that buying a car is a significant investment, which is
                    why we are dedicated to giving our customers the best possible buying experience.
                </p>
                <p>
                    Every car we sell is inspected and serviced to make sure it is reliable. Our friendly team will
                    match you with the right car for your needs and budget, with competitive pricing, flexible
                    finance and a hassle-free process. From enquiry to delivery, we bring your next car straight
                    to your door, anywhere in the UK.
                </p>
            </motion.div>

            {/* Trust pillars */}
            <motion.div variants={fadeUp} className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {trustPillars.map((pillar) => (
                    <div
                        key={pillar.title}
                        className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-6 text-center shadow-sm
                            transition-colors duration-300 hover:border-primary/40 dark:shadow-black/30"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                            <pillar.icon className="size-8 text-primary" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">{pillar.title}</p>
                    </div>
                ))}
            </motion.div>

            {/* Tagline */}
            <motion.div
                variants={fadeUp}
                className="mb-10 rounded-lg border-l-4 border-primary bg-primary/5 px-5 py-4 dark:bg-primary/10"
            >
                <p className="text-lg font-medium italic text-foreground">
                    Drive away happy, wherever you are in the UK.
                    <HiddenSanta id="about" />
                </p>
            </motion.div>

            {/* How it works */}
            <motion.h2 variants={fadeUp} className="mb-4 text-lg font-bold text-foreground sm:text-xl">
                How It Works
            </motion.h2>

            <motion.ol variants={fadeUp} className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {steps.map((step) => (
                    <motion.li
                        key={step.number}
                        variants={card}
                        whileHover="hover"
                        className="rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow duration-300
                            hover:shadow-lg dark:shadow-black/30"
                    >
                        <span
                            className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary
                                text-xs font-bold text-primary-foreground"
                        >
                            {step.number}
                        </span>
                        <p className="mb-1 text-sm font-semibold text-foreground">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                    </motion.li>
                ))}
            </motion.ol>
        </motion.section>
    );
};

export default AboutPage;