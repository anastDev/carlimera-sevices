import { Link, useLocation } from "react-router";
import type {ElementType} from "react";

export const NavDesktop = ({ routes }: { routes: Array<{ title: string; path: string; Icon: ElementType }> }) => {
    const { pathname } = useLocation();

    return (
        <ul className="hidden lg:flex items-center bg-primary border border-primary/40 rounded-full px-1.5 py-1 gap-0.5 backdrop-blur-md shadow-lg">
            {routes.map(({ title, path, Icon }) => {
                const isActive = pathname === path;
                return (
                    <li key={title} className="relative">
                        <Link
                            to={path}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                isActive
                                    ? "text-teal-400 bg-blue-900/40"
                                    : "text-slate-300 hover:text-teal-400 hover:bg-blue-900/20"
                            }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {title}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};