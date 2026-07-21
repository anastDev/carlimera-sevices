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
}

export const CarCard = ({ car }: CarCardProps) => {
    const hasImage = car.images && car.images.length > 0;
    const navigate = useNavigate();

    return (
        <Card className="overflow-hidden h-full w-full !rounded-lg border border-border bg-background hover:shadow-md hover:border-primary/50 transition-all duration-300 transform translate-z-0">
            <CardContent className="p-0">
                <motion.div
                    variants={card}
                    whileHover="hover"
                    className="relative aspect-[16/10] w-full bg-background flex items-center justify-center border-b border-border overflow-hidden">
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
                </motion.div>

                {/* Content Zone */}
                <div className="p-5 space-y-4">
                    <div>
                        <h3 className="text-base font-medium  text-foreground ">{car.year} {car.make} {car.model}</h3>
                        <p className="text-sm text-muted-foreground my-0.5 line-clamp-1">{car.engine}</p>
                        <p className="text-sm text-muted-foreground ">MOT {car.motExpiry}</p>
                       <div className="flex flex-row justify-between text-xs my-4">
                           <p className="text-teal-600 flex flex-col items-center"><Settings className="h-4 w-4" />{car.transmission}</p>
                           <p className="text-teal-600 flex flex-col items-center"><Fuel className="h-4 w-4" />{car.fuelType}</p>
                           <p className="text-teal-600 flex flex-col items-center"><Milestone className="h-4 w-4" />{car.mileage.toLocaleString()} mi</p>
                       </div>
                        <p className="text-lg font-extrabold text-foreground mt-4">
                            £{car.price.toLocaleString()}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CarCard;