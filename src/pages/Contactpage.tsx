import {type ChangeEvent, useState} from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {MapPin, Phone, Mail, CalendarDays, Clock} from "lucide-react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/smoothui/breadcrumb";
import {container, fadeUp} from "@/utils/transitions.ts";

const items = [
    {label: "Home", value: "/"},
    {label: "Contact"}
];

export const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="container mx-auto max-w-7xl px-4 pb-10 mt-12 sm:mt-20 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <Breadcrumb items={items} className="hover:text-primary">

            </Breadcrumb>

            <motion.h1 variants={fadeUp} className="my-6 text-3xl font-extrabold text-foreground">Contact Us</motion.h1>

            <motion.div variants={fadeUp} className="w-full">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">

                    {/* Contact details */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div
                                className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border shadow-sm">
                                <MapPin size={24} className="mt-0.5 text-primary flex-shrink-0"/>
                                <div>
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Address</h4>
                                    <p className="text-sm text-foreground/80 font-medium mt-1">CARlimera Services Ltd,
                                        Opp 115 Max Road, Coventry CV6 1EL</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div
                                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border shadow-sm">
                                    <Phone size={20} className="text-primary flex-shrink-0" aria-hidden="true"/>
                                    <div>
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone</h4>
                                        <a href="tel:07469292183"
                                           className="text-sm font-semibold text-foreground/80 transition-colors">
                                            07469 292183
                                        </a>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border shadow-sm">
                                    <Mail size={20} className="text-primary flex-shrink-0"/>
                                    <div>
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email</h4>
                                        <a href="mailto:kalimeraservices@gmail.com"
                                           className="text-sm font-semibold text-foreground/80 transition-colors block truncate max-w-[12.5rem]">
                                            kalimeraservices@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="rounded-lg shadow-sm bg-border/30 p-5 space-y-4">
                            <h3 className="text-base font-bold text-foreground/80 flex items-center">
                                <Clock className="mr-2 h-5 w-5 text-primary/80"/>
                                Business Hours
                            </h3>
                            <div className="divide-y divide-border/60 text-sm font-medium text-muted-foreground">
                                <div className="flex justify-between py-2">
                                    <span>Monday – Saturday</span>
                                    <span className="font-semibold text-foreground">9:00 AM – 6:00 PM</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span>Saturday</span>
                                    <span className="font-semibold text-foreground">Closed</span>
                                </div>
                            </div>
                            <div
                                className="flex items-center bg-background/70 border border-border/50 rounded-lg p-2.5 text-xs text-primary/80 leading-relaxed">
                                <CalendarDays className="mr-2 h-4.5 w-4.5 flex-shrink-0 mt-0.5"/>
                                <span>We advise booking an appointment before visiting to guarantee staff availability and car preparation.</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-5 h-full">
                        <form onSubmit={handleSubmit}
                              className="bg-background p-6 rounded-lg border border-border shadow-sm h-full flex flex-col">
                            <h3 className="text-lg font-bold text-foreground mb-4">Send your inquiry</h3>

                            <div className="flex flex-col gap-4 flex-1 justify-between">
                                <div className="flex flex-col gap-4">
                                    <Input placeholder="Your name" required
                                           className="bg-gray-50 border-gray-300 focus:border-teal-700 focus:ring-teal-700"/>
                                    <Input type="email" placeholder="Email Address" required
                                           className="bg-gray-50 border-gray-300 focus:border-teal-700 focus:ring-teal-700"/>
                                    <Textarea placeholder="Message" rows={6}
                                              className="bg-gray-50 border-gray-300 focus:border-teal-700 focus:ring-teal-700 flex-1 min-h-[120px]"
                                              required/>
                                </div>

                                <div className="space-y-4 mt-auto">
                                    <Button type="submit"
                                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 rounded-xl font-bold transition-colors cursor-pointer shadow-sm">
                                        Send
                                    </Button>
                                    {submitted && (
                                        <p className="text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                                            Thank you! Your message has been sent. We'll reply as soon as possible.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </motion.div>

            {/* Embedded Map Container */}
            <motion.div variants={fadeUp} className="overflow-hidden rounded-xl mt-8 shadow-sm">
                <iframe
                    className="h-90 w-full border-0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.24375657295!2d-1.537277522133567!3d52.42038087203514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48774c08fbaff867%3A0xb66d3518ab6782c2!2sCARlimera%20Services!5e0!3m2!1sel!2sse!4v1784721329039!5m2!1sel!2sse"
                    title="CARlimera Services location"
                />
            </motion.div>
        </motion.div>
    );
}

export default ContactPage;