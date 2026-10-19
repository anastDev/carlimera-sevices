import {apiFetch, errorFrom} from "@/utils/apiFetch.ts";

export type DeliveryQuote =
    | {
    available: true;
    estimated_miles: number;
    free_miles: number;
    chargeable_miles: number;
    price_per_mile: number;
    estimated_cost: number;
}
    | {
    available: false;
    reason: "too_far" | "disabled";
    estimated_miles?: number;
};

export async function getDeliveryQuote(postcode: string): Promise<DeliveryQuote> {
    const res = await apiFetch("/delivery/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postcode }),
    });

    if (!res.ok) {
        throw await errorFrom(res, "We couldn't find that postcode. Please check it and try again.");
    }

    return res.json();
}