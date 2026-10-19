import {motion} from "motion/react";
import { Seo } from "@/components/Seo";
import {container, fadeUp} from "@/utils/transitions.ts";
import BrokenDownCar from "@/components/BrokenDownCar.tsx";

export const NotFound = () => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="container mx-auto max-w-7xl px-4 pb-10 mt-12 sm:mt-20 sm:px-6 lg:px-8"
        >
            <Seo
                title="Page not found"
                description="The page you were looking for doesn't exist."
                path="/404"
                noindex
            />

            <div className="mx-auto flex max-w-xl flex-col items-center py-12 sm:py-20 text-center">
                <motion.p
                    variants={fadeUp}
                    aria-label="Error 404"
                    className="mb-6 flex items-center gap-2 text-[7rem] font-black leading-none tracking-tight
                        text-foreground sm:text-[10rem]"
                >
                    <span aria-hidden="true">4</span>
                    <BrokenDownCar />
                    <span aria-hidden="true">4</span>
                </motion.p>

                <motion.h1
                    variants={fadeUp}
                    className="mb-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
                >
                    This page doesn't exist.
                </motion.h1>

                <motion.p variants={fadeUp} className="text-xs text-muted-foreground sm:text-base">
                    The link may be broken or the page may have been moved or removed.
                </motion.p>
            </div>
        </motion.div>
    );
};

export default NotFound;