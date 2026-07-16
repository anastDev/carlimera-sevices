import type {Car} from "@/types/typesCar.ts";
import { Button } from "@/components/ui/button.tsx";
import {CardContent} from "@/components/ui/card.tsx";
import {Card} from "@radix-ui/themes";
import {CarIcon, Fuel, Milestone, Settings} from "lucide-react";

interface CarCardProps {
    car: Car;
    onBookViewing: (car: Car) => void;
}

export const CarCard = ({ car, onBookViewing }: CarCardProps) => {
    const hasImage = car.images && car.images.length > 0;

    return (
        <Card className="overflow-hidden !rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-teal-600/50 transition-all duration-300 transform translate-z-0 cursor-pointer">
            <CardContent className="p-0">
                <div className="relative aspect-[16/10] w-full bg-gray-100 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                    {hasImage ? (
                        <img
                            src={car.images?.[0]}
                            alt={car.title}
                            className="h-full w-full object-cover object-center rounded-t-lg"
                        />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-gray-500 gap-2 rounded-t-2xl sm:rounded-t-3xl">
                            <CarIcon size={32} className="text-gray-400" aria-hidden="true" />
                            <span className="text-xs font-semibold">Image Pending</span>
                        </div>
                    )}
                </div>

                {/* Content Zone */}
                <div className="p-5 space-y-4">
                    <div>
                        <h3 className="text-base font-medium text-gray-900">{car.title}</h3>
                       <div className="flex flex-row justify-between text-xs my-2">
                           <p className="text-teal-600 flex flex-col items-center"><Settings className="h-5 w-5" />{car.transmission}</p>
                           <p className="text-teal-600 flex flex-col items-center"><Fuel className="h-5 w-5" />{car.fuelType}</p>
                           <p className="text-teal-600 flex flex-col items-center"><Milestone className="h-5 w-5" />{car.mileage.toLocaleString()} mi</p>
                       </div>
                        <p className="text-lg font-extrabold font-gray-900 text-teal-850 mt-1">
                            £{car.price.toLocaleString()}
                        </p>
                    </div>

                    <Button
                        onClick={() => onBookViewing(car)}
                        className="w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-4 rounded-xl transition-colors cursor-pointer"
                    >
                        Book viewing
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default CarCard;