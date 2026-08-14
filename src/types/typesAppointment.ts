export interface AvailabilityResponse {
    date: string;
    availableSlots: string[];
}

export interface AppointmentApiResponse {
    id: string;
    car_id: string;
    car_title?: string;
    date: string;
    time_slot: string;
    full_name: string;
    email: string;
    phone_number: string;
    status: "pending" | "confirmed" | "declined" | "cancelled";
    created_at: string;
    cancelled_at?: string;
}

export interface Appointment {
    car_id: string;
    date: string;
    time_slot: string
    full_name: string
    email: string;
    phone_number: string;
}

export type AppointmentStatus = "pending" | "confirmed" | "declined" | "cancelled";

export type StatusFilter = "pending" | "confirmed" | "declined" | "cancelled" | "all";
export type PendingAction = { id: string; action: "confirm" | "decline" } | null;
