import { Link, useLocation } from "react-router";
import type {ElementType} from "react";
import { motion, AnimatePresence } from "framer-motion";

export const NavMobile = ({ routes }: { routes: Array<{ title: string; path: string; Icon: ElementType }> }) => {
    const { pathname } = useLocation();

    return (
        <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-50">
            <ul className="flex items-center justify-around bg-card border border-border rounded-full p-3 shadow-md shadow-brand-dark/10">
                {routes.map(({ title, path, Icon }) => {
                    const isActive = pathname === path;
                    return (
                        <li key={title} className="flex-1">
                            <Link to={path} className="relative flex justify-center">
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-glass-pill-mobile"
                                        className="absolute inset-0 mx-auto h-10 w-10 rounded-full bg-secondary/70 backdrop-blur-md"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <motion.div
                                    whileTap={{ scale: 0.88 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                    className={`relative z-10 flex flex-col items-center justify-center py-1.5 gap-1 rounded-xl transition-colors duration-200 ${
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground active:text-primary"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                transition={{ duration: 0.15 }}
                                                className="w-2 h-0.5 rounded-full bg-primary"
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavMobile;