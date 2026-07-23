import { Link } from "react-router";
import {Car, SquarePlay} from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-brand-dark py-12 mt-4">
            <div className="container mx-auto max-w-7xl px-8 sm:px-14 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">

                    {/* Dealership Description & Contact Info */}
                    <div className="flex flex-col space-y-4">
                        <div className="space-y-2">
                           <div className="space-y-1">
                               <div className="flex flex-row items-center space-x-2 mb-2">
                                   <img className="w-8 rounded-sm bg-background" src="/carlimera-logo.png" alt="CARlimera Logo"/>
                                   <h3 className="text-base font-bold text-primary-foreground">Carlimera Services Ltd</h3>
                               </div>
                               <p className="text-sm text-primary-foreground/70 leading-relaxed">
                                   Carlimera Services Ltd is a Coventry second-hand car dealership offering quality vehicles, flexible finance, part exchange and UK-wide delivery with transparent, reliable service.
                               </p>
                           </div>
                        </div>

                        <div className="space-y-1.5 text-xs text-primary-foreground/70">
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
                                <span className="text-primary-foreground/40">&middot;</span>
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
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                              Useful Links
                          </h4>
                          <nav className="flex flex-col gap-2.5 text-sm font-semibold">
                              <Link to="/cars" className="text-primary-foreground/70 hover:text-primary transition-colors">
                                  Browse Cars
                              </Link>
                              <Link to="/about" className="text-primary-foreground/70 hover:text-primary transition-colors">
                                  About Us
                              </Link>
                              <Link to="/contact" className="text-primary-foreground/70 hover:text-primary transition-colors">
                                  Contact
                              </Link>
                          </nav>

                          <p className="flex flex-row items-center space-x-2">
                              <span className="text-primary-foreground/70 text-sm font-semibold">Find us on: </span>
                              <a
                              href="https://www.youtube.com/@CARlimeraServices"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-primary-foreground/70 hover:text-primary transition-colors"
                              title="Follow our virtual car walkarounds on YouTube"
                          >
                              <SquarePlay className="w-5 h-5 " />
                          </a>
                              <a
                                  className="text-xs font-semibold text-primary-foreground/70 hover:text-primary transition-colors"
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
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                            Business Hours
                        </h4>
                        <div className="flex flex-col gap-2 text-sm font-medium">
                            <div className="flex justify-between border-b border-primary-foreground/10 pb-1.5">
                                <span className="text-primary-foreground/70">Mon – Sat</span>
                                <span className="text-primary-foreground font-semibold">9:00 AM – 6:00 PM</span>
                            </div>
                            <div className="flex justify-between pb-1">
                                <span className="text-primary-foreground/70">Sunday</span>
                                <span className="text-primary-foreground font-semibold">Closed</span>
                            </div>
                            <p className="text-xs text-primary-foreground/50 font-normal italic mt-1 leading-normal">
                                * We advise booking an appointment before visiting to guarantee availability.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="flex justify-between items-center text-xs text-primary-foreground/50 border-t border-primary-foreground/10 pt-6">
                    <p>&copy; {new Date().getFullYear()} CARlimera Services Ltd. All rights reserved.</p>
                    <p className="hidden sm:block">Developed by anastDev</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;