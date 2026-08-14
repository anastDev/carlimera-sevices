import SmoothButton from "@/components/smoothui/smooth-button";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingSuccessOverlayProps {
    open: boolean;
    carLabel: string;
    dateLabel: string;
    timeLabel: string;
    onDone: () => void;
}

export const BookingSuccessOverlay = ({
                                          open,
                                          carLabel,
                                          dateLabel,
                                          timeLabel,
                                          onDone,
                                      }: BookingSuccessOverlayProps) => {

    if (!open) return null;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    role="status"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background px-6 text-center"
                >
                    <div className="w-50">
                        <DotLottieReact
                            src="https://lottie.host/d2a0c131-0930-4f85-8f0d-eb24e298088f/yAo3rANrVa.json"
                            loop={false}
                            autoplay
                        />
                    </div>

                    <div className="w-full max-w-sm px-4">
                        {/* Primary Headline */}
                        <h2 className="text-xl sm:text-3xl mb-1 font-bold tracking-tight text-foreground">
                            Booking Request Received
                        </h2>

                        {/* Featured Selection Card/Badge */}
                        <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-lg bg-muted/50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground border border-border/50">
                            <span>{carLabel}</span>
                            <span className="text-primary">{dateLabel}</span>
                            <span className="text-muted-foreground">at</span>
                            <span className="text-primary">{timeLabel}</span>
                        </div>

                        {/* Sub-status with Icon */}
                        <div className="mt-2 flex flex-col items-center justify-center text-xs sm:text-sm text-muted-foreground font-medium">
                            <img className="w-35 shrink-0 text-primary" src="/carlimera-logo.png" aria-hidden="true"  alt="CARlimera services logo"/>
                            <div>We're checking availability for your requested slot.</div>
                        </div>

                        {/* Secondary Informational Notice */}
                        <p className="mt-4 text-[0.75rem] sm:text-xs text-muted-foreground/90 leading-relaxed border-t border-border/40 pt-4">
                            Please check your inbox. Your booking will be confirmed via email shortly.
                        </p>

                        {/* Action Button */}
                        <SmoothButton
                            type="button"
                            onClick={onDone}
                            className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3.5 sm:py-4 rounded-lg text-sm font-bold shadow-md transition-all cursor-pointer"
                        >
                            Go Back
                        </SmoothButton>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookingSuccessOverlay;