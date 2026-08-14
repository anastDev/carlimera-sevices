import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarX, CheckCircle, Loader2, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {Link, useParams} from "react-router";
import {cancelBooking} from "@/services/api.appointment.ts";
import {toast} from "sonner";

type CancelState = "idle" | "loading" | "done" | "error";

const BUSINESS_PHONE = "07469 292183";

export const CancelBookingPage = () => {
    const { token } = useParams<{ token: string }>();
    const [state, setState] = useState<CancelState>("idle");
    const [message, setMessage] = useState("");

    const handleCancel = async () => {
        if (!token) return;

        setState("loading");
        try {
            const result = await cancelBooking(token);
            setMessage(result.message);
            setState("done");
        } catch (err) {
            toast.error("Something went wrong. Try again later.");
            setMessage(err instanceof Error ? err.message : "Something went wrong.");
            setState("error");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto flex min-h-[60vh] w-full max-w-md items-center"
        >
            <div className="w-full rounded-xl border border-border bg-background p-8 text-center shadow-sm">
                {state === "done" ? (
                    <>
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
                            <CheckCircle className="h-7 w-7 text-teal-700" aria-hidden="true" />
                        </div>
                        <h1 className="text-xl font-semibold text-foreground">Booking cancelled</h1>
                        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
                        <p className="mt-4 text-sm text-muted-foreground">
                            We've sent you a confirmation by email.
                        </p>
                        <Link
                            to="/cars"
                            className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
                        >
                            Browse our cars
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
                            <CalendarX className="h-7 w-7 text-amber-700" aria-hidden="true" />
                        </div>
                        <h1 className="text-xl font-semibold text-foreground">Cancel your booking?</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            This frees the slot for someone else. You're welcome to book
                            another time whenever suits you.
                        </p>

                        {state === "error" && (
                            <div
                                role="alert"
                                className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-800"
                            >
                                <p>{message}</p>
                                <a
                                    href={`tel:${BUSINESS_PHONE.replace(/\s/g, "")}`}
                                    className="mt-2 inline-flex items-center gap-1.5 font-semibold hover:underline"
                                >
                                    <Phone className="h-4 w-4" aria-hidden="true" />
                                    {BUSINESS_PHONE}
                                </a>
                            </div>
                        )}

                        <Button
                            onClick={handleCancel}
                            disabled={state === "loading"}
                            variant="destructive"
                            className="mt-6 w-full gap-2"
                        >
                            {state === "loading" && (
                                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            )}
                            {state === "loading" ? "Cancelling…" : "Yes, cancel my booking"}
                        </Button>

                        <Link
                            to="/"
                            className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground"
                        >
                            Keep my booking
                        </Link>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default CancelBookingPage;