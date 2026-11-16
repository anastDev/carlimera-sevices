import {type ChangeEvent, useCallback, useRef, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {UploadCloud, X} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";


interface StagedImage {
    file: File;
    previewUrl: string;
}

const BASE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const HEIC_TYPES = ["image/heic", "image/heif", ".heic", ".heif"];

const isAppleMobile =
    typeof navigator !== "undefined" &&
    (/iPhone|iPad|iPod/.test(navigator.userAgent) ||
        (navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1));

const ACCEPTED_TYPES = isAppleMobile ? BASE_TYPES : [...BASE_TYPES, ...HEIC_TYPES];

interface ImageDropzoneProps {
    images: StagedImage[];
    onAdd: (files: File[]) => void;
    onRemove: (index: number) => void;
    error: string | null;
}

export const ImageDropzone = ({ images, onAdd, onRemove, error }: ImageDropzoneProps) =>  {
    const [isDragActive, setIsDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(
        (fileList: FileList | null) => {
            if (!fileList) return;
            onAdd(Array.from(fileList));
        },
        [onAdd],
    );

    return (
        <div className="flex flex-col gap-3">
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragActive(true);
                }}
                onDragLeave={() => setIsDragActive(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragActive(false);
                    handleFiles(e.dataTransfer.files);
                }}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        inputRef.current?.click();
                    }
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload car photos"
                className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl
                    border-2 border-dashed px-6 py-10 text-center transition-colors sm:py-14 ${
                    isDragActive
                        ? "border-primary bg-primary/10"
                        : "border-border bg-muted/50 hover:border-primary/40 hover:bg-muted"
                }`}
            >
                <UploadCloud className="h-8 w-8 text-primary" aria-hidden="true" />
                <div>
                    <p className="text-sm font-medium text-foreground">
                        Drag and drop or <span className="text-primary underline">browse</span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, WEBP or HEIC — photos are resized automatically</p>
                </div>
                <Input
                    ref={inputRef}
                    type="file"
                    accept={ACCEPTED_TYPES.join(",")}
                    multiple
                    className="hidden"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleFiles(e.target.files);
                        e.target.value = "";
                    }}
                />
            </div>

            {error && (
                <p role="alert" className="text-sm text-destructive">
                    {error}
                </p>
            )}

            {images.length > 0 && (
                <>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                        {images.map((img, index) => (
                            <div
                                key={img.previewUrl}
                                className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                            >
                                <img
                                    src={img.previewUrl}
                                    alt={`Car photo ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                                <Button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(index);
                                    }}
                                    aria-label={`Remove photo ${index + 1}`}
                                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center
        rounded-full bg-black/60 text-white transition-opacity
        [@media(hover:hover)]:opacity-0 focus:opacity-100 group-hover:opacity-100"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {images.length} photo{images.length !== 1 ? "s" : ""} ready. The first
                        becomes the listing's main image.
                    </p>
                </>
            )}
        </div>
    );
}

export default ImageDropzone;