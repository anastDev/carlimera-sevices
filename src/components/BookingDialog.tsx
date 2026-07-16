import type {Car, DateOption, TimeSlot} from "@/types/typesCar.ts";
import {Calendar, CarIcon, Clock} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@base-ui/react";
import {useState} from "react";


interface BookingDialogProps {
    car: Car | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (carId: string, dateId: string, timeId: string) => void;
}

const dateOptions: DateOption[] = [
    { id: "fri-10", day: "Fri", date: "10" },
    { id: "sat-11", day: "Sat", date: "11" },
    { id: "mon-13", day: "Mon", date: "13" },
];

const timeSlotsByDate: Record<string, TimeSlot[]> = {
    "fri-10": [
        { id: "10:00", label: "10:00 AM", available: true },
        { id: "11:30", label: "11:30 AM", available: true },
        { id: "13:00", label: "1:00 PM", available: false },
    ],
    "sat-11": [
        { id: "10:00", label: "10:00 AM", available: true },
        { id: "11:30", label: "11:30 AM", available: true },
        { id: "13:00", label: "1:00 PM", available: true },
    ],
    "mon-13": [
        { id: "10:00", label: "10:00 AM", available: false },
        { id: "11:30", label: "11:30 AM", available: true },
        { id: "13:00", label: "1:00 PM", available: true },
    ],
};

export const BookingDialog = ({ car, open, onOpenChange, onConfirm }: BookingDialogProps) => {
    const [selectedDateId, setSelectedDateId] = useState<string>(dateOptions[0].id);
    const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);

    const slots = timeSlotsByDate[selectedDateId] ?? [];

    const handleSelectDate = (dateId: string) => {
        setSelectedDateId(dateId);
        setSelectedTimeId(null);
    };

    const handleConfirm = () => {
        if (!car || !selectedTimeId) return;
        onConfirm(car.id, selectedDateId, selectedTimeId);
        onOpenChange(false);
        setSelectedTimeId(null);
    };

    const hasImage = car?.images && car.images.length > 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md overflow-hidden p-0 rounded-2xl border border-gray-200 bg-white shadow-2xl">
                <DialogHeader className="border-b border-gray-100 px-6 py-4 flex flex-row items-center justify-between">
                    <DialogTitle className="text-base font-bold text-gray-900">Book Your Viewing</DialogTitle>
                </DialogHeader>

                {/* Car Preview Header Zone */}
                <div className="relative h-36 w-full bg-gray-50 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                    {hasImage ? (
                        <img
                            src={car?.images?.[0]}
                            alt={car?.brand}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-1.5 text-gray-500">
                            <CarIcon size={36} className="text-gray-400" aria-hidden="true" />
                            <span className="text-xs font-semibold">No Preview Image</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div className="text-white">
                            <p className="text-sm font-bold leading-tight">{car?.brand ?? "Select a vehicle"}</p>
                            <p className="text-xs text-blue-100 font-medium mt-0.5">
                                {car?.price ? `£${car.price.toLocaleString()}` : "Price pending"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Date Selector */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-teal-800" />
                            Select Preferred Date
                        </h4>
                        <div className="flex gap-2">
                            {dateOptions.map((date) => (
                                <button
                                    key={date.id}
                                    type="button"
                                    onClick={() => handleSelectDate(date.id)}
                                    className={`flex-1 rounded-xl border py-3 text-xs font-bold transition-all cursor-pointer ${
                                        date.id === selectedDateId
                                            ? "border-teal-850 bg-teal-850 text-white shadow-sm ring-2 ring-teal-100"
                                            : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
                                    }`}
                                >
                                    <span className="block text-[10px] uppercase tracking-wider opacity-90 font-medium">{date.day}</span>
                                    <span className="block text-sm mt-0.5">{date.date}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Selector */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-teal-800" />
                            Select Slot Time
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                            {slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    type="button"
                                    disabled={!slot.available}
                                    onClick={() => setSelectedTimeId(slot.id)}
                                    className={`rounded-xl border py-2.5 text-xs font-bold transition-all cursor-pointer ${
                                        !slot.available
                                            ? "cursor-not-allowed border-gray-150 bg-gray-50 text-gray-400 opacity-60 [background-image:linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_50%,#f3f4f6_50%,#f3f4f6_75%,transparent_75%,transparent)] [background-size:12px_12px]"
                                            : slot.id === selectedTimeId
                                                ? "border-teal-850 bg-teal-850 text-white shadow-sm ring-2 ring-teal-100"
                                                : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
                                    }`}
                                >
                                    {slot.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Zone */}
                    <div className="pt-2">
                        <Button
                            onClick={handleConfirm}
                            disabled={!selectedTimeId || !car}
                            className="w-full bg-teal-800 hover:bg-teal-900 text-white py-6 rounded-xl font-bold shadow-md transition-all cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:shadow-none"
                        >
                            Confirm Booking Details
                        </Button>
                        <p className="text-[11px] text-gray-600 text-center mt-3 font-medium">
                            No deposit needed. We will prepare this vehicle for your arrival.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BookingDialog;

