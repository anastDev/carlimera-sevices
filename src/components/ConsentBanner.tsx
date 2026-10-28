import { useState } from "react";
import { Link } from "react-router";
import {getConsent, setConsent} from "@/utils/visitor.ts";

export const ConsentBanner = () => {
    const [decided, setDecided] = useState(() => getConsent() !== null);

    if (decided) return null;

    const choose = (granted: boolean) => {
        setConsent(granted);
        setDecided(true);
    };

    return (
        <div
            role="dialog"
            aria-label="Cookie consent"
            className="fixed bottom-0 inset-x-0 z-50 bg-brand-dark border-t border-footer-foreground/10"
        >
            <div className="container mx-auto max-w-7xl px-8 sm:px-14 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="text-sm text-footer-foreground/80 flex-1">
                    We use analytics cookies to see which cars people view and improve our site.
                    No ads, no tracking across other sites.{" "}
                    <Link to="/privacy" className="underline hover:text-primary">
                        Privacy policy
                    </Link>
                </p>

                <div className="flex w-full gap-3 sm:w-auto sm:shrink-0">
                    <button
                        type="button"
                        onClick={() => choose(false)}
                        className="flex-1 rounded-md border border-footer-foreground/30 px-5 py-2.5 text-sm font-semibold text-footer-foreground
            transition-colors hover:bg-footer-foreground/10
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark
            sm:flex-none"
                    >
                        Decline
                    </button>
                    <button
                        type="button"
                        onClick={() => choose(true)}
                        className="flex-1 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground
            transition-colors hover:bg-primary/90
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark
            sm:flex-none"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentBanner;