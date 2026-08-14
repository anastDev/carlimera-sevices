import type {LoginFields} from "@/schemas/auth.schema.ts";
import type {AuthUser, LoginResponse} from "@/types/typesAuth.ts";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export async function login({username, password}: LoginFields): Promise<LoginResponse> {
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    const res = await fetch(VITE_BASE_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    if(!res.ok) {
        let detail = "Login Failed";
        try {
            const data = await res.json();
            if (typeof data?.detail === "string") detail = data.detail;
        } catch(error) {
            console.error(error);
        }
        throw new Error(detail);
    }
    return await res.json();
}

export async function getCurrentUser(token: string): Promise<AuthUser> {
    try {
        const res = await fetch(VITE_BASE_URL + "/users/me", {
            headers: {Authorization: `Bearer ${token}`}
        });

        if(!res.ok) {
            throw new Error("Couldn't load current user.");
        }
        return res.json();
    } catch (err : any) {
        console.error(err);
        throw err;
    }
}