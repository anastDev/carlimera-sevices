import {z} from "zod";
import {CAR_CATEGORIES, ENGINE_LOCATIONS, FUEL_TYPES, TRANSMISSIONS} from "@/data/carData.ts";

const requiredEnum = <T extends readonly [string, ...string[]]>(
    values: T,
    message: string,
) =>
    z.union([z.enum(values), z.literal("")]).refine((v) => v !== "", { message });

export const carFormSchema = z.object({
    title: z.string().trim().min(3, "Title is required"),
    subtitle: z.string().trim().min(3, "Subtitle is required"),
    make: z.string().trim().min(1, "Make is required"),
    model: z.string().trim().min(1, "Model is required"),
    year: z.coerce
        .number()
        .int("Year must be a whole number")
        .min(1900, "Year too early")
        .max(new Date().getFullYear() + 1, "Year can't be in the future"),
    price: z.coerce.number().min(0, "Price can't be negative"),
    mileage: z.coerce.number().int().min(0, "Mileage can't be negative"),
    location: z.string().trim().optional(),
    engine: z.string().trim().min(1, "Engine is required"),
    category: requiredEnum(CAR_CATEGORIES, "Choose a category"),
    engineLocation: requiredEnum(ENGINE_LOCATIONS, "Choose an engine location"),
    transmission: requiredEnum(TRANSMISSIONS, "Choose a transmission"),
    fuelType: requiredEnum(FUEL_TYPES, "Choose a fuel type"),
    topSpeed: z.coerce.number().int().optional(),
    doors: z.coerce.number().int().min(1, "A car has at least one door"),
    seats: z.coerce.number().int().min(1, "A car has at least one seat"),
    carWidth: z.coerce.number().optional(),
    carLength: z.coerce.number().optional(),

    exteriorColor: z.string().trim().optional(),
    interiorColor: z.string().trim().optional(),

    registration: z.string().trim().min(1, "Registration is required"),
    motExpiry: z.string().min(1, "MOT expiry is required"),
    prevOwners: z.string().optional(),
    emissionClass: z.string().trim().min(1, "Emission class is required"),
    insuranceGroup: z.string().trim().min(1, "Insurance group is required"),
    serviceHistory: z.string().trim().min(1, "Service history is required"),
    warranty: z.string().trim().min(1, "Warranty is required"),
    keys: z.string().optional(),
    conditionText: z.string().trim().min(1, "Condition notes are required"),
    description: z.string().trim().min(20, "Give buyers a bit more detail"),
    videoUrl: z
        .union([z.literal(""), z.string()])
        .optional()
        .refine(
            (v) => !v || /(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/.test(v),
            { message: "Enter a YouTube link" },
        ),
});

export type CarFormInput = z.input<typeof carFormSchema>;
export type CarFormOutput = z.output<typeof carFormSchema>;

export const carEditSchema = z.object({
    price: z.coerce.number().min(0, "Price can't be negative"),
    mileage: z.coerce.number().int().min(0, "Mileage can't be negative"),
    category: z.string().trim(),
});

export type CarEditInput = z.input<typeof carEditSchema>;
export type CarEditOutput = z.output<typeof carEditSchema>;