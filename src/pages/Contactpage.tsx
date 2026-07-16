import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {MapPin, Phone, Mail, CalendarDays, Clock} from "lucide-react";


export const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="mb-6 text-3xl font-extrabold text-gray-900">Contact Us</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

                {/* Left Column: Contact details & Form */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                            <MapPin size={24} className="mt-0.5 text-teal-800 flex-shrink-0" aria-hidden="true" />
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address</h4>
                                <p className="text-sm text-gray-800 font-medium mt-1">CARlimera Services Ltd, Opp 115 Max Road, Coventry CV6 1EL</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                                <Phone size={20} className="text-teal-800 flex-shrink-0" aria-hidden="true" />
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</h4>
                                    <a href="tel:07469292183" className="text-sm font-semibold text-teal-850 hover:text-teal-700 transition-colors">
                                        07469 292183
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                                <Mail size={20} className="text-teal-800 flex-shrink-0" aria-hidden="true" />
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</h4>
                                    <a href="mailto:kalimeraservices@gmail.com" className="text-sm font-semibold text-teal-850 hover:text-teal-700 transition-colors block truncate max-w-[12.5rem]">
                                        kalimeraservices@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Send your inquiry</h3>
                        <div className="flex flex-col gap-4">
                            <Input placeholder="Your name" required className="bg-gray-50 border-gray-300 focus:border-teal-700 focus:ring-teal-700" />
                            <Input type="email" placeholder="Email Address" required className="bg-gray-50 border-gray-300 focus:border-teal-700 focus:ring-teal-700" />
                            <Textarea placeholder="Message" rows={5} required className="bg-gray-50 border-gray-300 focus:border-teal-700 focus:ring-teal-700" />

                            <Button type="submit" className="bg-teal-800 text-white hover:bg-teal-900 py-5 rounded-xl font-bold transition-colors cursor-pointer shadow-sm">
                                Send
                            </Button>
                            {submitted && (
                                <p className="text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                                    Thank you! Your message has been sent. We'll reply as soon as possible.
                                </p>
                            )}
                        </div>
                    </form>
                </div>

                {/* Right Column: Map & Work Hours */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    {/* Operating Hours Box */}
                    <div className="rounded-lg border border-teal-100/40 shadow-md bg-teal-50/20 p-5 space-y-4">
                        <h3 className="text-base font-bold text-teal-950 flex items-center">
                            <Clock className="mr-2 h-5 w-5 text-teal-800" />
                            Business Hours
                        </h3>
                        <div className="divide-y divide-teal-100/60 text-sm font-medium text-gray-800">
                            <div className="flex justify-between py-2">
                                <span>Monday – Friday</span>
                                <span className="font-semibold text-gray-900">9:00 AM – 6:00 PM</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span>Saturday</span>
                                <span className="font-semibold text-gray-900">9:00 AM – 6:00 PM</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span>Sunday</span>
                                <span className="font-semibold text-teal-800">Appointment Only</span>
                            </div>
                        </div>
                        <div className="flex items-start bg-white/70 border border-teal-100/50 rounded-lg p-2.5 text-xs text-teal-950 leading-relaxed">
                            <CalendarDays className="mr-2 h-4.5 w-4.5 flex-shrink-0 text-teal-800 mt-0.5" />
                            <span>We advise booking an appointment before visiting to guarantee staff availability and car preparation.</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ContactPage;