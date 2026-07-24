import type {Car} from "@/types/typesCar.ts";
import {Calendar, CarIcon, Clock} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {useMemo, useState} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {formatHour, getMonthGrid, isPastDay, isSameDay, toDateId} from "@/utils/formatTime.ts";
import SmoothButton from "@/components/smoothui/smooth-button";
import {Input} from "@/components/ui/input.tsx";

interface ContactInfo {
    fullName: string;
    email: string;
    phone: string;
}

interface BookingDialogProps {
    car: Car | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (carId: string, dateIso: string, time: string, contact: ContactInfo) => void;
}

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const OPEN_HOUR = 9;
const LAST_SLOT_HOUR = 17;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\s-]{7,}$/;

export const BookingDialog = ({ car, open, onOpenChange, onConfirm }: BookingDialogProps) => {
    const today = useMemo(() => new Date(), []);
    const [monthCursor, setMonthCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [touched, setTouched] = useState({ fullName: false, email: false, phone: false });

    const hasImage = car?.images && car.images.length > 0;

    const nameError = touched.fullName && !fullName.trim() ? "Full name is required" : null;
    const emailError = touched.email
        ? !email.trim()
            ? "Email is required"
            : !EMAIL_REGEX.test(email)
                ? "Enter a valid email"
                : null
        : null;
    const phoneError = touched.phone
        ? !phone.trim()
            ? "Phone number is required"
            : !PHONE_REGEX.test(phone)
                ? "Enter a valid phone number"
                : null
        : null;

    const contactValid =
        fullName.trim().length > 0 && EMAIL_REGEX.test(email) && PHONE_REGEX.test(phone);

    const timeSlots = useMemo(() => {
        const hours: number[] = [];
        for (let h = OPEN_HOUR; h <= LAST_SLOT_HOUR; h++) hours.push(h);
        return hours.map((h) => {
            const disabled = selectedDate ? isSameDay(selectedDate, today) && h <= today.getHours() : false;
            return { hour: h, label: formatHour(h), disabled };
        });
    }, [selectedDate, today]);

    const monthGrid = useMemo(() => getMonthGrid(monthCursor), [monthCursor]);
    const canGoPrevMonth =
        monthCursor.getFullYear() > today.getFullYear() ||
        (monthCursor.getFullYear() === today.getFullYear() && monthCursor.getMonth() > today.getMonth());

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleConfirm = () => {
        if (!car || !selectedDate || !selectedTime || !contactValid) return;
        onConfirm(car.id, toDateId(selectedDate), selectedTime, { fullName, email, phone });
        onOpenChange(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setFullName("");
        setEmail("");
        setPhone("");
        setTouched({ fullName: false, email: false, phone: false });
    };

    const isFormComplete = Boolean(car && selectedDate && selectedTime && contactValid);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md overflow-hidden p-0 rounded-lg border border-border bg-background shadow-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="border-b border-border px-6 pt-6 pb-4 flex flex-row items-center justify-between">
                    <DialogTitle className="text-base font-bold text-foreground">Book Your Viewing</DialogTitle>
                </DialogHeader>

                {/* Car Preview Header Zone */}
                <div className="relative rounded-md h-50 w-full bg-background/90 flex items-center justify-center overflow-hidden">
                    {hasImage ? (
                        <img src={car?.images?.[0]} alt={car?.make} className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center gap-1.5 text-muted">
                            <CarIcon size={36} className="text-muted-foreground" aria-hidden="true" />
                            <span className="text-xs font-semibold">No Preview Image</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div className="text-white">
                            <p className="text-sm font-bold leading-tight">{car?.make ?? "Select a vehicle"}</p>
                            <p className="text-xs text-blue-100 font-medium mt-0.5">
                                {car?.price ? `£${car.price.toLocaleString()}` : "Price pending"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">

                    {/* Contact Details */}
                    <div className="space-y-3.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Your Details
                        </h4>

                        <div>
                            <Input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                                placeholder="Full name"
                                className={`w-full rounded-xl border px-3.5 py-4  text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-100 ${
                                    nameError ? "border-red-400" : "border-border focus:border-teal-800"
                                }`}
                            />
                            {nameError && <p className="mt-1 text-xs font-medium text-red-500">{nameError}</p>}
                        </div>

                        <div>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                                placeholder="Email address"
                                className={`w-full rounded-xl border px-3.5 py-4  text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-100 ${
                                    emailError ? "border-red-400" : "border-border focus:border-teal-800"
                                }`}
                            />
                            {emailError && <p className="mt-1 text-xs font-medium text-red-500">{emailError}</p>}
                        </div>

                        <div>
                            <Input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                                placeholder="Phone number"
                                className={`w-full rounded-xl border px-3.5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-100 ${
                                    phoneError ? "border-red-400" : "border-border focus:border-teal-800"
                                }`}
                            />
                            {phoneError && <p className="mt-1 text-xs font-medium text-red-500">{phoneError}</p>}
                        </div>
                    </div>

                    {/* Date Selector - Calendar */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-teal-800" />
                            Select Preferred Date
                        </h4>

                        <div className="rounded-xl border border-border p-3 shadow-sm">
                            <div className="flex items-center justify-between mb-2 px-1">
                                <button
                                    type="button"
                                    disabled={!canGoPrevMonth}
                                    onClick={() =>
                                        setMonthCursor((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
                                    }
                                    className="rounded-md p-1 text-muted-foreground hover:bg-background disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <span className="text-xs font-bold text-foreground">
                                    {monthCursor.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setMonthCursor((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))
                                    }
                                    className="rounded-md p-1 text-muted-foreground hover:bg-background cursor-pointer"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-1">
                                {WEEKDAY_LABELS.map((label) => (
                                    <span key={label} className="text-center text-[0.70rem] font-semibold text-muted-foreground">
                                        {label}
                                    </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {monthGrid.map((date, i) => {
                                    if (!date) return <div key={`empty-${i}`} />;
                                    const isSunday = date.getDay() === 0;
                                    const disabled = isPastDay(date, today) || isSunday;
                                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                                    return (
                                        <SmoothButton
                                            key={toDateId(date)}
                                            variant="ghost"
                                            disabled={disabled}
                                            onClick={() => handleSelectDate(date)}
                                            className={`aspect-square rounded-lg text-xs font-semibold transition-colors duration-150 p-0.5 ${
                                                disabled
                                                    ? "cursor-not-allowed text-foreground/30"
                                                    : isSelected
                                                        ? "bg-primary text-background shadow-sm cursor-pointer hover:text-primary/80"
                                                        : "text-foreground/90 hover:bg-primary/10 hover:text-primary active:bg-primary/20 cursor-pointer"
                                            }`}
                                        >
                                            {date.getDate()}
                                        </SmoothButton>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Time Selector */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-teal-800" />
                            Select Slot Time
                        </h4>
                        {!selectedDate ? (
                            <p className="text-xs text-gray-400 font-medium">Pick a date to see available times.</p>
                        ) : (
                            <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((slot) => (
                                    <button
                                        key={slot.hour}
                                        type="button"
                                        disabled={slot.disabled}
                                        onClick={() => setSelectedTime(slot.label)}
                                        className={`rounded-xl border py-2.5 text-xs font-bold transition-all cursor-pointer ${
                                            slot.disabled
                                                ? "cursor-not-allowed border-muted-foreground/40 bg-background text-muted-foreground opacity-60 [background-image:linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_50%,#f3f4f6_50%,#f3f4f6_75%,transparent_75%,transparent)] [background-size:12px_12px]"
                                                : slot.label === selectedTime
                                                    ? "bg-primary text-popover shadow-sm"
                                                    : "border-muted-foreground/80 bg-background text-foreground hover:text-primary/80 hover:border-primary/80"
                                        }`}
                                    >
                                        {slot.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Zone */}
                    <div className="pt-2">
                        <SmoothButton
                            onClick={handleConfirm}
                            disabled={!isFormComplete}
                            className="w-full bg-primary text-primary-foreground border border-muted-foreground/80 hover:bg-primary/90 py-6 rounded-xl font-bold shadow-md transition-all cursor-pointer disabled:bg-background disabled:text-muted-foreground  disabled:shadow-none cursor-pointer"
                        >
                            Confirm Booking Details
                        </SmoothButton>
                        <p className="text-[0.60rem] text-muted-foreground text-center mt-3 font-medium italic">
                            No deposit needed. We will prepare this vehicle for your arrival.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BookingDialog;

