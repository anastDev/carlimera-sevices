import type { CarFormOutput} from "@/schemas/car.schema.ts";
import type {Car, CarStatus} from "@/types/typesCar.ts";
import type {MultipleImgsUploadApiResponse} from "@/types/typesImages.ts";
import {apiFetch, errorFrom} from "@/utils/apiFetch";
import {prepareImages} from "@/utils/imagePrep.ts";

export async function getCars(): Promise<Car[]> {
    const res = await apiFetch("/cars/");

    if (!res.ok) throw await errorFrom(res, "Couldn't load listings.");

    const data = await res.json();

    return Array.isArray(data) ? data : [];
}

export async function getCarById(carId: string): Promise<Car> {
    const res = await apiFetch(`/cars/${carId}`);

    if (!res.ok) throw await errorFrom(res, "Couldn't load this listing.");

    return res.json();
}


const BATCH_SIZE = 5;

export async function createCarWithImages(
    values: CarFormOutput,
    features: string[],
    files: File[],
    onProgress?: (done: number, total: number) => void,
): Promise<Car> {
    const prepared = await prepareImages(files);
    const [first, ...rest] = prepared;

    const formData = new FormData();
    formData.append("car_json", JSON.stringify({ ...values, features }));
    formData.append("files", first);

    const res = await apiFetch("/cars/with-images", {
        method: "POST",
        requiresAuth: true,
        body: formData,
    });

    if (!res.ok) throw await errorFrom(res, "Couldn't create this listing.");

    const car: Car = await res.json();
    onProgress?.(1, prepared.length);

    if (rest.length > 0) {
        await sendImagesInBatches(car.id, rest, (done) =>
            onProgress?.(done + 1, prepared.length),
        );
    }

    return car;
}

async function sendImagesInBatches(
    carId: string,
    prepared: File[],
    onProgress?: (done: number, total: number) => void,
): Promise<void> {
    for (let i = 0; i < prepared.length; i += BATCH_SIZE) {
        const batch = prepared.slice(i, i + BATCH_SIZE);
        await uploadMultipleCarImgs(carId, batch);
        onProgress?.(Math.min(i + BATCH_SIZE, prepared.length), prepared.length);
    }
}

export async function uploadMultipleCarImgs(
    carId: string,
    files: File[],
): Promise<MultipleImgsUploadApiResponse> {
    const prepared = await prepareImages(files);

    const formData = new FormData();
    prepared.forEach((file) => formData.append("files", file));

    const res = await apiFetch(`/cars/${carId}/images/upload/multiple`, {
        method: "POST",
        requiresAuth: true,
        body: formData,
    });

    if (!res.ok) throw await errorFrom(res, "The photos failed to upload.");

    return res.json();
}

export async function editCar(carId: string, values: CarFormOutput, features: string[]): Promise<Car> {
    const res = await apiFetch(`/cars/${carId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        requiresAuth: true,
        body: JSON.stringify({...values, features}),
    });

    if (!res.ok) throw await errorFrom(res, "Couldn't update this listing.");

    return res.json();
}

export async function deleteCar(carId: string): Promise<{ message: string }> {
    const res = await apiFetch(`/cars/${carId}`, {
        method: "DELETE",
        requiresAuth: true,
    });

    if (!res.ok) throw await errorFrom(res, "Couldn't delete this listing.");

    return res.json();
}

export async function deleteCarImage(
    carId: string,
    imageUrl: string,
): Promise<{ message: string }> {
    const params = new URLSearchParams({ image_url: imageUrl });

    const res = await apiFetch(`/cars/${carId}/images?${params}`, {
        method: "DELETE",
        requiresAuth: true,
    });

    if (!res.ok) throw await errorFrom(res, "Couldn't delete this photo.");

    return res.json();
}

export async function updateCarStatus(carId: string, status: CarStatus): Promise<Car> {
    const res = await apiFetch(`/cars/${carId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        requiresAuth: true,
        body: JSON.stringify({ status }),
    });

    if (!res.ok) throw await errorFrom(res, "Couldn't update this car's status.");
    return res.json();
}

export async function getAllCars(): Promise<Car[]> {
    const res = await apiFetch("/cars/all", { requiresAuth: true });
    if (!res.ok) throw await errorFrom(res, "Couldn't load listings.");

    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

export async function recordCarView(carId: string, visitorId: string): Promise<void> {
    await apiFetch(`/cars/${carId}/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId }),
    });
}