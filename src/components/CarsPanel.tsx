import {Pencil, Plus, Trash2} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import CreateCarPage from "@/pages/CreatecarPage.tsx";
import ListState from "@/components/ListState.tsx";
import {DeleteCarModal} from "@/components/DeleteCarModal.tsx";
import type {Car} from "@/types/typesCar.ts";
import {getCars} from "@/services/api.cars.ts";
import EditCarPage from "@/pages/EditCarPage.tsx";
import { motion, AnimatePresence } from "framer-motion";
import {formatListedDate} from "@/utils/dates.ts";

type CarsView = "list" | "create" | "edit";

export const CarsPanel = () => {
    const [view, setView] = useState<CarsView>("list");
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [deletingCar, setDeletingCar] = useState<Car | null>(null);

    const loadCars = useCallback(async () => {
        setIsLoading(true);
        setLoadError(null);
        try {
            const data = await getCars();
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

    const backToList = () => {
        setEditingCar(null);
        setView("list");
    };

    const startEditing = (car: Car) => {
        setEditingCar(car);
        setView("edit");
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {view === "create" && (
                    <motion.div
                        key="create"
                                 initial={{ opacity: 0, y: 12 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, y: -12 }}
                                 transition={{ duration: 0.2, ease: "easeOut" }}>
                        <CreateCarPage onBack={backToList} onCreated={backToList} />
                    </motion.div>
                )}

                {view === "edit" && editingCar && (
                    <motion.div  key="edit"
                                 initial={{ opacity: 0, y: 12 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, y: -12 }}
                                 transition={{ duration: 0.2, ease: "easeOut" }}>
                        <EditCarPage car={editingCar} onBack={backToList} onSaved={backToList} />
                    </motion.div>
                )}

                {view === "list" && (
                    <motion.div  key="list"
                                 initial={{ opacity: 0, y: 12 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, y: -12 }}
                                 transition={{ duration: 0.2, ease: "easeOut" }}>
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                {cars.length} car{cars.length !== 1 ? "s" : ""} listed
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

                        <ListState
                            isLoading={isLoading}
                            error={loadError}
                            isEmpty={cars.length === 0}
                            emptyMessage="No cars listed yet."
                        />

                        {!isLoading && !loadError && cars.length > 0 && (
                            <>
                                <div className="hidden overflow-hidden rounded-xl border border-border sm:block">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Vehicle</th>
                                            <th scope="col" className="px-4 py-3">Category</th>
                                            <th scope="col" className="hidden px-4 py-3 md:table-cell">Mileage</th>
                                            <th scope="col" className="px-4 py-3">Price</th>
                                            <th scope="col" className="hidden px-4 py-3 lg:table-cell">Listed</th>
                                            <th scope="col" className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                        {cars.map((car) => (
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
                                                        <span className="max-w-[180px] truncate font-medium text-foreground">
                                                                {car.year} {car.make} {car.model}
                                                            </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">{car.category}</td>
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

                                {/* Mobile card list*/}
                                <div className="flex flex-col gap-3 sm:hidden">
                                    {cars.map((car) => (
                                        <article
                                            key={car.id}
                                            className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
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
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium text-foreground">
                                                    {car.year} {car.make} {car.model}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {car.category} · {car.mileage.toLocaleString()} mi
                                                </p>
                                                <p className="text-sm font-semibold text-foreground">
                                                    £{car.price.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Listed {formatListedDate(car.createdAt).toLowerCase()}
                                                </p>
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
