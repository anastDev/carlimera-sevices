import { useState, useEffect, useCallback } from "react";
import {getCars} from "@/services/api.cars.ts";
import type {Car} from "@/types/typesCar.ts";

export const useCars = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCars = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getCars();
            setCars(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Couldn't load our vehicles.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCars();
    }, [loadCars]);

    return { cars, isLoading, error, refetch: loadCars };
};