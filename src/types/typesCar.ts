export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    transmission: string;
    fuelType: string;
    topSpeed: number;
    category: string;
    location: string;
    title: string;
    engine: string;
    exteriorColor: string;
    interiorColor: string;
    carWidth: number;
    carLength: number;
    engine_location: string;
    insuranceGroup: string;
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