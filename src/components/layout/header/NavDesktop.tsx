import { Link, useLocation } from "react-router";
import {type ElementType} from "react";
import { motion} from "framer-motion";

export const NavDesktop = ({ routes }: { routes: Array<{ title: string; path: string; Icon: ElementType }> }) => {
    const { pathname } = useLocation();

    return (
        <ul className="hidden lg:flex items-center bg-card border border-border rounded-full px-1.5 py-2 gap-0.5 shadow-md shadow-brand-dark/10">
            {routes.map(({ title, path, Icon }) => {
                const isActive = pathname === path;
                return (
                    <li key={title} className="relative">
                        <Link to={path} className="relative flex items-center">
                            {isActive && (
                                <motion.div
                                    layoutId="nav-glass-pill"
                                    className="absolute inset-0 rounded-full bg-secondary/70 backdrop-blur-md"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <motion.span
                                whileTap={{ scale: 0.94 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                className={`relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-primary"
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {title}
                            </motion.span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};