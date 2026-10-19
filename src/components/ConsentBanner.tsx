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
            className="fixed bottom-0 inset-x-0 z-50 bg-brand-dark border-t border-primary-foreground/10"
        >
            <div className="container mx-auto max-w-7xl px-8 sm:px-14 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="text-sm text-primary-foreground/80 flex-1">
                    We use small analytics cookies to see which cars people view and improve our site.
                    No ads, no tracking across other sites. {" "}
                    <Link to="/privacy" className="underline hover:text-primary">
                        Privacy policy
                    </Link>
                </p>

                <div className="flex gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={() => choose(false)}
                        className="px-5 py-2 text-sm font-semibold rounded-md border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        type="button"
                        onClick={() => choose(true)}
                        className="px-5 py-2 text-sm font-semibold rounded-md bg-primary text-brand-dark hover:opacity-90 transition-colors"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentBanner;