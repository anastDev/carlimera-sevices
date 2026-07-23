import NavMobile from "@/components/layout/header/NavMobile.tsx";
import {NavDesktop} from "@/components/layout/header/NavDesktop.tsx";
import { staticRoutes } from "./staticRoutes";
import {useRef, useState} from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const Header = () => {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const lastY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastY.current;

        if (latest < 80) {
            setHidden(false);
        } else if (Math.abs(diff) > 4) {
            setHidden(diff > 0);
        }

        lastY.current = latest;
    });

    return (
        <motion.header
            animate={{ y: hidden ? "-120%" : "0%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 pt-8 h-23 pb-8"
        >
            <div className="container mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center justify-center">
                <nav>
                    <NavDesktop routes={staticRoutes} />
                    <NavMobile routes={staticRoutes} />
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;