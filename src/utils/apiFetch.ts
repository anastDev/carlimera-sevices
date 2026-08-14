import {deleteCookie, getCookie} from "@/utils/cookies.ts";

const  VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const TOKEN_COOKIE = "access_token";

function authHeader(): Record<string, string> {
    const token = getCookie(TOKEN_COOKIE);
    return token ? { Authorization: `Bearer ${token}` } : {};
}

interface FetchOptions extends RequestInit {

    requiresAuth?: boolean;
}

export async function apiFetch(
    path: string,
    { requiresAuth = false, headers, ...init }: FetchOptions = {},
): Promise<Response> {
    const res = await fetch(`${VITE_BASE_URL}${path}`, {
        ...init,
        headers: {
            ...headers,
            ...(requiresAuth ? authHeader() : {}),
        },
    });

    if (res.status === 401) {
        deleteCookie(TOKEN_COOKIE);
        window.location.href = "/admin/login?expired=1";
        throw new Error("Your session expired. Please sign in again.");
    }

    return res;
}

export async function errorFrom(res: Response, fallback: string): Promise<Error> {
    const body = await res.json().catch(() => null);
    return new Error(body?.detail ?? fallback);
}