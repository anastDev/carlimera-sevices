import {useEffect, useState} from "react";
import {fetchAvailableSlots} from "@/services/api.appointment.ts";
import {toApiDate} from "@/utils/formatTime.ts";

const EMPTY_SLOTS: string[] = [];

interface UseAvailableSlotsResult {
    availableSlots: string[];
    isLoading: boolean;
    error: string | null;
}

export const useAvailableSlots = (
    carId: string | undefined,
    selectedDate: Date | null,
): UseAvailableSlotsResult => {
    const [fetchedSlots, setFetchedSlots] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const shouldFetch = Boolean(carId && selectedDate);

    useEffect(() => {
        if (!selectedDate || !carId) return;

        let cancelled = false;
        setIsLoading(true);
        setError(null);

        fetchAvailableSlots(carId, toApiDate(selectedDate))
            .then((slots) => {
                if (!cancelled) setFetchedSlots(slots);
            })
            .catch((err) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [carId, selectedDate]);

    const availableSlots = shouldFetch ? fetchedSlots : EMPTY_SLOTS;

    return { availableSlots, isLoading, error };
};