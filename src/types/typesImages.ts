export type ImgResultResponse = {
    originalName: string;
    url: string;
    status: string;
    error: string;
}

export interface MultipleImgsUploadApiResponse {
    total: number;
    successful: number;
    failed: number;
    results: ImgResultResponse[];
}