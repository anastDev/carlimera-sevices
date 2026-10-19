import type {Car} from "@/types/typesCar.ts";

const SITE_URL = "https://www.carlimeraservices.co.uk";

const formatPrice = (price: number) => `£${price.toLocaleString("en-GB")}`;

export function carTitle(car: Car): string {
    return `${car.year} ${car.make} ${car.model} – ${formatPrice(car.price)}`;
}

export function carDescription(car: Car): string {
    return (
        `Used ${car.year} ${car.make} ${car.model}, ${car.mileage.toLocaleString("en-GB")} miles, ` +
        `${car.fuelType}, ${car.transmission}. ${formatPrice(car.price)}. ` +
        `Book a viewing in Coventry or ask about UK-wide delivery.`
    );
}

export function carSchema(car: Car): string {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Car",
        name: car.title,
        description: car.description,
        image: car.images,
        brand: { "@type": "Brand", name: car.make },
        model: car.model,
        vehicleModelDate: String(car.year),
        mileageFromOdometer: {
            "@type": "QuantitativeValue",
            value: car.mileage,
            unitCode: "SMI",
        },
        fuelType: car.fuelType,
        vehicleTransmission: car.transmission,
        ...(car.doors ? { numberOfDoors: car.doors } : {}),
        ...(car.seats ? { seatingCapacity: car.seats } : {}),
        ...(car.exteriorColor ? { color: car.exteriorColor } : {}),
        offers: {
            "@type": "Offer",
            price: car.price,
            priceCurrency: "GBP",
            itemCondition: "https://schema.org/UsedCondition",
            availability:
                car.status === "reserved"
                    ? "https://schema.org/LimitedAvailability"
                    : "https://schema.org/InStock",
            url: `${SITE_URL}/cars/${car.id}`,
            seller: { "@id": `${SITE_URL}/#dealer` },
        },
    };

    return JSON.stringify(schema).replace(/</g, "\\u003c");
}