import { motion } from "motion/react";
import {card, container,  fadeUp} from "@/utils/transitions.ts";
import Breadcrumb from "@/components/smoothui/breadcrumb";
import {steps} from "@/data/aboutSteps.ts";
import {trustPillars} from "@/data/trustPillarsData.ts";

const items = [
    {label: "Home", value: "/"},
    {label: "About Us"},
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
            {/* Breadcrumb */}
            <Breadcrumb items={items} className="hover:text-primary"></Breadcrumb>

            {/* Title */}
            <motion.div variants={fadeUp} className="mt-6">
                <h1 className="mb-3 text-2xl font-semibold text-foreground">
                    Why Should You Choose CARlimera Services Ltd?
                </h1>
            </motion.div>

            {/* Story */}
            <motion.div variants={fadeUp} className="mb-10">
                <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    Welcome to CARlimera Services, your go-to destination for high-quality used cars! We are a
                    family run business and we understand that buying a car can be a significant investment,
                    which is why we are dedicated to providing our customers with the best possible car buying
                    experience.
                </p>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    At CARlimera Services, we take pride in offering a wide selection of premium used cars that
                    have been meticulously inspected and serviced to ensure their quality and reliability. Our
                    knowledgeable and friendly team is here to match you with the right car for your needs and
                    your budget, backed by competitive pricing, flexible financing options, and a genuinely
                    hassle-free buying process. From enquiry to delivery, we make it easy with nationwide UK
                    delivery bringing your dream car straight to your door.
                </p>
            </motion.div>

            {/* Trust pillars */}
            <motion.div variants={fadeUp} className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {trustPillars.map((pillar) => (
                    <motion.div
                        key={pillar.title}
                        className="overflow-hidden bg-background rounded-lg transition-all duration-300"
                    >
                        <div className="flex items-center justify-center bg-muted/50 py-6">
                            <pillar.icon
                                className="size-12 text-primary"
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                        </div>
                        <div className="p-4 text-center">
                            <p className="text-sm font-medium text-foreground">
                                {pillar.title}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mb-4 rounded-lg p-5 text-center">
                <p className="text-lg italic text-foreground">
                    Drive away happy, wherever you are in the UK.
                </p>
            </motion.div>

            {/* Steps title */}
            <motion.h2
                variants={fadeUp}
                className="mb-4 text-sm font-semibold text-gray-900"
            >
                How It Works
            </motion.h2>

            {/* Grid */}
            <motion.div
                variants={fadeUp}
                className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
                {steps.map((step) => (
                    <motion.div
                        key={step.number}
                        variants={card}
                        whileHover="hover"
                        className="rounded-xl bg-orange-50/40 p-5 transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                        <p className="mb-2 text-xs font-semibold text-primary">
                            {step.number}
                        </p>

                        <p className="mb-1 text-sm font-semibold text-foreground">
                            {step.title}
                        </p>

                        <p className="text-xs text-gray-500">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default AboutPage;