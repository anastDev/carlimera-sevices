import {createContext} from "react";
import type {LoginFields} from "@/schemas/auth.schema.ts";
import type {AuthUser} from "@/types/typesAuth.ts";

type AuthContextProps = {
    isAuthenticated: boolean;
    accessToken: string | null;
    authUser: AuthUser | null;
    loginUser: (fields: LoginFields) => Promise<void>;
    loading: boolean;
    logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);