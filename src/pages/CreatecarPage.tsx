import { useState, } from "react";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import {type CarFormInput, type CarFormOutput, carFormSchema} from "@/schemas/car.schema.ts";
import {createCarWithImages} from "@/services/api.cars.ts";
import {Button} from "@/components/ui/button.tsx";
import ImageDropzone from "@/components/ImageDropZone.tsx";
import CarFormFields from "@/components/CarFormFields.tsx";

interface StagedImage {
    file: File;
    previewUrl: string;
}

interface CreateCarPageProps {
    onBack?: () => void;
    onCreated?: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const DEFAULT_VALUES: CarFormInput = {
        title: "",
        subtitle: "",
        make: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        category: "",
        location: "",
        engine: "",
        engineLocation: "",
        transmission: "",
        fuelType: "",
        topSpeed: "",
        doors: "",
        seats: "",
        carWidth: "",
        carLength: "",
        exteriorColor: "",
        interiorColor: "",
        registration: "",
        motExpiry: "",
        prevOwners: "",
        emissionClass: "",
        insuranceGroup: "",
        serviceHistory: "",
        warranty: "",
        keys: "",
        conditionText: "",
        description: "",
    }

export const CreateCarPage = ({ onBack, onCreated }: CreateCarPageProps) =>  {
    const [images, setImages] = useState<StagedImage[]>([]);
    const [imageError, setImageError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CarFormInput, unknown, CarFormOutput>({
        resolver: zodResolver(carFormSchema),
        mode: "onBlur",
        defaultValues: DEFAULT_VALUES,
    });

    const [features, setFeatures] = useState<string[]>([]);
    const [featureInput, setFeatureInput] = useState("");

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

        setImages((prev) => [...prev, ...valid]);
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => {
            URL.revokeObjectURL(prev[index].previewUrl);
            return prev.filter((_, i) => i !== index);
        });
    };

    const onSubmit = async (values: CarFormOutput) => {
        setSubmitError(null);
        setImageError(null);
        setSubmitSuccess(false);

        if (images.length === 0) {
            setImageError("Add at least one photo before publishing this listing.");
            return;
        }

        try {
            await createCarWithImages(
                values,
                features,
                images.map((img) => img.file),
            );

            reset();
            setFeatures([]);
            images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
            setImages([]);
            setSubmitSuccess(true);

            onCreated?.();
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
        }
    };

    return (
        <div className="mx-auto w-full max-w-3xl">
            {onBack && (
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onBack}
                    className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground
                        transition-colors hover:text-teal-700"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to listings
                </Button>
            )}

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Add a new car</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Fill in the vehicle details and upload photos to publish a listing.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">

                {/* ---- Basic information ---- */}
                <CarFormFields
                    control={control}
                    errors={errors}
                    features={features}
                    featureInput={featureInput}
                    onFeatureInputChange={setFeatureInput}
                    onAddFeature={addFeature}
                    onRemoveFeature={(feature) => setFeatures((prev) => prev.filter((f) => f !== feature))}
                />

                {/* ---- Photos ---- */}
                <section className="flex flex-col gap-4">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-foreground">
                        <ImageIcon className="h-5 w-5 text-teal-600" aria-hidden="true" />
                        Photos
                    </h3>
                    <ImageDropzone
                        images={images}
                        onAdd={handleAddImages}
                        onRemove={handleRemoveImage}
                        error={imageError}
                    />
                </section>

                {/* ---- Submit ---- */}
                <div className="flex flex-col gap-3 border-t border-border pt-6">
                    {submitError && (
                        <p role="alert" className="text-sm text-red-600">
                            {submitError}
                        </p>
                    )}
                    {submitSuccess && (
                        <p role="status" className="text-sm text-teal-700">
                            Listing created successfully.
                        </p>
                    )}

                    <Button type="submit" disabled={isSubmitting || images.length === 0} className="gap-2 sm:w-fit py-5 px-4">
                        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                        {isSubmitting ? "Creating listing…" : "Create listing"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateCarPage;