import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Select from "@/components/smoothui/select";
import { X } from "lucide-react";
import type {CarFormInput} from "@/schemas/car.schema.ts";
import {CATEGORY_OPTIONS, ENGINE_LOCATION_OPTIONS, FUEL_TYPE_OPTIONS, TRANSMISSION_OPTIONS} from "@/data/carData.ts";


interface CarFormFieldsProps {
    control: Control<CarFormInput>;
    errors: FieldErrors<CarFormInput>;
    features: string[];
    featureInput: string;
    onFeatureInputChange: (value: string) => void;
    onAddFeature: () => void;
    onRemoveFeature: (feature: string) => void;
}


export const CarFormFields = ({
                                  control,
                                  errors,
                                  features,
                                  featureInput,
                                  onFeatureInputChange,
                                  onAddFeature,
                                  onRemoveFeature,
                              }: CarFormFieldsProps) => {
    return (
        <>
            {/* ---- Basic information ---- */}
            <section className="flex flex-col gap-4">
                <h3 className="text-lg font-medium text-foreground">Basic information</h3>
                <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="title"
                                    aria-invalid={Boolean(errors.title)}
                                    placeholder="e.g. Hyundai ix35"
                                />
                            )}
                        />
                        {errors.title && (
                            <span role="alert" className="text-xs text-red-600">{errors.title.message}</span>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="title">Subtitle</FieldLabel>
                        <Controller
                            name="subtitle"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="subtitle"
                                    aria-invalid={Boolean(errors.subtitle)}
                                    placeholder="e.g. 1.7 CRDi Style Euro 5 (s/s) 5dr"
                                />
                            )}
                        />
                        {errors.subtitle && (
                            <span role="alert" className="text-xs text-red-600">{errors.subtitle.message}</span>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="make">Make</FieldLabel>
                        <Controller
                            name="make"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} id="make" aria-invalid={Boolean(errors.make)} />
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
                                <Input {...field} id="model" aria-invalid={Boolean(errors.model)} />
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
                                <Input {...field}
                                       id="year"
                                       type="number"
                                       value={(field.value ?? "") as string}
                                       aria-invalid={Boolean(errors.year)} />
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
                                <Input {...field} id="price" type="number"  value={(field.value ?? "") as string} aria-invalid={Boolean(errors.price)} />
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
                                <Input {...field} id="location" placeholder="e.g. Coventry" aria-invalid={Boolean(errors.location)} />
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
                                <Input {...field} id="engine" placeholder="e.g. 2.0L Turbo Petrol" aria-invalid={Boolean(errors.engine)} />
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
                                <Input {...field} id="topSpeed" type="number" value={(field.value ?? "") as string} aria-invalid={Boolean(errors.topSpeed)} />
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
                                <Input {...field} id="mileage" type="number"  value={(field.value ?? "") as string} aria-invalid={Boolean(errors.mileage)} />
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
                                <Input  {...field} id="doors" type="number"  value={(field.value ?? "") as string} aria-invalid={Boolean(errors.doors)} />
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
                                <Input  {...field} id="seats" type="number"  value={(field.value ?? "") as string} aria-invalid={Boolean(errors.seats)} />
                            )}
                        />
                        {errors.seats && (
                            <span role="alert" className="text-xs text-red-600">{errors.seats.message}</span>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="carWidth">Width (mm)</FieldLabel>
                        <Controller
                            name="carWidth"
                            control={control}
                            render={({ field }) => (
                                <Input  {...field} id="carWidth" type="number" value={(field.value ?? "") as string} aria-invalid={Boolean(errors.carWidth)} />
                            )}
                        />
                        {errors.carWidth && (
                            <span role="alert" className="text-xs text-red-600">{errors.carWidth.message}</span>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="carLength">Length (mm)</FieldLabel>
                        <Controller
                            name="carLength"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} id="carLength" type="number"  value={(field.value ?? "") as string} aria-invalid={Boolean(errors.carLength)} />
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
                                <Input {...field} id="exteriorColor" aria-invalid={Boolean(errors.exteriorColor)} />
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
                                <Input {...field} id="interiorColor" aria-invalid={Boolean(errors.interiorColor)} />
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
                <h3 className="text-lg font-medium text-foreground">History &amp; condition</h3>

                <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="registration">Registration</FieldLabel>
                        <Controller
                            name="registration"
                            control={control}
                            render={({ field }) => (
                                <Input  {...field} id="registration"  value={(field.value ?? "") as string} placeholder="e.g. AB19 CDE" aria-invalid={Boolean(errors.registration)} />
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
                                <Input  {...field} id="motExpiry"  value={(field.value ?? "") as string} aria-invalid={Boolean(errors.motExpiry)} />
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
                                <Input  {...field} id="prevOwners" aria-invalid={Boolean(errors.prevOwners)} />
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
                                <Input {...field} id="emissionClass" placeholder="e.g. Euro 6" aria-invalid={Boolean(errors.emissionClass)} />
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
                                <Input {...field} id="insuranceGroup" placeholder="e.g. 21E" aria-invalid={Boolean(errors.insuranceGroup)} />
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
                                <Input {...field} id="serviceHistory" placeholder="e.g. Full dealer history" aria-invalid={Boolean(errors.serviceHistory)} />
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
                                <Input {...field} id="warranty" placeholder="e.g. 12 months" aria-invalid={Boolean(errors.warranty)} />
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
                                <Input {...field} id="keys" aria-invalid={Boolean(errors.keys)} />
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
                            <Textarea {...field} id="conditionText" rows={3} aria-invalid={Boolean(errors.conditionText)} />
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
                            <Textarea {...field} id="description" rows={5} aria-invalid={Boolean(errors.description)} />
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
                            onChange={(e) => onFeatureInputChange(e.target.value)}
                            placeholder="e.g. Heated seats"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    onAddFeature();
                                }
                            }}
                        />
                        <Button type="button" onClick={onAddFeature} className="shrink-0">
                            Add
                        </Button>
                    </div>
                    <span className="text-xs text-muted-foreground">Add one at a time</span>
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
                                    onClick={() => onRemoveFeature(feature)}
                                    aria-label={`Remove ${feature}`}
                                    className="text-teal-500 transition-colors hover:text-teal-800"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                <Field>
                    <FieldLabel htmlFor="videoUrl">Video walkaround</FieldLabel>
                    <Controller
                        name="videoUrl"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="videoUrl"
                                placeholder="https://www.youtube.com/watch?v=..."
                                aria-invalid={Boolean(errors.videoUrl)}
                            />
                        )}
                    />
                    <span className="text-xs text-muted-foreground">Optional — paste a YouTube link</span>
                    {errors.videoUrl && (
                        <span role="alert" className="text-xs text-red-600">{errors.videoUrl.message}</span>
                    )}
                </Field>
            </section>
        </>
    );
};

export default CarFormFields;