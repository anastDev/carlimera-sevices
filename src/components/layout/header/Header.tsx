import NavMobile from "@/components/layout/header/NavMobile.tsx";
import {NavDesktop} from "@/components/layout/header/NavDesktop.tsx";
import { staticRoutes } from "./staticRoutes";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 pt-8 h-20 pb-8 backdrop-blur-sm">
            <div className="container mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center justify-center">
                <nav>
                    <NavDesktop routes={staticRoutes} />
                    <NavMobile routes={staticRoutes} />
                </nav>
            </div>
        </header>
    );
};

export default Header;