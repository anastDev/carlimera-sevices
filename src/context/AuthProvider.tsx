import {useEffect, useState} from "react";
import type {LoginFields} from "@/schemas/auth.schema.ts";
import {deleteCookie, getCookie, setCookie} from "@/utils/cookies.ts";
import { AuthContext } from "./AuthContext.ts";
import {getCurrentUser, login} from "@/services/api.user.ts";
import type {AuthUser} from "@/types/typesAuth.ts";

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const token = getCookie("access_token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const currentUser = await getCurrentUser(token);
                setAccessToken(token);
                setAuthUser(currentUser);
            } catch {
                deleteCookie("access_token");
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    const loginUser = async (fields: LoginFields) => {
        const res = await login(fields);
        const currentUser = await getCurrentUser(res.access_token);

        setCookie("access_token", res.access_token, {
            expires: res.expires_in / 86400,
            sameSite: "lax", //strict in production
            secure: import.meta.env.PROD,
            path: "/",
        });

        setAccessToken(res.access_token);
        setAuthUser(currentUser);
    };

    const logoutUser = () => {
        deleteCookie("access_token");
        setAccessToken(null);
        setAuthUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: Boolean(accessToken && authUser),
                accessToken,
                authUser,
                loading,
                loginUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}