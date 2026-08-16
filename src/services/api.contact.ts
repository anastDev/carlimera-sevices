import {apiFetch, errorFrom} from "@/utils/apiFetch.ts";

interface ContactPayload {
    fullName: string;
    email: string;
    message: string;
    website?: string;
}

export async function sendContactMessage(
    payload: ContactPayload,
): Promise<{ message: string }> {
    const res = await apiFetch("/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw await errorFrom(
            res,
            "We couldn't send your message. Please email or call us directly.",
        );
    }

    return res.json();
}