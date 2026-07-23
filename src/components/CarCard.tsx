import type {Car} from "@/types/typesCar.ts";
import { Button } from "@/components/ui/button.tsx";
import {CardContent} from "@/components/ui/card.tsx";
import {Card} from "@radix-ui/themes";
import {ArrowUpRight, CarIcon, Fuel, Milestone, Settings} from "lucide-react";
import {useNavigate} from "react-router";
import {card} from "@/utils/transitions.ts";
import {motion} from "framer-motion";

interface CarCardProps {
    car: Car;
    view?: "list" | "grid";
}

export const CarCard = ({ car, view = "grid" }: CarCardProps) => {
    const hasImage = car.images && car.images.length > 0;
    const navigate = useNavigate();

    if (view === "list") {
        return (
            <Card className="overflow-hidden w-full !rounded-lg border border-border bg-background hover:shadow-md hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-0 cursor-pointer" onClick={() => navigate(`/cars/${car.id}`)}>
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
                                <h3 className="text-sm sm:text-base font-medium text-foreground truncate">
                                    {car.year} {car.make} {car.model}
                                </h3>
                                <p className="text-xs text-muted-foreground truncate">{car.engine}</p>

                                <div className="flex flex-row items-center gap-3 text-xs text-primary pt-4">
                                    <span className="flex items-center gap-1">
                                        <Settings className="h-3.5 w-3.5" />
                                        {car.transmission}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Fuel className="h-3.5 w-3.5" />
                                        {car.fuelType}
                                    </span>
                                    <span className="hidden sm:flex items-center gap-1">
                                        <Milestone className="h-3.5 w-3.5" />
                                        {car.mileage.toLocaleString()} mi
                                    </span>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-3">
                                <p className="text-base sm:text-lg font-extrabold text-foreground whitespace-nowrap">
                                    £{car.price.toLocaleString()}
                                </p>
                                <Button
                                    onClick={() => navigate(`/cars/${car.id}`)}
                                    className="h-9 w-9 p-0 rounded-full bg-primary/90 hover:bg-primary/60 shadow-sm shrink-0"
                                >
                                    <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden h-full w-full !rounded-lg border border-border bg-background hover:shadow-md hover:border-primary/50 transition-all duration-300 transform translate-z-0">
            <CardContent className="p-0">
                <div className="relative aspect-[16/10] w-full bg-background flex items-center justify-center border-b border-border overflow-hidden">
                    {hasImage ? (
                        <div className="relative h-full w-full">
                            <img
                                src={car.images?.[0]}
                                alt={car.title}
                                className="h-full w-full object-cover object-center rounded-t-lg"
                            />
                            <Button
                                onClick={() => navigate(`/cars/${car.id}`)}
                                className="absolute top-3 right-3 h-10 w-10 p-0 rounded-full bg-primary/90 backdrop-blur hover:bg-primary/60 shadow-md"
                            >
                                <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground gap-2 rounded-t-lg">
                            <CarIcon size={32} className="text-gray-400" aria-hidden="true" />
                            <span className="text-xs font-semibold">Image Pending</span>
                        </div>
                    )}
                </div>

                <motion.div className="p-5 space-y-4" variants={card} whileHover="hover">
                    <div>
                        <h3 className="text-base font-medium text-foreground">{car.year} {car.make} {car.model}</h3>
                        <p className="text-sm text-muted-foreground my-0.5 line-clamp-1">{car.engine}</p>
                        <p className="text-sm text-muted-foreground">MOT {car.motExpiry}</p>
                        <div className="flex flex-row justify-between text-xs my-4">
                            <p className="text-teal-600 flex flex-col items-center"><Settings className="h-4 w-4" />{car.transmission}</p>
                            <p className="text-teal-600 flex flex-col items-center"><Fuel className="h-4 w-4" />{car.fuelType}</p>
                            <p className="text-teal-600 flex flex-col items-center"><Milestone className="h-4 w-4" />{car.mileage.toLocaleString()} mi</p>
                        </div>
                        <p className="text-lg font-extrabold text-foreground mt-4">
                            £{car.price.toLocaleString()}
                        </p>
                    </div>
                </motion.div>
            </CardContent>
        </Card>
    );
}

export default CarCard;