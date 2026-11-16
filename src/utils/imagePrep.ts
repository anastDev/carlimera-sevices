import imageCompression from "browser-image-compression";
import heic2any from "heic2any";

const MAX_COMPRESSED_BYTES = 2 * 1024 * 1024;

const isHeic = (file: File) =>
    /\.(heic|heif)$/i.test(file.name) ||
    file.type === "image/heic" ||
    file.type === "image/heif";

const browserCanRead = (file: File): Promise<boolean> =>
    new Promise((resolve) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(true);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(false);
        };
        img.src = url;
    });

async function toJpegIfNeeded(file: File): Promise<File> {
    if (!isHeic(file)) return file;

    if (await browserCanRead(file)) return file;

    const blob = (await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 })) as Blob;
    return new File([blob], file.name.replace(/\.(heic|heif)$/i, ".jpg"), {
        type: "image/jpeg",
    });
}

export async function prepareImage(file: File): Promise<File> {
    try {
        const source = await toJpegIfNeeded(file);

        const compressed = await imageCompression(source, {
            maxWidthOrHeight: 1600,
            maxSizeMB: 0.5,
            useWebWorker: true,
            fileType: "image/jpeg",
        });

        if (compressed.size > MAX_COMPRESSED_BYTES) {
            throw new Error("compression didn't shrink it");
        }

        // Always a proper File with a .jpg name, so the server accepts it.
        const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
        return new File([compressed], name, { type: "image/jpeg" });
    } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`"${file.name}" couldn't be prepared (${reason}).`);
    }
}

export async function prepareImages(
    files: File[],
    onProgress?: (done: number, total: number) => void,
): Promise<File[]> {
    const prepared: File[] = [];
    for (const file of files) {
        onProgress?.(prepared.length + 1, files.length);
        prepared.push(await prepareImage(file));
    }
    return prepared;
}