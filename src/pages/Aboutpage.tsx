import Breadcrumb from "@/components/smoothui/breadcrumb";
import {steps} from "@/data/aboutSteps.ts";
import {card, container, fadeUp} from "@/utils/transitions.ts";
import { motion } from "framer-motion";

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
            className="container mx-auto max-w-7xl px-4 pb-8 mt-12 sm:mt-20 sm:px-6 lg:px-8"
        >
            {/* Breadcrumb */}
            <Breadcrumb items={items} className="hover:text-primary"></Breadcrumb>

            {/* Title + text */}
            <motion.div variants={fadeUp} className="mt-6">
                <h1 className="mb-4 text-2xl font-semibold text-blue-950">
                    Why Should You Choose CARlimera Services Ltd?
                </h1>

                <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-500">
                    If you're shopping for a second-hand car, chances are you already know roughly what make,
                    model and features you're after...
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
                variants={container}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
                {steps.map((step) => (
                    <motion.div
                        key={step.number}
                        variants={card}
                        whileHover="hover"
                        className="rounded-xl bg-orange-50/40 p-5 transition-all duration-300 hover:shadow-md"
                    >
                        <p className="mb-2 text-xs font-semibold text-primary">
                            {step.number}
                        </p>

                        <p className="mb-1 text-sm font-semibold text-gray-900">
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