import { Link } from "react-router";
import {Car, SquarePlay} from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-brand-dark py-12 mt-4">
            <div className="container mx-auto max-w-7xl px-8 sm:px-12 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">

                    {/* Dealership Description & Contact Info */}
                    <div className="flex flex-col space-y-4">
                        <div className="space-y-2">
                           <div className="space-y-1">
                               <div className="flex flex-row items-center space-x-2 mb-2">
                                   <img className="w-8 rounded-sm bg-gray-100" src="/carlimera-logo.png" alt="CARlimera Logo"/>
                                   <h3 className="text-base font-bold text-slate-100">Carlimera Services Ltd</h3>
                               </div>
                               <p className="text-sm text-slate-200/90 leading-relaxed">
                                   Carlimera Services Ltd is a Coventry second-hand car dealership offering quality vehicles, flexible finance, part exchange and UK-wide delivery with transparent, reliable service.
                               </p>
                           </div>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-300">
                            <p className="leading-relaxed">
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=CARlimera+Services+Coventry"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white inline-block"
                                    title="Navigate to CARlimera Services on Google Maps"
                                >
                                    Opp 115 Max Road, Coventry, West Midlands, CV6 1EL
                                </a>
                            </p>
                            <p className="flex items-center gap-1.5 flex-wrap">
                                <a
                                    href="tel:07469292183"
                                    className="text-sm font-semibold hover:text-white transition-colors"
                                >
                                    07469 292183
                                </a>
                                <span>&middot;</span>
                                <a
                                    href="mailto:kalimeraservices@gmail.com"
                                    className="hover:text-white underline underline-offset-2 transition-colors"
                                >
                                    kalimeraservices@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Useful Links Navigation */}
                    <div className="flex flex-col items-start sm:items-center space-y-2">
                      <div className="space-y-3">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                              Useful Links
                          </h4>
                          <nav className="flex flex-col gap-2.5 text-sm font-semibold">
                              <Link to="/cars" className="text-slate-300 hover:text-white transition-colors">
                                  Browse Cars
                              </Link>
                              <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                                  About Us
                              </Link>
                              <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
                                  Contact
                              </Link>
                          </nav>

                          <p className="flex flex-row items-center space-x-2">
                              <span className="text-slate-300 text-sm font-semibold">Find us on: </span>
                              <a
                              href="https://www.youtube.com/@CARlimeraServices"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                              title="Follow our virtual car walkarounds on YouTube"
                          >
                              <SquarePlay className="w-5 h-5 text-slate-300 group-hover:white transition-colors" />
                          </a>
                              <a
                                  className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                                  href="https://www.autotrader.co.uk/dealers/warwickshire/coventry/carlimera-services-10035432?channel=cars"
                                  title="Find us on AutoTrader UK"
                                  target="_blank"
                              >
                                  <Car />
                              </a>
                          </p>
                      </div>

                    </div>

                    {/* Business Hours */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                            Business Hours
                        </h4>
                        <div className="flex flex-col gap-2 text-sm font-medium text-slate-200/90">
                            <div className="flex justify-between border-b border-blue-900/40 pb-1.5">
                                <span>Mon – Fri</span>
                                <span className="text-slate-100 font-semibold">9:00 AM – 6:00 PM</span>
                            </div>
                            <div className="flex justify-between pb-1">
                                <span>Sunday</span>
                                <span className="text-slate-100 font-semibold">14:00 PM – 6:00 PM</span>
                            </div>
                            <p className="text-xs text-slate-300/80 font-normal italic mt-1 leading-normal">
                                * We advise booking an appointment before visiting to guarantee availability.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="flex justify-between items-center text-xs text-slate-300/80 border-t border-slate-100/40 pt-6">
                    <p>&copy; {new Date().getFullYear()} CARlimera Services Ltd. All rights reserved.</p>
                    <p className="hidden sm:block">Developed by anastDev</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;