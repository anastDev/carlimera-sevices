import { useState} from "react";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea";
import {MapPin, Phone, Mail, CalendarDays, Clock, User, Loader2} from "lucide-react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/smoothui/breadcrumb";
import {container, fadeUp} from "@/utils/transitions.ts";
import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {contactFormSchema, type ContactFormValues} from "@/schemas/user.schema.ts";
import {
    Field,
    FieldError,
    FieldGroup,
} from "@/components/ui/field";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx";
import {sendContactMessage} from "@/services/api.contact.ts";
import Seo from "@/components/Seo.tsx";
import HiddenSanta from "@/components/festive/HiddenSanat.tsx";

const items = [
    { label: "Home", value: "/" },
    { label: "Contact Us" },
];

export const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            message: "",
            website: "",
        },
    });

    const onHandleSubmit = async (data: ContactFormValues) => {
        setSubmitError(null);
        setSubmitted(false);

        try {
            await sendContactMessage({
                fullName: data.fullName,
                email: data.email,
                message: data.message,
                website: data.website,
            });

            setSubmitted(true);
            reset();
        } catch (err) {
            setSubmitError(
                err instanceof Error
                    ? err.message
                    : "We couldn't send your message. Please email or call us directly.",
            );
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="container mx-auto max-w-7xl px-4 pb-10 mt-12 sm:mt-20 sm:px-6 lg:px-8"
        >
            <Seo
                title="Contact Us – Visit Our Coventry Dealership"
                description="Find CARlimera Services at Opp 115 Max Road, Coventry CV6 1EL. Call 07469 292183 or send us a message. Open Monday to Saturday, 9am to 6pm."
                path="/contact-us"
            />

            <Breadcrumb items={items} className="hover:text-primary" />

            <motion.h1 variants={fadeUp} className="my-6 text-3xl font-bold text-foreground">
                Contact Us
            </motion.h1>

            <motion.div variants={fadeUp} className="w-full">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">

                    {/* Contact details */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Address */}
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border shadow-sm dark:shadow-black/30">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Address</p>
                                    <p className="text-sm text-foreground font-medium mt-1">
                                        CARlimera Services Ltd, Opp 115 Max Road, Coventry CV6 1EL
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {/* Phone */}
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border shadow-sm dark:shadow-black/30">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone</p>
                                        <a
                                            href="tel:07469292183"
                                            className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
                                        >
                                            07469 292183
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border shadow-sm dark:shadow-black/30">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email</p>
                                        <a
                                            href="mailto:kalimeraservices@gmail.com"
                                            className="block truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
                                        >
                                            kalimeraservices@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="rounded-lg border border-border bg-card p-5 space-y-4 shadow-sm dark:shadow-black/30">
                            <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                                </span>
                                Business Hours
                            </h2>

                            <div className="divide-y divide-border text-sm font-medium text-muted-foreground">
                                <div className="flex justify-between py-2">
                                    <span>Monday – Saturday</span>
                                    <span className="font-semibold text-foreground">9:00 AM – 6:00 PM</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span>Sunday</span>
                                    <span className="font-semibold text-foreground"><HiddenSanta id="contact" className="pr-1.5"/> Closed</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs leading-relaxed text-foreground dark:bg-primary/10">
                                <CalendarDays className="h-4 w-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                                <span>
                                    We advise booking an appointment before visiting to guarantee staff availability and car preparation.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-5 h-full">
                        <form
                            onSubmit={handleSubmit(onHandleSubmit)}
                            className="relative bg-card p-6 rounded-lg border border-border shadow-sm h-full flex flex-col dark:shadow-black/30"
                        >
                            <h2 className="text-lg font-bold text-foreground mb-4">Send your inquiry</h2>

                            <div className="flex flex-col flex-1 justify-between">
                                <div className="flex flex-col gap-4">
                                    <FieldGroup>
                                        <Controller
                                            name="fullName"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <InputGroup>
                                                        <InputGroupAddon>
                                                            <User className="h-4 w-4 text-muted-foreground" />
                                                        </InputGroupAddon>
                                                        <InputGroupInput
                                                            {...field}
                                                            id="name"
                                                            placeholder="Your name"
                                                            aria-label="Your name"
                                                            aria-invalid={fieldState.invalid}
                                                            autoComplete="name"
                                                            required
                                                        />
                                                    </InputGroup>
                                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                </Field>
                                            )}
                                        />

                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <InputGroup>
                                                        <InputGroupAddon>
                                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                                        </InputGroupAddon>
                                                        <InputGroupInput
                                                            {...field}
                                                            id="email"
                                                            type="email"
                                                            placeholder="Email address"
                                                            aria-label="Email address"
                                                            aria-invalid={fieldState.invalid}
                                                            autoComplete="email"
                                                            required
                                                        />
                                                    </InputGroup>
                                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                </Field>
                                            )}
                                        />
                                    </FieldGroup>

                                    <Textarea
                                        placeholder="Message"
                                        aria-label="Message"
                                        rows={6}
                                        {...register("message")}
                                        className="bg-background border-input mb-2 flex-1 min-h-[7.5rem] focus-visible:border-primary focus-visible:ring-primary/30"
                                        required
                                    />

                                    {/* Honeypot */}
                                    <div className="absolute -left-[9999px]" aria-hidden="true">
                                        <label htmlFor="website">Website</label>
                                        <input
                                            {...register("website")}
                                            id="website"
                                            type="text"
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 mt-auto">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 rounded-lg font-bold transition-colors cursor-pointer shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                                                Sending…
                                            </span>
                                        ) : (
                                            "Send"
                                        )}
                                    </Button>

                                    {submitted && (
                                        <p
                                            role="status"
                                            className="text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center
                                                dark:text-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-900"
                                        >
                                            Thank you! Your message has been sent. We'll reply as soon as possible.
                                        </p>
                                    )}
                                    {submitError && (
                                        <p
                                            role="alert"
                                            className="text-sm font-semibold text-red-800 bg-red-50 border border-red-200 rounded-lg p-3 text-center
                                                dark:text-red-300 dark:bg-red-950/40 dark:border-red-900"
                                        >
                                            {submitError}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>

            {/* Map */}
            <motion.div variants={fadeUp} className="overflow-hidden rounded-lg mt-8 border border-border shadow-sm">
                <iframe
                    className="h-90 w-full border-0 transition-[filter] duration-500
            dark:[filter:invert(90%)_hue-rotate(180deg)_brightness(95%)_contrast(90%)]"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.2437565793844!2d-1.5372828877522882!3d52.420380871918546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48774c08fbaff867%3A0xb66d3518ab6782c2!2sCARlimera%20Services!5e0!3m2!1sen!2sse!4v1786794072049!5m2!1sen!2sse"
                    title="CARlimera Services location"
                    loading="lazy"
                />
            </motion.div>
        </motion.div>
    );
};

export default ContactPage;