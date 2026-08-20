import {errorFrom} from "@/utils/apiFetch.ts";

interface ContactPayload {
    fullName: string;
    email: string;
    message: string;
    website?: string;
}

const  VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export async function sendContactMessage(
    payload: ContactPayload,
): Promise<{ message: string }> {
    const res = await fetch(VITE_BASE_URL + "/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        throw await errorFrom(
            res,
            "We couldn't send your message. Please email or call us directly.",
        );
    }

    return res.json();
}