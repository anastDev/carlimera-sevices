import { Button } from "@/components/ui/button.tsx";
import {Link, NavLink} from "react-router";
interface NavbarProps {
    onBookViewing: () => void;
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-teal-800 ${
        isActive ? "text-teal-850" : "text-gray-600 hover:text-teal-800"
    }`;

export const Navbar = ({ onBookViewing }: NavbarProps) => {
    return (
        <header className="sticky top-0 left-0 right-0 z-50 pt-4 backdrop-blur-md bg-white/40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="rounded-full px-6 py-3 flex items-center justify-between shadow-md border border-gray-100 bg-white/90">
                    <Link to="/" className="focus-visible:outline-2 focus-visible:outline-teal-800">
                        <img
                            className="w-14 object-contain"
                            src="/carlimera-logo.png"
                            alt="CARlimera logo"
                        />
                    </Link>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <NavLink to="/cars" className={linkClass}>
                            Cars
                        </NavLink>
                        <NavLink to="/about" className={linkClass}>
                            About Us
                        </NavLink>
                        <NavLink to="/contact" className={linkClass}>
                            Contact
                        </NavLink>
                        <Button
                            onClick={onBookViewing}
                            className="rounded-full px-5 py-2.5 bg-teal-800 text-white hover:bg-teal-900 text-base sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                        >
                            Book viewing
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;