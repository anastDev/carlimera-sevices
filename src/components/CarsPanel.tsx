import {Loader2, Pencil, Plus, Trash2} from "lucide-react";
import {useCallback, useEffect, useMemo, useState} from "react";
import CreateCarPage from "@/pages/CreatecarPage.tsx";
import ListState from "@/components/ListState.tsx";
import {DeleteCarModal} from "@/components/DeleteCarModal.tsx";
import type {Car, CarStatus} from "@/types/typesCar.ts";
import EditCarPage from "@/pages/EditCarPage.tsx";
import { motion, AnimatePresence } from "framer-motion";
import {getAllCars, updateCarStatus} from "@/services/api.cars.ts";
import {formatListedDate} from "@/utils/dates.ts";

type CarsView = "list" | "create" | "edit";
type StatusFilter = CarStatus | "all";

const viewTransition = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.2, ease: "easeOut" },
} as const;

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
    { value: "available", label: "Available" },
    { value: "reserved", label: "Reserved" },
    { value: "sold", label: "Sold" },
    { value: "all", label: "All" },
];

const STATUS_STYLES: Record<CarStatus, string> = {
    available: "bg-teal-50 text-teal-700 border-teal-200",
    reserved: "bg-amber-50 text-amber-700 border-amber-200",
    sold: "bg-muted text-muted-foreground border-border",
};

const EMPTY_MESSAGES: Record<StatusFilter, string> = {
    available: "No cars currently available.",
    reserved: "No cars reserved.",
    sold: "No cars sold yet.",
    all: "No cars listed yet.",
};

export const CarsPanel = () => {
    const [view, setView] = useState<CarsView>("list");
    const [cars, setCars] = useState<Car[]>([]);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("available");
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [statusError, setStatusError] = useState<string | null>(null);
    const [updatingCarId, setUpdatingCarId] = useState<string | null>(null);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [deletingCar, setDeletingCar] = useState<Car | null>(null);

    const loadCars = useCallback(async () => {
        setIsLoading(true);
        setLoadError(null);
        try {
            const data = await getAllCars();
            setCars(Array.isArray(data) ? data : []);
        } catch (err) {
            setLoadError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (view !== "list") return;

        loadCars();

        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 220);

        return () => clearTimeout(timer);
    }, [view, loadCars]);

    const visibleCars = useMemo(() => {
        if (statusFilter === "all") return cars;
        return cars.filter((car) => (car.status ?? "available") === statusFilter);
    }, [cars, statusFilter]);

    const backToList = () => {
        setEditingCar(null);
        setView("list");
    };

    const startEditing = (car: Car) => {
        // Both are needed: editingCar is which car, view is what renders
        setEditingCar(car);
        setView("edit");
    };

    const handleStatusChange = async (carId: string, status: CarStatus) => {
        setStatusError(null);
        setUpdatingCarId(carId);

        try {
            await updateCarStatus(carId, status);
            await loadCars();
        } catch (err) {
            setStatusError(err instanceof Error ? err.message : "Couldn't update status.");
        } finally {
            setUpdatingCarId(null);
        }
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {view === "create" && (
                    <motion.div key="create" {...viewTransition}>
                        <CreateCarPage onBack={backToList} onCreated={backToList} />
                    </motion.div>
                )}

                {view === "edit" && editingCar && (
                    <motion.div key="edit" {...viewTransition}>
                        <EditCarPage car={editingCar} onBack={backToList} onSaved={backToList} />
                    </motion.div>
                )}

                {view === "list" && (
                    <motion.div key="list" {...viewTransition}>
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                {visibleCars.length} car{visibleCars.length !== 1 ? "s" : ""}
                                {statusFilter !== "all" && ` ${statusFilter}`}
                            </p>

                            <button
                                type="button"
                                onClick={() => setView("create")}
                                className="flex w-fit cursor-pointer items-center gap-1.5 rounded-lg
                                    bg-teal-600 px-4 py-2 text-sm font-medium text-white
                                    transition-colors hover:bg-teal-700"
                            >
                                <Plus className="h-4 w-4" aria-hidden="true" />
                                Add car
                            </button>
                        </div>

                        {/* overflow-x-auto keeps four filters on one row on narrow screens */}
                        <div className="mb-5 flex gap-1 overflow-x-auto rounded-lg border border-border bg-muted/40 p-1 text-sm">
                            {STATUS_FILTERS.map((filter) => (
                                <button
                                    key={filter.value}
                                    type="button"
                                    onClick={() => setStatusFilter(filter.value)}
                                    aria-pressed={statusFilter === filter.value}
                                    className={`shrink-0 cursor-pointer rounded-md px-3 py-1.5 font-medium transition-colors ${
                                        statusFilter === filter.value
                                            ? "bg-background text-teal-700 shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {statusError && (
                            <div
                                role="alert"
                                className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                            >
                                {statusError}
                            </div>
                        )}

                        <ListState
                            isLoading={isLoading}
                            error={loadError}
                            isEmpty={visibleCars.length === 0}
                            emptyMessage={EMPTY_MESSAGES[statusFilter]}
                        />

                        {!isLoading && !loadError && visibleCars.length > 0 && (
                            <>
                                <div className="hidden overflow-hidden rounded-xl border border-border sm:block">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Vehicle</th>
                                            <th scope="col" className="px-4 py-3">Status</th>
                                            <th scope="col" className="hidden px-4 py-3 md:table-cell">Mileage</th>
                                            <th scope="col" className="px-4 py-3">Price</th>
                                            <th scope="col" className="hidden px-4 py-3 lg:table-cell">Listed</th>
                                            <th scope="col" className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                        {visibleCars.map((car) => (
                                            <tr key={car.id} className="transition-colors hover:bg-muted/40">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {car.images?.[0] ? (
                                                            <img
                                                                src={car.images[0]}
                                                                alt=""
                                                                className="h-10 w-14 rounded-md object-cover"
                                                            />
                                                        ) : (
                                                            <div className="h-10 w-14 rounded-md bg-muted" />
                                                        )}
                                                        <div className="flex min-w-0 flex-col">
                                                            {/* truncate stops a long model name pushing
                                                                    the actions column off the edge */}
                                                            <span className="max-w-[180px] truncate font-medium text-foreground">
                                                                    {car.year} {car.make} {car.model}
                                                                </span>
                                                            {car.registrationPlate && (
                                                                <span className="font-mono text-xs tracking-wide text-muted-foreground">
                                                                        {car.registrationPlate}
                                                                    </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3">
                                                    {/* A select rather than a button — there are three
                                                            states, so a toggle can't express them, and this
                                                            doubles as the status badge */}
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            value={car.status ?? "available"}
                                                            onChange={(e) =>
                                                                handleStatusChange(car.id, e.target.value as CarStatus)
                                                            }
                                                            disabled={updatingCarId === car.id}
                                                            aria-label={`Status for ${car.make} ${car.model}`}
                                                            className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs
                                                                    font-medium capitalize transition-colors
                                                                    disabled:cursor-not-allowed disabled:opacity-60
                                                                    ${STATUS_STYLES[car.status ?? "available"]}`}
                                                        >
                                                            <option value="available">Available</option>
                                                            <option value="reserved">Reserved</option>
                                                            <option value="sold">Sold</option>
                                                        </select>
                                                        {updatingCarId === car.id && (
                                                            <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" aria-hidden="true" />
                                                        )}
                                                    </div>
                                                    {car.status === "sold" && car.soldAt && (
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {formatListedDate(car.soldAt)}
                                                        </p>
                                                    )}
                                                </td>

                                                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                                                    {car.mileage.toLocaleString()} mi
                                                </td>
                                                <td className="px-4 py-3 font-medium text-foreground">
                                                    £{car.price.toLocaleString()}
                                                </td>
                                                <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                                                    {formatListedDate(car.createdAt)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex justify-end gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => startEditing(car)}
                                                            aria-label={`Edit ${car.make} ${car.model}`}
                                                            className="cursor-pointer rounded-md p-2 text-muted-foreground
                                                                    transition-colors hover:bg-muted hover:text-teal-700"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setDeletingCar(car)}
                                                            aria-label={`Delete ${car.make} ${car.model}`}
                                                            className="cursor-pointer rounded-md p-2 text-muted-foreground
                                                                    transition-colors hover:bg-destructive/10 hover:text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile card list — same data, stacked */}
                                <div className="flex flex-col gap-3 sm:hidden">
                                    {visibleCars.map((car) => (
                                        <article
                                            key={car.id}
                                            className="flex items-start gap-3 rounded-xl border border-border bg-background p-3"
                                        >
                                            {car.images?.[0] ? (
                                                <img
                                                    src={car.images[0]}
                                                    alt=""
                                                    className="h-14 w-20 shrink-0 rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="h-14 w-20 shrink-0 rounded-md bg-muted" />
                                            )}
                                            {/* min-w-0 is what lets truncate work inside a flex
                                                child — without it it won't shrink below content */}
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium text-foreground">
                                                    {car.year} {car.make} {car.model}
                                                </p>
                                                {car.registrationPlate && (
                                                    <p className="font-mono text-xs tracking-wide text-muted-foreground">
                                                        {car.registrationPlate}
                                                    </p>
                                                )}
                                                <p className="text-sm font-semibold text-foreground">
                                                    £{car.price.toLocaleString()}
                                                </p>
                                                <select
                                                    value={car.status ?? "available"}
                                                    onChange={(e) =>
                                                        handleStatusChange(car.id, e.target.value as CarStatus)
                                                    }
                                                    disabled={updatingCarId === car.id}
                                                    aria-label={`Status for ${car.make} ${car.model}`}
                                                    className={`mt-1.5 cursor-pointer rounded-full border px-2.5 py-1 text-xs
                                                        font-medium capitalize disabled:cursor-not-allowed disabled:opacity-60
                                                        ${STATUS_STYLES[car.status ?? "available"]}`}
                                                >
                                                    <option value="available">Available</option>
                                                    <option value="reserved">Reserved</option>
                                                    <option value="sold">Sold</option>
                                                </select>
                                            </div>
                                            <div className="flex shrink-0 flex-col gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => startEditing(car)}
                                                    aria-label={`Edit ${car.make} ${car.model}`}
                                                    className="cursor-pointer rounded-md p-2 text-muted-foreground
                                                        transition-colors hover:bg-muted"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeletingCar(car)}
                                                    aria-label={`Delete ${car.make} ${car.model}`}
                                                    className="cursor-pointer rounded-md p-2 text-muted-foreground
                                                        transition-colors hover:bg-destructive/10 hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {deletingCar && (
                <DeleteCarModal
                    car={deletingCar}
                    onClose={() => setDeletingCar(null)}
                    onDeleted={() => {
                        setCars((prev) => prev.filter((c) => c.id !== deletingCar.id));
                        setDeletingCar(null);
                    }}
                />
            )}
        </>
    );
};

export default CarsPanel;
