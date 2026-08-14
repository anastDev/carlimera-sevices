export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export interface JwtPayload {
    id?: string,
    username?: string;
    email?:string;
}

export interface AuthUser {
    id: string;
    username: string;
    email: string;
    role: string;
}

