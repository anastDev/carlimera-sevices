const YOUTUBE_ID_PATTERN = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;

export function getYouTubeId(url: string): string | null {
    const match = url.match(YOUTUBE_ID_PATTERN);
    return match ? match[1] : null;
}

export function toEmbedUrl(url: string): string | null {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function toThumbnailUrl(url: string): string | null {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
}