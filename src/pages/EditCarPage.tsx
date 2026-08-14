import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ImageIcon, Loader2, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import CarFormFields from "../components/CarFormFields.tsx";
import {type CarFormInput, type CarFormOutput, carFormSchema} from "@/schemas/car.schema.ts";
import type {Car} from "@/types/typesCar.ts";
import {deleteCarImage, editCar, uploadMultipleCarImgs} from "@/services/api.cars.ts";
import ImageDropzone from "@/components/ImageDropZone.tsx";

interface StagedImage {
    file: File;
    previewUrl: string;
}

interface EditCarPageProps {
    car: Car;
    onBack: () => void;
    onSaved: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const toFormValues = (car: Car): CarFormInput =>
    ({
        title: car.title,
        make: car.make,
        model: car.model,
        year: String(car.year),
        price: String(car.price),
        mileage: String(car.mileage),
        category: car.category,
        engine: car.engine,
        engineLocation: car.engineLocation,
        transmission: car.transmission,
        fuelType: car.fuelType,
        doors: String(car.doors),
        seats: String(car.seats),
        carWidth: car.carWidth != null ? String(car.carWidth) : "",
        carLength: car.carLength != null ? String(car.carLength) : "",
        registration: car.registration,
        motExpiry: car.motExpiry,
        location: car.location ?? "",
        exteriorColor: car.exteriorColor ?? "",
        interiorColor: car.interiorColor ?? "",
        topSpeed: car.topSpeed != null ? String(car.topSpeed) : "",
        prevOwners: String(car.prevOwners),
        emissionClass: car.emissionClass,
        insuranceGroup: car.insuranceGroup,
        serviceHistory: car.serviceHistory,
        warranty: car.warranty,
        keys: car.keys != null ? String(car.keys) : "",
        conditionText: car.conditionText,
        description: car.description,
        videoUrl: car.videoUrl ?? "",
    }) as CarFormInput;

export const EditCarPage = ({ car, onBack, onSaved }: EditCarPageProps) => {
    const [existingImages, setExistingImages] = useState<string[]>(car.images ?? []);
    const [newImages, setNewImages] = useState<StagedImage[]>([]);
    const [imageError, setImageError] = useState<string | null>(null);
    const [deletingImage, setDeletingImage] = useState<string | null>(null);

    const [features, setFeatures] = useState<string[]>(car.features ?? []);
    const [featureInput, setFeatureInput] = useState("");

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CarFormInput, unknown, CarFormOutput>({
        resolver: zodResolver(carFormSchema),
        mode: "onBlur",
        defaultValues: toFormValues(car),
    });

    useEffect(() => {
        return () => {
            newImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        };
    }, []);

    const addFeature = () => {
        const trimmed = featureInput.trim();
        if (trimmed && !features.includes(trimmed)) {
            setFeatures((prev) => [...prev, trimmed]);
            setFeatureInput("");
        }
    };

    const handleAddImages = (files: File[]) => {
        setImageError(null);
        const valid: StagedImage[] = [];

        for (const file of files) {
            if (!ACCEPTED_TYPES.includes(file.type)) {
                setImageError(`"${file.name}" isn't a supported image type.`);
                continue;
            }
            if (file.size > MAX_FILE_SIZE) {
                setImageError(`"${file.name}" is over the 10MB limit.`);
                continue;
            }
            valid.push({ file, previewUrl: URL.createObjectURL(file) });
        }

        setNewImages((prev) => [...prev, ...valid]);
    };

    const handleRemoveNewImage = (index: number) => {
        setNewImages((prev) => {
            URL.revokeObjectURL(prev[index].previewUrl);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleDeleteExistingImage = async (imageUrl: string) => {
        setImageError(null);
        setDeletingImage(imageUrl);

        try {
            await deleteCarImage(car.id, imageUrl);
            setExistingImages((prev) => prev.filter((url) => url !== imageUrl));
        } catch (err) {
            setImageError(err instanceof Error ? err.message : "Couldn't delete that photo.");
        } finally {
            setDeletingImage(null);
        }
    };

    const onSubmit = async (values: CarFormOutput) => {
        setSubmitError(null);
        setSubmitSuccess(false);

        if (existingImages.length === 0 && newImages.length === 0) {
            setImageError("A listing needs at least one photo.");
            return;
        }

        try {
            await editCar(car.id, values, features);

            if (newImages.length > 0) {
                const result = await uploadMultipleCarImgs(
                    car.id,
                    newImages.map((img) => img.file),
                );

                if (result.failed > 0) {
                    setSubmitError(
                        `Details saved, but ${result.failed} of ${result.total} new photos failed to upload.`,
                    );
                }
            }

            newImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));
            setNewImages([]);
            setSubmitSuccess(true);
            onSaved();
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
        }
    };

    return (
        <div className="mx-auto w-full max-w-3xl mt-2">
            <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground
                    transition-colors hover:text-teal-700"
            >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Go Back
            </Button>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                    Edit {car.year} {car.make} {car.model}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Update the vehicle details or manage its photos.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
                <CarFormFields
                    control={control}
                    errors={errors}
                    features={features}
                    featureInput={featureInput}
                    onFeatureInputChange={setFeatureInput}
                    onAddFeature={addFeature}
                    onRemoveFeature={(feature) =>
                        setFeatures((prev) => prev.filter((f) => f !== feature))
                    }
                />

                {/* ---- Photos ---- */}
                <section className="flex flex-col gap-4">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-foreground">
                        <ImageIcon className="h-5 w-5 text-teal-600" aria-hidden="true" />
                        Photos
                    </h3>

                    {existingImages.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium text-muted-foreground">
                                Current photos
                            </p>
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                                {existingImages.map((url, index) => {
                                    const isDeleting = deletingImage === url;
                                    const isLast = existingImages.length === 1 && newImages.length === 0;

                                    return (
                                        <div
                                            key={url}
                                            className="group relative aspect-square overflow-hidden rounded-lg border border-border"
                                        >
                                            <img
                                                src={url}
                                                alt={`Car photo ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                            {!isLast && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteExistingImage(url)}
                                                    disabled={isDeleting}
                                                    aria-label={`Delete photo ${index + 1}`}
                                                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center
                                                        rounded-full bg-black/60 text-white opacity-0 transition-opacity
                                                        focus:opacity-100 group-hover:opacity-100 disabled:opacity-100"
                                                >
                                                    {isDeleting ? (
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Deleting a photo removes it immediately — it isn't undone by
                                leaving without saving.
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-muted-foreground">Add more photos</p>
                        <ImageDropzone
                            images={newImages}
                            onAdd={handleAddImages}
                            onRemove={handleRemoveNewImage}
                            error={imageError}
                        />
                    </div>
                </section>

                {/* ---- Submit ---- */}
                <div className="flex flex-col gap-3 border-t border-border pt-6">
                    {submitError && (
                        <p role="alert" className="flex items-start gap-2 text-sm text-red-600">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                            {submitError}
                        </p>
                    )}
                    {submitSuccess && (
                        <p role="status" className="text-sm text-teal-700">
                            Listing updated.
                        </p>
                    )}

                    <div className="flex gap-2">
                        <Button type="submit" disabled={isSubmitting} className="gap-2">
                            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                            {isSubmitting ? "Saving…" : "Save changes"}
                        </Button>
                        <Button type="button" variant="outline" onClick={onBack}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditCarPage;