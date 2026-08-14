import type {Car} from "@/types/typesCar.ts";
import {CardContent} from "@/components/ui/card.tsx";
import {Card} from "@radix-ui/themes";
import {CarIcon, Fuel, Info, Milestone, Settings} from "lucide-react";
import {useNavigate} from "react-router";
import {FaPerson} from "react-icons/fa6";
import {IoShieldCheckmark} from "react-icons/io5";
import SmoothButton from "@/components/smoothui/smooth-button";
import {Separator} from "@base-ui/react";

interface CarCardProps {
    car: Car;
    view?: "list" | "grid";
    onclick: () => void;
}

export const CarCard = ({ car, view = "grid" , onclick}: CarCardProps) => {
    const hasImage = car.images && car.images.length > 0;
    const navigate = useNavigate();

    if (view === "list") {
        return (
            <Card onClick={onclick} className="overflow-hidden w-full !rounded-lg border border-border bg-background hover:shadow-md hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                    <div className="flex flex-row">
                        {/* Image */}
                        <div className="relative w-32 sm:w-48 shrink-0 aspect-[4/3] bg-background border-r border-border overflow-hidden">
                            {hasImage ? (
                                <img
                                    src={car.images?.[0]}
                                    alt={car.title}
                                    className="h-full w-full object-cover object-center"
                                />
                            ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground gap-1">
                                    <CarIcon size={20} className="text-gray-400" aria-hidden="true" />
                                    <span className="text-[10px] font-semibold">No Image</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 items-center justify-between gap-3 px-4 py-3 min-w-0">
                            <div className="min-w-0">
                                <h3 className="text-sm sm:text-lg font-medium text-foreground truncate">
                                    {car.year} {car.make} {car.model}
                                </h3>
                                <p className="text-sm text-muted-foreground truncate">{car.engine}</p>

                                <div className="flex flex-wrap gap-2 my-4">
                                    <div className="inline-flex items-center gap-1.5 rounded-full py-1.5 text-xs text-primary">
                                        <Settings className="h-3.5 w-3.5" aria-hidden="true" />Transmission: <span className="font-semibold">{car.transmission}</span>
                                    </div>
                                    <Separator orientation="vertical"/>
                                    <div className="inline-flex items-center gap-1.5 rounded-full py-1.5 text-xs text-primary">
                                        <Fuel className="h-3.5 w-3.5" aria-hidden="true" />
                                        Fuel: <span className="font-semibold">{car.fuelType}</span>
                                    </div>
                                    <Separator orientation="vertical" className="text-primary" />
                                    <div className="inline-flex items-center gap-1.5 rounded-full  py-1.5 text-xs text-primary">
                                        <Milestone className="h-3.5 w-3.5" aria-hidden="true" />
                                        Mileage: <span className="font-semibold">{car.mileage.toLocaleString()} mi</span>
                                    </div>
                                    <Separator orientation="vertical" className="text-primary" />
                                    <div className="inline-flex items-center gap-1.5 rounded-full  py-1.5 text-xs text-primary">
                                        <FaPerson className="h-3.5 w-3.5" aria-hidden="true" />
                                        Owner{car.prevOwners > 1 ? "s" : ""}: <span className="font-semibold">{car.prevOwners}</span>
                                    </div>
                                    <Separator orientation="vertical" className="text-primary" />
                                    <div className="inline-flex items-center gap-1.5 rounded-full  py-1.5 text-xs text-primary">
                                        <IoShieldCheckmark className="h-3.5 w-3.5" aria-hidden="true" />
                                        Key{car.keys! > 1 ? "s" : ""}: <span className="font-semibold">{car.keys}</span>
                                    </div>
                                    <Separator orientation="vertical" className="text-primary" />
                                    <div className="inline-flex items-center gap-1.5 rounded-full  py-1.5 text-xs text-primary">
                                        <IoShieldCheckmark className="h-3.5 w-3.5" aria-hidden="true" />
                                        Insurance Group: <span className="font-semibold">{car.insuranceGroup}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-3">
                                <p className="text-base sm:text-lg font-extrabold text-foreground whitespace-nowrap">
                                    £{car.price.toLocaleString()}
                                </p>
                                <SmoothButton
                                    onClick={() => navigate(`/cars/${car.id}`)}
                                    className="px-4 bg-primary/90 rounded-lg hover:bg-primary/60 shadow-sm shrink-0"
                                >
                                   <div className="flex flex-row justify-center items-center gap-3">
                                       <div>More</div>
                                       <Info className="h-5 w-5 text-primary-foreground" />
                                   </div>
                                </SmoothButton>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            onClick={() => navigate(`/cars/${car.id}`)}
            className="overflow-hidden h-full w-full !rounded-lg border border-border bg-background hover:shadow-md hover:border-primary/50 transition-all duration-300 transform translate-z-0 cursor-pointer"
        >
            <CardContent className="p-0 flex flex-col h-full">
                {/* Img Section */}
                <div className="relative aspect-[16/10] w-full bg-background flex items-center justify-center border-b border-border overflow-hidden">
                    {hasImage ? (
                        <img
                            src={car.images?.[0]}
                            alt={car.title}
                            className="h-full w-full object-cover object-center rounded-t-lg"
                        />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground gap-2 rounded-t-lg">
                            <CarIcon size={32} className="text-gray-400" aria-hidden="true" />
                            <span className="text-xs font-semibold">Image Pending</span>
                        </div>
                    )}
                </div>

                {/* Main Details Body */}
                <div className="px-4 py-4 flex flex-col flex-1 justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-foreground mt-1">{car.year} {car.make} {car.model}</h3>
                        <p className="text-sm text-muted-foreground my-0.5 line-clamp-1">{car.engine}</p>
                        <p className="text-sm text-muted-foreground">MOT {car.motExpiry}</p>

                        <div className="flex flex-wrap gap-2 my-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs text-primary">
                                <Settings className="h-3.5 w-3.5" aria-hidden="true" />Transmission: <span className="font-semibold">{car.transmission}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs text-primary">
                                <Fuel className="h-3.5 w-3.5" aria-hidden="true" />
                                Fuel: <span className="font-semibold">{car.fuelType}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs text-primary">
                                <Milestone className="h-3.5 w-3.5" aria-hidden="true" />
                                Mileage: <span className="font-semibold">{car.mileage.toLocaleString()} mi</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs text-primary">
                                <FaPerson className="h-3.5 w-3.5" aria-hidden="true" />
                                Owner{car.prevOwners > 1 ? "s" : ""}: <span className="font-semibold">{car.prevOwners}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs text-primary">
                                <IoShieldCheckmark className="h-3.5 w-3.5" aria-hidden="true" />
                               Key{car.keys! > 1 ? "s" : ""}: <span className="font-semibold">{car.keys}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs text-primary">
                                <IoShieldCheckmark className="h-3.5 w-3.5" aria-hidden="true" />
                               Insurance Group: <span className="font-semibold">{car.insuranceGroup}</span>
                            </span>
                        </div>

                        {/* Price of the vehicle */}
                        <p className="text-lg font-extrabold text-foreground mt-4">
                            £{car.price.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Footer Button */}
                <div className="w-full px-4 pb-4 mt-2">
                    <SmoothButton className="w-full pointer-events-none">
                        <Info className="h-4 w-4" /> View details
                    </SmoothButton>
                </div>
            </CardContent>
        </Card>
    );
}

export default CarCard;