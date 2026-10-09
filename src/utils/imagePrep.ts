import imageCompression from "browser-image-compression";


export async function prepareImage(file: File): Promise<File> {
    return imageCompression(file, {
        maxWidthOrHeight: 1600,
        maxSizeMB: 0.5,
        useWebWorker: true,
        fileType: "image/jpeg",
    });
}

export async function prepareImages(files: File[]): Promise<File[]> {
    return Promise.all(files.map(prepareImage));
}