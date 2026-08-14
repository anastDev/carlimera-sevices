import type {Appointment, AppointmentApiResponse, AppointmentStatus} from "@/types/typesAppointment.ts";
import {apiFetch, errorFrom} from "@/utils/apiFetch.ts";

export async function fetchAvailableSlots(carId: string, date: string): Promise<string[]> {
    const params = new URLSearchParams({ car_id: carId, appointment_date: date });

    const res = await apiFetch(`/appointments/availability?${params}`);

    if (!res.ok) throw await errorFrom(res, "Couldn't load available times.");

    const data = await res.json();
    return Array.isArray(data?.available_slots) ? data.available_slots : [];
}

export async function createAppointment(
    payload: Appointment,
): Promise<AppointmentApiResponse> {
    const res = await apiFetch("/appointments/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw await errorFrom(res, "Couldn't complete your booking.");

    return res.json();
}

export async function cancelBooking(cancelToken: string): Promise<{ message: string }> {
    const res = await apiFetch(`/appointments/cancel/${cancelToken}`, {
        method: "POST",
    });

    if (!res.ok) throw await errorFrom(res, "Couldn't cancel this booking.");

    return res.json();
}

// Admin access

export async function getAppointments(
    statusFilter: AppointmentStatus | "all",
): Promise<AppointmentApiResponse[]> {
    const query = statusFilter === "all" ? "" : `?status=${statusFilter}`;

    const res = await apiFetch(`/appointments/${query}`, {
        requiresAuth: true,
    });

    if (!res.ok) throw await errorFrom(res, "Couldn't load appointments.");

    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

export async function getPendingAppointmentCount(): Promise<number> {
    const pending = await getAppointments("pending");
    return pending.length;
}

export async function updateAppointment(
    appointmentId: string,
    decision: "confirmed" | "declined",
): Promise<AppointmentApiResponse> {
    const res = await apiFetch(`/appointments/${appointmentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        requiresAuth: true,
        body: JSON.stringify({ status: decision }),
    });

    if (!res.ok) throw await errorFrom(res, "Couldn't update this appointment.");

    return res.json();
}