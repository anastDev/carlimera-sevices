import { Link, useLocation } from "react-router";
import type {ElementType} from "react";

export const NavMobile = ({ routes }: { routes: Array<{ title: string; path: string; Icon: ElementType }> }) => {
    const { pathname } = useLocation();

    return (
        <nav className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
            <ul className="flex items-center justify-around bg-primary/90 border border-primary/40 rounded-full p-2 backdrop-blur-sm shadow-lg">
                {routes.map(({ title, path, Icon }) => {
                    const isActive = pathname === path;
                    return (
                        <li key={title} className="flex-1">
                            <Link
                                to={path}
                                className={`flex flex-col items-center justify-center py-1.5 gap-1 rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? "text-teal-400"
                                        : "text-slate-400 active:text-teal-400 active:bg-blue-900/20"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {isActive && (
                                    <span className="w-2 h-0.5 rounded-full bg-teal-400 shadow-sm shadow-teal-400 " />
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavMobile;