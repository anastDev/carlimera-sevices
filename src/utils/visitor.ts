const CONSENT_KEY = "analytics_consent";
const VISITOR_KEY = "visitor_id";

export type ConsentState = "granted" | "declined" | null;

export function getConsent(): ConsentState {
    try {
        return localStorage.getItem(CONSENT_KEY) as ConsentState;
    } catch {
        return null;
    }
}

export function setConsent(granted: boolean): void {
    try {
        localStorage.setItem(CONSENT_KEY, granted ? "granted" : "declined");
        if (!granted) localStorage.removeItem(VISITOR_KEY);
    } catch {
    }
}

export function getVisitorId(): string | null {
    if (getConsent() !== "granted") return null;

    try {
        let id = localStorage.getItem(VISITOR_KEY);
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem(VISITOR_KEY, id);
        }
        return id;
    } catch {
        return null;
    }
}