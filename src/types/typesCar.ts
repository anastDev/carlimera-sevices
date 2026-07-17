export interface Car {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    transmission: string;
    fuelType: string;
    topSpeed: number;
    bodyType: string;
    location: string;
    title: string;
    engine: string;
    drivetrain: string;
    exteriorColor: string;
    interiorColor: string;
    images: string[];
    description: string;
    features: string[];
    conditionText: string;
    doors: number;
    registration: string;
    seats: number;
    emissionClass: string;
    motExpiry: string;
    prevOwners: number;
    warranty: string;
    keys: number | undefined;
    serviceHistory: string;
}

export interface DateOption {
    id: string;
    day: string;
    date: string;
}

export interface TimeSlot {
    id: string;
    label: string;
    available: boolean;
}