export interface ReviewPerson {
    displayName: string;
    uri: string;
    photoUri: string;
}

export interface Review {
    name: string;
    publishTime: string;
    rating: number;
    text: {text: string; languageCode: string;}
    authorAttribution: string;
}