import { motion } from "motion/react";
import { Calculator, Phone, Truck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { DeliveryEstimator } from "@/components/DeliveryEstimator";
import {container} from "@/utils/transitions.ts";
import Breadcrumb from "@/components/smoothui/breadcrumb";

const breadcrumbItems = [
    { label: "Home", value: "/" },
    { label: "Delivery" },
];

const steps = [
    {
        icon: Calculator,
        title: "Get an estimate",
        text: "Enter your postcode for an instant delivery estimate.",
    },
    {
        icon: Phone,
        title: "Call to confirm",
        text: "We'll confirm the final price based on the car and our driver's route.",
    },
    {
        icon: Truck,
        title: "We deliver",
        text: "Your car is brought to your door, anywhere in the UK.",
    },
];

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: "easeOut" },
} as const;

export const DeliveryPage = () => (
    <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-7xl px-4 pb-10 mt-12 sm:mt-20 sm:px-6 lg:px-8"
    >
        <Seo
            title="Car Delivery Cost Calculator"
            description="Get an instant estimate for car delivery from CARlimera Services in Coventry. The first 10 miles are free, with delivery available across the UK."
            path="/delivery"
        />

        <Breadcrumb items={breadcrumbItems} className="hover:text-primary" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 mt-6">
            {/* Calculator */}
            <div className="lg:col-span-3 space-y-6">
                <motion.div variants={fadeUp} className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Estimate Delivery Cost
                    </h1>
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                        Find out roughly what it costs to have your car delivered from our Coventry
                        dealership. <strong className="text-foreground">The first 10 miles are always free.</strong>
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    className="rounded-lg border border-border bg-background p-5 shadow-sm"
                >
                    <DeliveryEstimator />
                </motion.div>
            </div>

            {/* How it works */}
            <motion.aside variants={fadeUp} className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-bold text-foreground">How it works</h2>
                <ol className="space-y-3">
                    {steps.map((step, i) => (
                        <li
                            key={step.title}
                            className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 shadow-sm"
                        >
                            <div className="rounded-lg bg-accent p-2 text-sidebar-primary">
                                <step.icon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    {i + 1}. {step.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">{step.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="rounded-lg bg-border/30 p-4 text-xs leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">Please note:</strong> estimates use approximate
                    road distance from our dealership at CV6 1EL. They're a guide, not a final price.
                    We'll always confirm the cost with you before delivery.
                </div>
            </motion.aside>
        </div>
    </motion.div>
);

export default DeliveryPage;