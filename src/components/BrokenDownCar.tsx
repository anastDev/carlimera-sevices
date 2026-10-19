import {motion, useReducedMotion} from "motion/react";
import {CarFront, TriangleAlert} from "lucide-react";

const SMOKE_PUFFS = [
    { x: -10, delay: 0 },
    { x: 4, delay: 0.7 },
    { x: 14, delay: 1.4 },
];

const BrokenDownCar = () => {
    const reduceMotion = useReducedMotion();

    return (
        <span
            role="img"
            aria-label="Broken-down car"
            className="relative inline-flex h-[0.85em] w-[0.85em] items-center justify-center align-middle"
        >
            {/* Smoke */}
            {!reduceMotion &&
                SMOKE_PUFFS.map((puff) => (
                    <motion.span
                        key={puff.delay}
                        aria-hidden="true"
                        className="absolute top-[18%] h-[0.12em] w-[0.12em] rounded-full bg-muted-foreground/40"
                        style={{ left: `calc(50% + ${puff.x}px)` }}
                        initial={{ opacity: 0, y: 0, scale: 0.6 }}
                        animate={{ opacity: [0, 0.8, 0], y: -40, scale: 1.6 }}
                        transition={{
                            duration: 2.1,
                            delay: puff.delay,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    />
                ))}

            {/* Hazard light */}
            <motion.span
                aria-hidden="true"
                className="absolute -top-[0.08em] right-[0.02em] text-amber-500"
                animate={reduceMotion ? undefined : { opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
                <TriangleAlert className="h-[0.28em] w-[0.28em] fill-amber-100" strokeWidth={2.2} />
            </motion.span>

            {/* Car */}
            <motion.span
                aria-hidden="true"
                className="text-primary"
                animate={reduceMotion ? undefined : { rotate: [0, -3, 3, -2, 0], y: [0, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
                <CarFront className="h-[0.75em] w-[0.75em]" strokeWidth={1.6} />
            </motion.span>
        </span>
    );
};

export default BrokenDownCar;