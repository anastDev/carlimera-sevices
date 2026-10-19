import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Loader2, MapPin, Phone, Truck } from "lucide-react";
import {type DeliveryQuote, getDeliveryQuote} from "@/services/api.delivery.ts";

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const PHONE_DISPLAY = "07469 292183";
const PHONE_LINK = "tel:07469292183";

const formatGBP = (amount: number) =>
    amount.toLocaleString("en-GB", { style: "currency", currency: "GBP" });

interface DeliveryEstimatorProps {
    compact?: boolean;
}

export const DeliveryEstimator = ({ compact = false }: DeliveryEstimatorProps) => {
    const [postcode, setPostcode] = useState("");
    const [quote, setQuote] = useState<DeliveryQuote | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputId = compact ? "delivery-postcode-compact" : "delivery-postcode";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setQuote(null);

        const trimmed = postcode.trim();
        if (!UK_POSTCODE.test(trimmed)) {
            setError("Enter a full UK postcode, e.g. CV6 1EL");
            return;
        }

        setIsLoading(true);
        try {
            setQuote(await getDeliveryQuote(trimmed));
        } catch {
            setError("We couldn't find that postcode. Please check it and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} noValidate className="space-y-2">
                <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
                    {compact ? "Delivery to your postcode" : "Your postcode"}
                </label>

                <div className={`flex gap-2 ${compact ? "flex-row" : "flex-col sm:flex-row"}`}>
                    <div className="relative flex-1">
                        <MapPin
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                        />
                        <input
                            id={inputId}
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            placeholder="e.g. CV6 1EL"
                            autoComplete="postal-code"
                            aria-invalid={!!error}
                            className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm uppercase
                                focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm
                            font-semibold text-primary-foreground transition-colors hover:bg-primary/90
                            disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                        {isLoading ? "Checking…" : compact ? "Check" : "Get estimate"}
                    </button>
                </div>

                {error ? (
                    <p role="alert" className="text-sm text-red-600">{error}</p>
                ) : (
                    <p className="text-xs text-muted-foreground">
                        First 10 miles free. We don't store your postcode.
                    </p>
                )}
            </form>

            {quote && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    aria-live="polite"
                    className="rounded-lg bg-border/30 p-4 space-y-3"
                >
                    {quote.available ? (
                        <>
                            <div className="flex items-start gap-3">
                                <Truck className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Estimated delivery
                                    </p>
                                    <p className={`font-black text-foreground ${compact ? "text-2xl" : "text-3xl"}`}>
                                        {quote.estimated_cost === 0 ? "Free" : formatGBP(quote.estimated_cost)}
                                    </p>
                                </div>
                            </div>

                            <dl className="divide-y divide-border/60 rounded-lg bg-background px-3 py-2 text-sm">
                                <div className="flex justify-between py-1.5">
                                    <dt className="text-muted-foreground">Approx. distance</dt>
                                    <dd className="font-semibold text-foreground">{quote.estimated_miles} miles</dd>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <dt className="text-muted-foreground">Free</dt>
                                    <dd className="font-semibold text-foreground">first {quote.free_miles} miles</dd>
                                </div>
                                {quote.chargeable_miles > 0 && (
                                    <div className="flex justify-between py-1.5">
                                        <dt className="text-muted-foreground">Charged</dt>
                                        <dd className="font-semibold text-foreground">
                                            {quote.chargeable_miles} mi × {formatGBP(quote.price_per_mile)}
                                        </dd>
                                    </div>
                                )}
                            </dl>

                            <p className="text-xs text-muted-foreground">
                                <strong className="text-foreground">This is an estimate, not a final price.</strong>{" "}
                                It's based on approximate road distance. The actual cost depends on the
                                vehicle and our driver's route, so please call to confirm.
                            </p>
                        </>
                    ) : quote.reason === "too_far" ? (
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">
                                That's further than we usually deliver
                            </p>
                            <p className="text-sm text-muted-foreground">
                                You're around {quote.estimated_miles} miles away. We may still be able to
                                arrange it, so give us a call.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">Online estimates are paused</p>
                            <p className="text-sm text-muted-foreground">
                                Call us and we'll give you a delivery price directly.
                            </p>
                        </div>
                    )}

                    <div className={`flex gap-2 ${compact ? "flex-col" : "flex-col sm:flex-row"}`}>
                        <a
                            href={PHONE_LINK}
                            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm
                                font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            <Phone className="h-4 w-4" aria-hidden="true" />
                            Call to confirm · {PHONE_DISPLAY}
                        </a>
                        {!compact && (
                            <Link
                                to="/contact-us"
                                className="flex items-center justify-center rounded-lg border border-border bg-background
                                    px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                            >
                                Send a message
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default DeliveryEstimator;