import { useState, } from "react";
import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  X, ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import {type CarFormInput, type CarFormOutput, carFormSchema} from "@/schemas/car.schema.ts";
import {createCarWithImages} from "@/services/api.cars.ts";
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import TextInput from "@/components/TextInput.tsx";
import {Button} from "@/components/ui/button.tsx";
import ImageDropzone from "@/components/ImageDropZone.tsx";
import Select from "@/components/smoothui/select";
import {CATEGORY_OPTIONS, ENGINE_LOCATION_OPTIONS, FUEL_TYPE_OPTIONS, TRANSMISSION_OPTIONS} from "@/data/carData.ts";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@headlessui/react";
import {inputClass} from "@/utils/styles.ts";

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
                <section className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium text-foreground">Basic information</h3>


                    <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <Field>
                                <FieldLabel htmlFor="title">Title</FieldLabel>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => (
                                        <TextInput registration={field}
                                            id="title"
                                            aria-invalid={Boolean(errors.title)}
                                            placeholder="e.g. 2019 BMW 3 Series 320i M Sport"
                                        />
                                    )}
                                />
                                {errors.title && (
                                    <span role="alert" className="text-xs text-red-600">
                                        {errors.title.message}
                                    </span>
                                )}
                            </Field>
                        </div>

                        <Field>
                            <FieldLabel htmlFor="make">Make</FieldLabel>
                            <Controller
                                name="make"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="make" aria-invalid={Boolean(errors.make)} />
                                )}
                            />
                            {errors.make && (
                                <span role="alert" className="text-xs text-red-600">{errors.make.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="model">Model</FieldLabel>
                            <Controller
                                name="model"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="model" aria-invalid={Boolean(errors.model)} />
                                )}
                            />
                            {errors.model && (
                                <span role="alert" className="text-xs text-red-600">{errors.model.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="year">Year</FieldLabel>
                            <Controller
                                name="year"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="year" type="number" aria-invalid={Boolean(errors.year)} />
                                )}
                            />
                            {errors.year && (
                                <span role="alert" className="text-xs text-red-600">{errors.year.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="price">Price (£)</FieldLabel>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field}
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        aria-invalid={Boolean(errors.price)}
                                    />
                                )}
                            />
                            {errors.price && (
                                <span role="alert" className="text-xs text-red-600">{errors.price.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="category">Category</FieldLabel>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        placeholder="Select a category"
                                        aria-label="Category"
                                        options={CATEGORY_OPTIONS}
                                    />
                                )}
                            />
                            {errors.category && (
                                <span role="alert" className="text-xs text-red-600">{errors.category.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="location">Location</FieldLabel>
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field}
                                        id="location"
                                        placeholder="e.g. Coventry"
                                        aria-invalid={Boolean(errors.location)}
                                    />
                                )}
                            />
                            {errors.location && (
                                <span role="alert" className="text-xs text-red-600">{errors.location.message}</span>
                            )}
                        </Field>
                    </FieldGroup>
                </section>

                {/* ---- Specifications ---- */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium text-foreground">Specifications</h3>

                    <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field>
                            <FieldLabel htmlFor="engine">Engine</FieldLabel>
                            <Controller
                                name="engine"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field}
                                        id="engine"
                                        placeholder="e.g. 2.0L Turbo Petrol"
                                        aria-invalid={Boolean(errors.engine)}
                                    />
                                )}
                            />
                            {errors.engine && (
                                <span role="alert" className="text-xs text-red-600">{errors.engine.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="engineLocation">Engine location</FieldLabel>
                            <Controller
                                name="engineLocation"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        placeholder="Select engine location"
                                        aria-label="Engine location"
                                        options={ENGINE_LOCATION_OPTIONS}
                                    />
                                )}
                            />
                            {errors.engineLocation && (
                                <span role="alert" className="text-xs text-red-600">{errors.engineLocation.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="transmission">Transmission</FieldLabel>
                            <Controller
                                name="transmission"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        placeholder="Select transmission"
                                        aria-label="Transmission"
                                        options={TRANSMISSION_OPTIONS}
                                    />
                                )}
                            />
                            {errors.transmission && (
                                <span role="alert" className="text-xs text-red-600">{errors.transmission.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="fuelType">Fuel type</FieldLabel>
                            <Controller
                                name="fuelType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        placeholder="Select fuel type"
                                        aria-label="Fuel type"
                                        options={FUEL_TYPE_OPTIONS}
                                    />
                                )}
                            />
                            {errors.fuelType && (
                                <span role="alert" className="text-xs text-red-600">{errors.fuelType.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="topSpeed">Top speed (mph)</FieldLabel>
                            <Controller
                                name="topSpeed"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="topSpeed" type="number" aria-invalid={Boolean(errors.topSpeed)} />
                                )}
                            />
                            {errors.topSpeed && (
                                <span role="alert" className="text-xs text-red-600">{errors.topSpeed.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="mileage">Mileage</FieldLabel>
                            <Controller
                                name="mileage"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="mileage" type="number" aria-invalid={Boolean(errors.mileage)} />
                                )}
                            />
                            {errors.mileage && (
                                <span role="alert" className="text-xs text-red-600">{errors.mileage.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="doors">Doors</FieldLabel>
                            <Controller
                                name="doors"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="doors" type="number" aria-invalid={Boolean(errors.doors)} />
                                )}
                            />
                            {errors.doors && (
                                <span role="alert" className="text-xs text-red-600">{errors.doors.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="seats">Seats</FieldLabel>
                            <Controller
                                name="seats"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="seats" type="number" aria-invalid={Boolean(errors.seats)} />
                                )}
                            />
                            {errors.seats && (
                                <span role="alert" className="text-xs text-red-600">{errors.seats.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="carWidth">Width (m)</FieldLabel>
                            <Controller
                                name="carWidth"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field}
                                        id="carWidth"
                                        type="number"
                                        step="0.01"
                                        aria-invalid={Boolean(errors.carWidth)}
                                    />
                                )}
                            />
                            {errors.carWidth && (
                                <span role="alert" className="text-xs text-red-600">{errors.carWidth.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="carLength">Length (m)</FieldLabel>
                            <Controller
                                name="carLength"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field}
                                        id="carLength"
                                        type="number"
                                        step="0.01"
                                        aria-invalid={Boolean(errors.carLength)}
                                    />
                                )}
                            />
                            {errors.carLength && (
                                <span role="alert" className="text-xs text-red-600">{errors.carLength.message}</span>
                            )}
                        </Field>
                    </FieldGroup>
                </section>

                {/* ---- Appearance ---- */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium text-foreground">Appearance</h3>

                    <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field>
                            <FieldLabel htmlFor="exteriorColor">Exterior colour</FieldLabel>
                            <Controller
                                name="exteriorColor"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="exteriorColor" aria-invalid={Boolean(errors.exteriorColor)} />
                                )}
                            />
                            {errors.exteriorColor && (
                                <span role="alert" className="text-xs text-red-600">{errors.exteriorColor.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="interiorColor">Interior colour</FieldLabel>
                            <Controller
                                name="interiorColor"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="interiorColor" aria-invalid={Boolean(errors.interiorColor)} />
                                )}
                            />
                            {errors.interiorColor && (
                                <span role="alert" className="text-xs text-red-600">{errors.interiorColor.message}</span>
                            )}
                        </Field>
                    </FieldGroup>
                </section>

                {/* ---- History and condition ---- */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium text-foreground">History &amp; Condition</h3>

                    <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field>
                            <FieldLabel htmlFor="registration">Registration</FieldLabel>
                            <Controller
                                name="registration"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field}
                                        id="registration"
                                        placeholder="e.g. AB19 CDE"
                                        aria-invalid={Boolean(errors.registration)}
                                    />
                                )}
                            />
                            {errors.registration && (
                                <span role="alert" className="text-xs text-red-600">{errors.registration.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="motExpiry">MOT expiry</FieldLabel>
                            <Controller
                                name="motExpiry"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="motExpiry" type="date" aria-invalid={Boolean(errors.motExpiry)} />
                                )}
                            />
                            {errors.motExpiry && (
                                <span role="alert" className="text-xs text-red-600">{errors.motExpiry.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="prevOwners">Previous owners</FieldLabel>
                            <Controller
                                name="prevOwners"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="prevOwners" type="number" aria-invalid={Boolean(errors.prevOwners)} />
                                )}
                            />
                            {errors.prevOwners && (
                                <span role="alert" className="text-xs text-red-600">{errors.prevOwners.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="emissionClass">Emission class</FieldLabel>
                            <Controller
                                name="emissionClass"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field}
                                        id="emissionClass"
                                        placeholder="e.g. Euro 6"
                                        aria-invalid={Boolean(errors.emissionClass)}
                                    />
                                )}
                            />
                            {errors.emissionClass && (
                                <span role="alert" className="text-xs text-red-600">{errors.emissionClass.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="insuranceGroup">Insurance group</FieldLabel>
                            <Controller
                                name="insuranceGroup"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field}
                                        id="insuranceGroup"
                                        placeholder="e.g. 21E"
                                        aria-invalid={Boolean(errors.insuranceGroup)}
                                    />
                                )}
                            />
                            {errors.insuranceGroup && (
                                <span role="alert" className="text-xs text-red-600">{errors.insuranceGroup.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="serviceHistory">Service history</FieldLabel>
                            <Controller
                                name="serviceHistory"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field}
                                        id="serviceHistory"
                                        placeholder="e.g. Full dealer history"
                                        aria-invalid={Boolean(errors.serviceHistory)}
                                    />
                                )}
                            />
                            {errors.serviceHistory && (
                                <span role="alert" className="text-xs text-red-600">{errors.serviceHistory.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="warranty">Warranty</FieldLabel>
                            <Controller
                                name="warranty"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field}
                                               id="warranty"
                                        placeholder="e.g. 12 months"
                                        aria-invalid={Boolean(errors.warranty)}
                                    />
                                )}
                            />
                            {errors.warranty && (
                                <span role="alert" className="text-xs text-red-600">{errors.warranty.message}</span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="keys">Keys</FieldLabel>
                            <Controller
                                name="keys"
                                control={control}
                                render={({ field }) => (
                                    <TextInput registration={field} id="keys" type="number" aria-invalid={Boolean(errors.keys)} />
                                )}
                            />
                            <span className="text-xs text-muted-foreground">Leave blank if unknown</span>
                            {errors.keys && (
                                <span role="alert" className="text-xs text-red-600">{errors.keys.message}</span>
                            )}
                        </Field>
                    </FieldGroup>

                    <Field>
                        <FieldLabel htmlFor="conditionText">Condition notes</FieldLabel>
                        <Controller
                            name="conditionText"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    className={inputClass}
                                    id="conditionText"
                                    rows={3}
                                    aria-invalid={Boolean(errors.conditionText)}
                                />
                            )}
                        />
                        {errors.conditionText && (
                            <span role="alert" className="text-xs text-red-600">{errors.conditionText.message}</span>
                        )}
                    </Field>
                </section>

                {/* ---- Description and features ---- */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium text-foreground">Description &amp; features</h3>

                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    id="description"
                                    className={inputClass}
                                    rows={5}
                                    aria-invalid={Boolean(errors.description)}
                                />
                            )}
                        />
                        {errors.description && (
                            <span role="alert" className="text-xs text-red-600">{errors.description.message}</span>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="featureInput">Features</FieldLabel>
                        <div className="flex gap-2">
                            <Input
                                id="featureInput"
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                placeholder="e.g. Heated seats"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addFeature();
                                    }
                                }}
                            />
                            <Button type="button" onClick={addFeature} className="shrink-0 p-4">
                                Add
                            </Button>
                        </div>
                        <span className="text-xs text-muted-foreground">Add one at a time.</span>
                    </Field>

                    {features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {features.map((feature) => (
                                <span
                                    key={feature}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700"
                                >
                                    {feature}
                                    <button
                                        type="button"
                                        onClick={() => setFeatures((prev) => prev.filter((f) => f !== feature))}
                                        aria-label={`Remove ${feature}`}
                                        className="text-teal-500 transition-colors hover:text-teal-800"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </section>

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