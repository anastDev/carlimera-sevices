import type {Car} from "@/types/typesCar.ts";
import {CardContent} from "@/components/ui/card.tsx";
import {Card} from "@radix-ui/themes";
import {CarIcon, Fuel, Info, Milestone, Settings} from "lucide-react";
import {Link} from "react-router";
import {FaPerson} from "react-icons/fa6";
import {IoShieldCheckmark} from "react-icons/io5";
import {Separator} from "@base-ui/react";
import {type ElementType, Fragment} from "react";
import {cn} from "@/lib/utils.ts";

interface CarCardProps {
    car: Car;
    view?: "list" | "grid";
}

const plural = (count: string, word: string) => `${word}${count === "1" ? "" : "s"}`;

interface SpecProps {
    icon: ElementType;
    label: string;
    value: string;
    pill?: boolean;
}


const Spec = ({ icon: Icon, label, value, pill = false }: SpecProps) => (
    <span
        className={cn(
            "inline-flex items-center gap-1.5 text-xs",
            pill && "rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 dark:border-primary/20 dark:bg-primary/[0.08]",
        )}
    >
        <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        <span className="text-muted-foreground">{label}:</span>
        <span className="font-semibold text-foreground">{value}</span>
    </span>
);

const carSpecs = (car: Car, mileage: string) => [
    { icon: Settings, label: "Transmission", value: car.transmission },
    { icon: Fuel, label: "Fuel", value: car.fuelType },
    { icon: Milestone, label: "Mileage", value: mileage },
    { icon: FaPerson, label: plural(car.prevOwners, "Owner"), value: car.prevOwners },
    { icon: IoShieldCheckmark, label: plural(car.keys, "Key"), value: car.keys },
    { icon: IoShieldCheckmark, label: "Insurance Group", value: car.insuranceGroup },
];

export const CarCard = ({ car, view = "grid" }: CarCardProps) => {
    const hasImage = car.images && car.images.length > 0;
    const vehicleName = `${car.year} ${car.make} ${car.model}`;
    const price = `£${car.price.toLocaleString("en-GB")}`;
    const mileage = `${car.mileage.toLocaleString("en-GB")} mi`;
    const specs = carSpecs(car, mileage);

    if (view === "list") {
        return (
            <Link to={`/cars/${car.id}`} className="block group">
                <Card className="overflow-hidden w-full !rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-0">
                        <div className="flex flex-row">
                            {/* Image */}
                            <div className="relative w-32 sm:w-48 shrink-0 aspect-[4/3] bg-muted border-r border-border overflow-hidden">
                                {hasImage ? (
                                    <img
                                        src={car.images[0]}
                                        alt={vehicleName}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover object-center"
                                    />
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground gap-1">
                                        <CarIcon size={20} aria-hidden="true" />
                                        <span className="text-[10px] font-semibold">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 items-center justify-between gap-3 px-4 py-3 min-w-0">
                                <div className="min-w-0">
                                    <h3 className="text-sm sm:text-lg font-medium text-foreground truncate">
                                        {vehicleName}
                                    </h3>
                                    {car.subtitle && (
                                        <p className="truncate text-sm font-medium text-primary">{car.subtitle}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground truncate">{car.engine}</p>

                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 my-4">
                                        {specs.map((spec, i) => (
                                            <Fragment key={spec.label}>
                                                {i > 0 && <Separator orientation="vertical" className="h-3.5" />}
                                                <Spec {...spec} />
                                            </Fragment>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                    <p className="text-base sm:text-lg font-extrabold text-foreground whitespace-nowrap">
                                        {price}
                                    </p>
                                    <span
                                        className="inline-flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-colors duration-200
        bg-primary text-primary-foreground
        dark:bg-primary/10 dark:text-primary dark:ring-1 dark:ring-inset dark:ring-primary/30 dark:shadow-none
        dark:group-hover:bg-primary dark:group-hover:text-primary-foreground dark:group-hover:ring-primary"
                                    >
                                        More
                                        <Info className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        );
    }

    return (
        <Link to={`/cars/${car.id}`} className="group block h-full">
            <Card className="overflow-hidden h-full w-full !rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/50 transition-all duration-300 transform translate-z-0">
                <CardContent className="p-0 flex flex-col h-full">
                    {/* Image */}
                    <div className="relative aspect-[16/10] w-full bg-muted flex items-center justify-center border-b border-border overflow-hidden">
                        {hasImage ? (
                            <img
                                src={car.images[0]}
                                alt={vehicleName}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover object-center rounded-t-lg"
                            />
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground gap-2 rounded-t-lg">
                                <CarIcon size={32} aria-hidden="true" />
                                <span className="text-xs font-semibold">Image Pending</span>
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="px-4 py-4 flex flex-col flex-1 justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-foreground mt-1">{vehicleName}</h3>
                            <p className="text-sm text-muted-foreground my-0.5 line-clamp-1">{car.engine}</p>
                            <p className="text-sm text-muted-foreground">MOT {car.motExpiry}</p>

                            <div className="flex flex-wrap gap-2 my-4">
                                {specs.map((spec) => (
                                    <Spec key={spec.label} {...spec} pill />
                                ))}
                            </div>

                            <p className="text-lg font-extrabold text-foreground mt-4">{price}</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="w-full px-4 pb-4 mt-2">
    <span
        className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200
            bg-primary text-primary-foreground
            dark:bg-primary/10 dark:text-primary dark:ring-1 dark:ring-inset dark:ring-primary/30
            dark:group-hover:bg-primary dark:group-hover:text-primary-foreground dark:group-hover:ring-primary"
    >
        <Info className="h-4 w-4" aria-hidden="true" />
        View details
    </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default CarCard;