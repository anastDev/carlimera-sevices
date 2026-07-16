import { Link } from "react-router";

export const Footer = () => {
    return (
        <footer className="bg-blue-950 px-4 py-12 text-blue-100/90 sm:px-6 lg:px-8 border-t border-blue-900 mt-16">
            <div className="container mx-auto space-y-8">
                {/* Embedded Map Container */}
                <div className="overflow-hidden rounded-2xl border border-blue-900 shadow-inner">
                    <iframe
                        className="h-55 w-full border-0 grayscale opacity-85 hover:grayscale-0 transition-all duration-300"
                        src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=52.4066,%20-1.5122+(CARlimera)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                        title="CARlimera Services location"
                    />
                </div>

                <div className="flex flex-col justify-between gap-8 sm:flex-row border-t border-blue-900/60 pt-8">
                    <div className="flex flex-col space-y-2">
                        <p className="text-base font-bold text-white tracking-wide">CARlimera Services Ltd</p>
                        <p className="text-xs text-blue-200/90 leading-relaxed max-w-xs">
                            Opp 115 Max Road, Coventry, West Midlands, CV6 1EL
                        </p>
                        <p className="text-xs text-blue-200/90">
                            <span className="font-semibold text-white">07469 292183</span> &middot; <a href="mailto:kalimeraservices@gmail.com" className="hover:text-white underline underline-offset-2">kalimeraservices@gmail.com</a>
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-3 min-w-[120px]">

                        {/* Quick Links */}
                        <div className="flex flex-col gap-2 text-sm font-semibold">
                            <Link to="/cars" className="text-blue-100 hover:text-white transition-colors">Browse Cars</Link>
                            <Link to="/about" className="text-blue-100 hover:text-white transition-colors">About Us</Link>
                            <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>

                {/* Micro-Copyright */}
                <div className="flex justify-between items-center text-xs text-blue-300/80 border-t border-blue-900/40 pt-6">
                    <p>&copy; {new Date().getFullYear()} CARlimera Services Ltd. All rights reserved.</p>
                    <p className="hidden sm:block">Registered in England & Wales</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;