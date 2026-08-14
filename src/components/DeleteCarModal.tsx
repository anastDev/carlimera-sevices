import {useEffect, useState} from "react";
import {AlertTriangle, Loader2} from "lucide-react";
import type {Car} from "@/types/typesCar.ts";
import {deleteCar} from "@/services/api.cars.ts";
import {Button} from "@/components/ui/button.tsx";

interface DeleteCarModalProps {
    car: Car;
    onClose: () => void;
    onDeleted: () => void;
}

export const DeleteCarModal = ({ car, onClose, onDeleted }: DeleteCarModalProps)=>  {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    useEffect(() => {
        const onEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onEscape);
        return () => document.removeEventListener("keydown", onEscape);
    }, [onClose]);

    const handleDelete = async () => {
        setIsDeleting(true);
        setDeleteError(null);
        try {
            await deleteCar(car.id);
            onDeleted();
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Confirm deletion"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-3 flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                    <h2 className="text-base font-semibold">Delete this listing?</h2>
                </div>
                <p className="text-sm text-gray-600">
                    This permanently removes the {car.year} {car.make} {car.model} listing. This
                    can't be undone!
                </p>

                {deleteError && <p role="alert" className="mt-3 text-sm text-red-600">{deleteError}</p>}

                <div className="mt-6 flex justify-end gap-2">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium
                            text-accent transition-colors hover:bg-primary/80"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex items-center gap-1.5 rounded-lg bg-red-700 px-4 py-2 text-sm
                            font-medium text-white transition-colors hover:bg-red-600
                            disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isDeleting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
