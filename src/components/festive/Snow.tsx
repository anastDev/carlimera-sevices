import Snowfall from "react-snowfall";
import { useReducedMotion } from "motion/react";
import { isFestiveSeason } from "@/lib/festive";

export const Snow = () => {
    const reduceMotion = useReducedMotion();

    if (!isFestiveSeason() || reduceMotion) return null;

    return (
        <Snowfall
            snowflakeCount={70}
            radius={[0.6, 2.4]}
            speed={[0.4, 1.4]}
            wind={[-0.4, 0.8]}
            color="rgba(200, 225, 230, 0.85)"
            style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: "none" }}
        />
    );
};

export default Snow;