import type {AppointmentApiResponse} from "@/types/typesAppointment.ts";

const APPOINTMENT_DURATION_MINUTES = 30;
const DEALERSHIP_ADDRESS = "Opp 115 Max Road, Coventry, West Midlands, CV6 1EL"

export function buildCalendarUrl(appointment: AppointmentApiResponse): string {
    const start = new Date(`${appointment.date}T${appointment.time_slot}`);
    const end = new Date(start.getTime() + APPOINTMENT_DURATION_MINUTES * 60_000);

    const format = (d: Date) =>
        [
            d.getFullYear(),
            String(d.getMonth() + 1).padStart(2, "0"),
            String(d.getDate()).padStart(2, "0"),
            "T",
            String(d.getHours()).padStart(2, "0"),
            String(d.getMinutes()).padStart(2, "0"),
            "00",
        ].join("");

    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: `Viewing: ${appointment.full_name} — ${appointment.car_title ?? "vehicle"}`,
        dates: `${format(start)}/${format(end)}`,
        details: [
            `Customer: ${appointment.full_name}`,
            `Email: ${appointment.email}`,
            `Phone: ${appointment.phone_number}`,
            `Vehicle: ${appointment.car_title ?? "TBC"}`,
        ].join("\n"),
        location: DEALERSHIP_ADDRESS,
    });

    return `https://calendar.google.com/calendar/render?${params}`;
}