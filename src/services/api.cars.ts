import type { CarFormOutput} from "@/schemas/car.schema.ts";
import type {Car} from "@/types/typesCar.ts";
import type {MultipleImgsUploadApiResponse} from "@/types/typesImages.ts";
import {apiFetch, errorFrom} from "@/utils/apiFetch";

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


export async function createCarWithImages(
    values: CarFormOutput,
    features: string[],
    files: File[],
): Promise<Car> {
    const formData = new FormData();
    formData.append("car_json", JSON.stringify({ ...values, features }));
    files.forEach((file) => formData.append("files", file));

    const res = await apiFetch("/cars/", {
        method: "POST",
        requiresAuth: true,
        body: formData,
    });

    if (!res.ok) throw await errorFrom(res, "Couldn't create this listing.");

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

export async function uploadMultipleCarImgs(
    carId: string,
    files: File[],
): Promise<MultipleImgsUploadApiResponse> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await apiFetch(`/cars/${carId}/images/upload/multiple`, {
        method: "POST",
        requiresAuth: true,
        body: formData,
    });

    if (!res.ok) throw await errorFrom(res, "The photos failed to upload.");

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