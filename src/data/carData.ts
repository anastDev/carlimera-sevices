import type {SelectOptionProps} from "@/components/smoothui/select";

export const CAR_CATEGORIES = [
    "Hatchback", "Saloon", "Estate", "SUV", "Coupe",
    "Convertible", "MPV", "Pickup", "Van",
] as const;

export const TRANSMISSIONS = ["Manual", "Automatic", "Semi-Automatic"] as const;

export const FUEL_TYPES = [
    "Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid",
] as const;

export const ENGINE_LOCATIONS = ["Front", "Mid", "Rear"] as const;

const toOptions = (values: readonly string[]): SelectOptionProps[] =>
    values.map((value) => ({ value, label: value }));

export const CATEGORY_OPTIONS = toOptions(CAR_CATEGORIES);
export const TRANSMISSION_OPTIONS = toOptions(TRANSMISSIONS);
export const FUEL_TYPE_OPTIONS = toOptions(FUEL_TYPES);
export const ENGINE_LOCATION_OPTIONS = toOptions(ENGINE_LOCATIONS);
