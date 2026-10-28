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
            className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-brand-dark shadow-[0_-4px_20px_rgba(0,0,0,0.25)]"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
            <div className="container mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6 lg:px-8">
                <p className="text-sm leading-relaxed text-white/90 sm:flex-1">
                    We use analytics cookies to see which cars people view and improve our site.
                    No ads, no tracking across other sites.{" "}
                    <Link
                        to="/privacy"
                        className="font-semibold text-white underline underline-offset-2 hover:text-primary"
                    >
                        Privacy policy
                    </Link>
                </p>

                <div className="grid grid-cols-2 gap-3 sm:flex sm:shrink-0">
                    <button
                        type="button"
                        onClick={() => choose(false)}
                        className="min-h-11 rounded-md border border-white/40 px-5 text-sm font-semibold text-white
                            transition-colors hover:bg-white/10
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        Decline
                    </button>
                    <button
                        type="button"
                        onClick={() => choose(true)}
                        className="min-h-11 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground
                            transition-colors hover:bg-primary/90
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentBanner;