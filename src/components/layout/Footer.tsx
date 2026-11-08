import { Link } from "react-router";
import {Car, SquarePlay} from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-brand-dark py-12 mt-4">
            <div className="container mx-auto max-w-7xl px-8 sm:px-14 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">

                    {/* Dealership Description & Contact Info */}
                    <div className="flex flex-col space-y-4">
                        <div className="space-y-1">
                            <div className="flex flex-row items-center space-x-2 mb-2">
                                <img className="w-8 rounded-sm bg-white" src="/carlimera-logo.png" alt="CARlimera Logo" />
                                <h3 className="text-base font-bold text-white">Carlimera Services Ltd</h3>
                            </div>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Carlimera Services Ltd is a Coventry second-hand car dealership offering quality vehicles, flexible finance, part exchange and UK-wide delivery with transparent, reliable service.
                            </p>
                        </div>

                        <div className="space-y-1.5 text-xs text-white/70">
                            <p className="leading-relaxed">
                                <a
                                    href="https://maps.app.goo.gl/WSmctXRKcSx4woJH7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block transition-colors hover:text-white"
                                    title="Navigate to CARlimera Services on Google Maps"
                                >
                                    Opp 115 Max Road, Coventry, West Midlands, CV6 1EL
                                </a>
                            </p>
                            <p className="flex items-center gap-1.5 flex-wrap">
                                <a
                                    href="tel:07469292183"
                                    className="text-sm font-semibold transition-colors hover:text-white"
                                >
                                    07469 292183
                                </a>
                                <span className="text-white/40">&middot;</span>
                                <a
                                    href="mailto:kalimeraservices@gmail.com"
                                    className="underline underline-offset-2 transition-colors hover:text-white"
                                >
                                    kalimeraservices@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Useful Links Navigation */}
                    <div className="flex flex-col items-start sm:items-center space-y-2">
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                                Useful Links
                            </h4>
                            <nav className="flex flex-col gap-2.5 text-sm font-semibold">
                                <Link to="/cars" className="text-white/70 hover:text-primary transition-colors">
                                    Browse Cars
                                </Link>
                                <Link to="/about" className="text-white/70 hover:text-primary transition-colors">
                                    About Us
                                </Link>
                                <Link to="/contact-us" className="text-white/70 hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                                <Link to="/privacy" className="text-white/70 hover:text-primary transition-colors">
                                    Privacy policy
                                </Link>
                                <Link to="/delivery" className="text-white/70 hover:text-primary transition-colors">
                                    Estimate Delivery Cost
                                </Link>
                            </nav>

                            <p className="flex flex-row items-center space-x-2">
                                <span className="text-white/70 text-sm font-semibold">Find us on:</span>
                                <a
                                    href="https://www.youtube.com/@CARlimeraServices"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-primary transition-colors"
                                    title="Follow our virtual car walkarounds on YouTube"
                                    aria-label="CARlimera Services on YouTube"
                                >
                                    <SquarePlay className="w-5 h-5" aria-hidden="true" />
                                </a>
                                <a
                                    href="https://www.autotrader.co.uk/dealers/warwickshire/coventry/carlimera-services-10035432?channel=cars"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-primary transition-colors"
                                    title="Find us on AutoTrader UK"
                                    aria-label="CARlimera Services on AutoTrader"
                                >
                                    <Car aria-hidden="true" />
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                            Business Hours
                        </h4>
                        <div className="flex flex-col gap-2 text-sm font-medium">
                            <div className="flex justify-between border-b border-white/10 pb-1.5">
                                <span className="text-white/70">Mon – Sat</span>
                                <span className="text-white font-semibold">9:00 AM – 6:00 PM</span>
                            </div>
                            <div className="flex justify-between pb-1">
                                <span className="text-white/70">Sunday</span>
                                <span className="text-white font-semibold">Closed</span>
                            </div>
                            <p className="text-xs text-white/50 font-normal italic mt-1 leading-normal">
                                * We advise booking an appointment before visiting to guarantee availability.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-white/60">
                        &copy; {new Date().getFullYear()} CARlimera Services Ltd. All rights reserved.
                    </p>
                    <p className="text-white/60">
                        Developed by{" "}
                        <a
                            href="https://anastdev.github.io/react-projects-hub/#/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-white/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
                        >
                            anastDev
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
