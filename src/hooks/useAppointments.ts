import { useState, useEffect, useCallback } from "react";
import type {AppointmentApiResponse, PendingAction, StatusFilter} from "@/types/typesAppointment.ts";
import {getAppointments, updateAppointment} from "@/services/api.appointment.ts";

export const useAppointments = (onDecisionMade?: () => void) => {
    const [appointments, setAppointments] = useState<AppointmentApiResponse[]>([]);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending");
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [pendingAction, setPendingAction] = useState<PendingAction>(null);
    const [actionError, setActionError] = useState<string | null>(null);

    const loadAppointments = useCallback(async () => {
        setIsLoading(true);
        setLoadError(null);
        try {
            const data = await getAppointments(statusFilter);
            setAppointments(Array.isArray(data) ? data : []);
        } catch (err) {
            setLoadError(err instanceof Error ? err.message : "Couldn't load appointments.");
        } finally {
            setIsLoading(false);
        }
    }, [statusFilter]);

    useEffect(() => {
        loadAppointments();
    }, [loadAppointments]);

    const handleDecision = async (
        appointmentId: string,
        decision: "confirmed" | "declined",
    ) => {
        setActionError(null);
        setPendingAction({
            id: appointmentId,
            action: decision === "confirmed" ? "confirm" : "decline",
        });

        try {
            await updateAppointment(appointmentId, decision);

            await loadAppointments();
            onDecisionMade?.();
        } catch (err) {
            setActionError(err instanceof Error ? err.message : "Couldn't update this appointment.");
        } finally {
            setPendingAction(null);
        }
    };

    return {
        appointments,
        statusFilter,
        setStatusFilter,
        isLoading,
        loadError,
        pendingAction,
        actionError,
        handleDecision,
    };
};