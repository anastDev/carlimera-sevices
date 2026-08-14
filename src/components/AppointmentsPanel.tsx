import {Calendar, CarIcon, Check, Clock, Loader2, Mail, Phone, X} from "lucide-react";
import type { AppointmentApiResponse, StatusFilter} from "@/types/typesAppointment.ts";
import ListState from "@/components/ListState.tsx";
import {useAppointments} from "@/hooks/useAppointments.ts";
import {buildCalendarUrl} from "@/utils/calendar.ts";
import {formatListedDate} from "@/utils/dates.ts";


const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "declined", label: "Declined" },
    { value: "cancelled", label: "Cancelled" },
    { value: "all", label: "All" },
];

const STATUS_STYLES: Record<AppointmentApiResponse["status"], string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-teal-50 text-teal-700 border-teal-200",
    declined: "bg-red-50 text-red-700 border-red-200",
    cancelled: "bg-muted text-muted-foreground border-border",
};

const EMPTY_MESSAGES: Record<StatusFilter, string> = {
    pending: "No pending appointments right now.",
    confirmed: "No confirmed appointments.",
    declined: "No declined appointments.",
    cancelled: "No cancellations.",
    all: "No appointments to show.",
};

interface AppointmentsPanelProps {
    onDecisionMade: () => void;
}

export const AppointmentsPanel = ({ onDecisionMade }: AppointmentsPanelProps) => {
    const {
        appointments,
        statusFilter,
        setStatusFilter,
        isLoading,
        loadError,
        pendingAction,
        actionError,
        handleDecision,
    } = useAppointments(onDecisionMade);

    return (
        <>
            <div className="mb-5 flex gap-1 overflow-x-auto rounded-lg border border-border bg-muted/40 p-1 text-sm">
                {STATUS_FILTERS.map((filter) => (
                    <button
                        key={filter.value}
                        type="button"
                        onClick={() => setStatusFilter(filter.value)}
                        aria-pressed={statusFilter === filter.value}
                        className={`shrink-0 cursor-pointer rounded-md px-3 py-1.5 font-medium transition-colors ${
                            statusFilter === filter.value
                                ? "bg-background text-teal-700 shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {actionError && (
                <div
                    role="alert"
                    className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {actionError}
                </div>
            )}

            <ListState
                isLoading={isLoading}
                error={loadError}
                isEmpty={appointments.length === 0}
                emptyMessage={EMPTY_MESSAGES[statusFilter]}
            />

            <div className="flex flex-col gap-4">
                {appointments.map((appointment) => {
                    const isRowBusy = pendingAction?.id === appointment.id;

                    return (
                        <article
                            key={appointment.id}
                            className="flex flex-col gap-4 rounded-xl border border-border bg-background p-5
                                shadow-sm sm:flex-row sm:items-start sm:justify-between"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-semibold text-foreground">
                                        {appointment.full_name}
                                    </h3>
                                    <span
                                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium
                                            capitalize ${STATUS_STYLES[appointment.status]}`}
                                    >
                                        {appointment.status}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-4">
                                    <span className="flex items-center gap-1.5">
                                        <CarIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        {appointment.car_title ?? appointment.car_id}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        {appointment.date}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        {appointment.time_slot}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-4">
                                    <a
                                        href={`mailto:${appointment.email}`}
                                        className="flex items-center gap-1.5 transition-colors hover:text-teal-700"
                                    >
                                        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        {appointment.email}
                                    </a>
                                    <a
                                        href={`tel:${appointment.phone_number}`}
                                        className="flex items-center gap-1.5 transition-colors hover:text-teal-700"
                                    >
                                        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        {appointment.phone_number}
                                    </a>
                                </div>

                                <div className="flex flex-col gap-1 text-xs text-muted-foreground/70 sm:flex-row sm:flex-wrap sm:gap-x-4">
                                    <span>
                                        Requested {formatListedDate(appointment.created_at).toLowerCase()}
                                    </span>
                                    {appointment.status === "cancelled" && appointment.cancelled_at && (
                                        <span>
                                            Cancelled {formatListedDate(appointment.cancelled_at).toLowerCase()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {appointment.status === "pending" && (
                                <div className="flex shrink-0 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleDecision(appointment.id, "confirmed")}
                                        disabled={isRowBusy}
                                        className="flex flex-1 cursor-pointer items-center justify-center gap-1.5
                                            rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white
                                            transition-colors hover:bg-teal-700 disabled:cursor-not-allowed
                                            disabled:opacity-60 sm:flex-none"
                                    >
                                        {isRowBusy && pendingAction?.action === "confirm" ? (
                                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                                        ) : (
                                            <Check className="h-4 w-4" aria-hidden="true" />
                                        )}
                                        Accept
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDecision(appointment.id, "declined")}
                                        disabled={isRowBusy}
                                        className="flex flex-1 cursor-pointer items-center justify-center gap-1.5
                                            rounded-lg border border-border px-3 py-2 text-sm font-medium
                                            text-foreground transition-colors hover:bg-muted
                                            disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                                    >
                                        {isRowBusy && pendingAction?.action === "decline" ? (
                                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                                        ) : (
                                            <X className="h-4 w-4" aria-hidden="true" />
                                        )}
                                        Decline
                                    </button>
                                </div>
                            )}

                            {appointment.status === "confirmed" && (
                                <a
                                    href={buildCalendarUrl(appointment)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex shrink-0 items-center gap-1.5 text-sm text-teal-700 hover:underline"
                                >
                                    <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                                    Add to calendar
                                </a>
                            )}
                        </article>
                    );
                })}
            </div>
        </>
    );
};

export default AppointmentsPanel;