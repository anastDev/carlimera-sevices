import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Calendar,
    CarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    Mail,
    Phone,
    User,
} from "lucide-react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import type {Car} from "@/types/typesCar.ts";
import {getMonthGrid, isPastDay, isSameDay, toDateId} from "@/utils/formatTime.ts";
import SmoothButton from "@/components/smoothui/smooth-button";
import BookingSuccessOverlay from "@/components/BookingConfirmationOverlay.tsx";


const bookingFormSchema = z.object({
    fullName: z.string().trim().min(2, "Enter your full name"),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z
        .string()
        .trim()
        .min(7, "Enter a valid phone number")
        .regex(
            /^[0-9+\s()-]+$/,
            "Phone number can only contain digits, spaces, +, -, ()",
        ),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface ContactInfo {
    fullName: string;
    email: string;
    phone: string;
}

interface BookingDialogProps {
    car: Car | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (
        carId: string,
        dateIso: string,
        time: string,
        contact: ContactInfo,
    ) => void;
}

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const OPEN_HOUR = 9;
const LAST_SLOT_HOUR = 17;
const LAST_SLOT_MINUTE = 30;
const SLOT_INTERVAL_MINUTES = 30;

export const BookingDialog = ({
                                  car,
                                  open,
                                  onOpenChange,
                                  onConfirm,
                              }: BookingDialogProps) => {
    const today = useMemo(() => new Date(), []);
    const [monthCursor, setMonthCursor] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1),
    );


    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const [isConfirmed, setIsConfirmed] = useState(false);

    const hasImage = car?.images && car.images.length > 0;

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingFormSchema),
        mode: "onBlur",
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
        },
    });
    const contactValues = useWatch({ control });
    const isContactComplete =
        bookingFormSchema.safeParse(contactValues).success;

    const timeSlots = useMemo(() => {
        const startMinutes = OPEN_HOUR * 60;
        const endMinutes = LAST_SLOT_HOUR * 60 + LAST_SLOT_MINUTE;

        const slots: { minutes: number; label: string; disabled: boolean }[] =
            [];
        for (
            let m = startMinutes;
            m <= endMinutes;
            m += SLOT_INTERVAL_MINUTES
        ) {
            const hour = Math.floor(m / 60);
            const minute = m % 60;

            const slotTime = new Date(2000, 0, 1, hour, minute);
            const label = slotTime.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
            });

            const isToday = selectedDate
                ? isSameDay(selectedDate, today)
                : false;
            const disabled = isToday
                ? hour < today.getHours() ||
                (hour === today.getHours() && minute <= today.getMinutes())
                : false;

            slots.push({ minutes: m, label, disabled });
        }
        return slots;
    }, [selectedDate, today]);

    const monthGrid = useMemo(() => getMonthGrid(monthCursor), [monthCursor]);
    const canGoPrevMonth =
        monthCursor.getFullYear() > today.getFullYear() ||
        (monthCursor.getFullYear() === today.getFullYear() &&
            monthCursor.getMonth() > today.getMonth());

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleConfirm = async (values: BookingFormValues) => {
        if (!car) return;

        if (!selectedDate || !selectedTime) {
            toast.error("Please pick a date and time for your viewing");
            return;
        }

        try {
            onConfirm(car.id, toDateId(selectedDate), selectedTime, values);
            setIsConfirmed(true);
        } catch (err) {
            console.error("Booking confirmation error:", err);
            toast.error(
                err instanceof Error
                    ? err.message
                    : "Something went wrong, please try again",
            );
        }
    };

    const handleDone = () => {
        setIsConfirmed(false);
        onOpenChange(false);
    }

    useEffect(() => {
        if (open) return;
        const timer = setTimeout(() => {
            setIsConfirmed(false);
            setSelectedDate(null);
            setSelectedTime(null);
            reset();
        }, 200);
        return () => clearTimeout(timer);
    }, [open, reset]);

    const isConfirmDisabled =
        !car ||
        !selectedDate ||
        !selectedTime ||
        !isContactComplete ||
        isSubmitting;

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-xl overflow-hidden p-0 rounded-lg border border-border bg-background shadow-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="border-b border-border px-6 pt-6 pb-4 flex flex-row items-center justify-between">
                        <DialogTitle className="text-base font-bold text-foreground">
                            Book Your Viewing
                        </DialogTitle>
                    </DialogHeader>

                    {/* Car Preview Header Zone */}
                    <div>
                        <div className="relative rounded-md h-50 w-full bg-background/90 flex items-center justify-center overflow-hidden">
                            {hasImage ? (
                                <img
                                    src={car?.images?.[0]}
                                    alt={car?.make}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-1.5 text-muted">
                                    <CarIcon
                                        size={36}
                                        className="text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                    <span className="text-xs font-semibold">
                                        No Preview Image
                                    </span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <div className="text-accent">
                                    <p className="text-sm font-bold leading-tight">
                                        {car?.make ?? "Select a vehicle"}
                                    </p>
                                    <p className="text-xs text-blue-100 font-medium mt-0.5">
                                        {car?.price
                                            ? `£${car.price.toLocaleString()}`
                                            : "Price pending"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit(handleConfirm)}
                            className="p-5 space-y-6"
                        >
                            {/* Contact Details */}
                            <div className="space-y-3.5">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Your Details
                                </h4>

                                <FieldGroup>
                                    <Controller
                                        name="fullName"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <FieldLabel htmlFor="fullName">
                                                    Full name
                                                </FieldLabel>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        {...field}
                                                        id="fullName"
                                                        placeholder="e.g. John Smith"
                                                        aria-invalid={
                                                            fieldState.invalid
                                                        }
                                                        autoComplete="off"
                                                    />
                                                </InputGroup>
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <FieldLabel htmlFor="email">
                                                    Email address
                                                </FieldLabel>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        {...field}
                                                        id="email"
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        aria-invalid={
                                                            fieldState.invalid
                                                        }
                                                        autoComplete="off"
                                                    />
                                                </InputGroup>
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <FieldLabel htmlFor="phone">
                                                    Phone number
                                                </FieldLabel>
                                                <InputGroup>
                                                    <InputGroupAddon>
                                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        {...field}
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="e.g. 07123 456789"
                                                        aria-invalid={
                                                            fieldState.invalid
                                                        }
                                                        autoComplete="off"
                                                    />
                                                </InputGroup>
                                                {fieldState.invalid ? (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                ) : (
                                                    <FieldDescription>
                                                        We'll only use this to
                                                        confirm your booking.
                                                    </FieldDescription>
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
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
                                                setMonthCursor(
                                                    (m) =>
                                                        new Date(
                                                            m.getFullYear(),
                                                            m.getMonth() - 1,
                                                            1,
                                                        ),
                                                )
                                            }
                                            className="rounded-md p-1 text-muted-foreground hover:bg-background disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <span className="text-xs font-bold text-foreground">
                                            {monthCursor.toLocaleDateString(
                                                undefined,
                                                {
                                                    month: "long",
                                                    year: "numeric",
                                                },
                                            )}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setMonthCursor(
                                                    (m) =>
                                                        new Date(
                                                            m.getFullYear(),
                                                            m.getMonth() + 1,
                                                            1,
                                                        ),
                                                )
                                            }
                                            className="rounded-md p-1 text-muted-foreground hover:bg-background cursor-pointer"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-7 gap-1 mb-1">
                                        {WEEKDAY_LABELS.map((label) => (
                                            <span
                                                key={label}
                                                className="text-center text-[0.70rem] font-semibold text-muted-foreground"
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-2">
                                        {monthGrid.map((date, i) => {
                                            if (!date)
                                                return (
                                                    <div key={`empty-${i}`} />
                                                );
                                            const isSunday =
                                                date.getDay() === 0;
                                            const disabled =
                                                isPastDay(date, today) ||
                                                isSunday;
                                            const isSelected =
                                                selectedDate &&
                                                isSameDay(date, selectedDate);
                                            return (
                                                <SmoothButton
                                                    key={toDateId(date)}
                                                    type="button"
                                                    variant="ghost"
                                                    disabled={disabled}
                                                    onClick={() =>
                                                        handleSelectDate(date)
                                                    }
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
                                    <p className="text-xs text-gray-400 font-medium">
                                        Pick a date to see available times.
                                    </p>
                                ) : (
                                    <div className="max-h-56 overflow-y-auto pr-1">
                                        <div className="grid grid-cols-3 gap-2">
                                            {timeSlots.map((slot) => (
                                                <button
                                                    key={slot.minutes}
                                                    type="button"
                                                    disabled={slot.disabled}
                                                    onClick={() =>
                                                        setSelectedTime(
                                                            slot.label,
                                                        )
                                                    }
                                                    className={`rounded-xl border py-2.5 text-xs font-bold transition-all cursor-pointer ${
                                                        slot.disabled
                                                            ? "cursor-not-allowed border-muted-foreground/40 bg-background text-muted-foreground opacity-60 [background-image:linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_50%,#f3f4f6_50%,#f3f4f6_75%,transparent_75%,transparent)] [background-size:12px_12px]"
                                                            : slot.label ===
                                                            selectedTime
                                                                ? "bg-primary text-popover shadow-sm"
                                                                : "border-muted-foreground/80 bg-background text-foreground hover:text-primary/80 hover:border-primary/80"
                                                    }`}
                                                >
                                                    {slot.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit Zone */}
                            <div className="pt-2">
                                <SmoothButton
                                    type="submit"
                                    disabled={isConfirmDisabled}
                                    className="w-full bg-primary text-primary-foreground border border-muted-foreground/80 hover:bg-primary/90 py-6 rounded-xl font-bold shadow-md transition-all cursor-pointer disabled:bg-background disabled:text-muted-foreground disabled:shadow-none"
                                >
                                    {isSubmitting
                                        ? "Confirming"
                                        : "Confirm Booking Details"}
                                </SmoothButton>
                                <p className="text-[0.60rem] text-muted-foreground text-center mt-3 font-medium italic">
                                    No deposit needed. We will prepare this
                                    vehicle for your arrival.
                                </p>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

            <BookingSuccessOverlay
                open={isConfirmed}
                carLabel={car?.title ?? "Your vehicle"}
                dateLabel={
                    selectedDate
                        ? selectedDate.toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })
                        : ""
                }
                timeLabel={selectedTime ?? ""}
                onDone={handleDone}
            />
        </>
    );
};

export default BookingDialog;

