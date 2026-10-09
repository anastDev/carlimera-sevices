import imageCompression from "browser-image-compression";
import heic2any from "heic2any";

async function toJpegIfHeic(file: File): Promise<File> {
    const isHeic =
        /\.(heic|heif)$/i.test(file.name) ||
        file.type === "image/heic" ||
        file.type === "image/heif";

    if (!isHeic) return file;

    const blob = (await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 })) as Blob;
    return new File([blob], file.name.replace(/\.(heic|heif)$/i, ".jpg"), {
        type: "image/jpeg",
    });
}


export async function prepareImage(file: File): Promise<File> {
    const jpeg = await toJpegIfHeic(file);
    const compressed = await imageCompression(jpeg, {
        maxWidthOrHeight: 1600,
        maxSizeMB: 0.5,
        useWebWorker: true,
        fileType: "image/jpeg",
    });

    if (compressed.size > 2 * 1024 * 1024) {
        throw new Error(
            `"${file.name}" couldn't be compressed. If it's a HEIC photo from an ` +
            `iPhone, try Safari, or set Settings → Camera → Formats → Most Compatible.`
        );
    }

    return new File(
        [compressed],
        file.name.replace(/\.[^.]+$/, "") + ".jpg",
        { type: "image/jpeg" },
    );
}

export async function prepareImages(files: File[]): Promise<File[]> {
    return Promise.all(files.map(prepareImage));
}