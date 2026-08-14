import {Navigate, useLocation, useNavigate, useSearchParams} from "react-router";
import {useAuth} from "@/hooks/useAuth.ts";
import {useForm} from "react-hook-form";
import {type LoginFields, loginSchema} from "@/schemas/auth.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {inputClass} from "@/utils/styles.ts";
import {Input} from "@/components/ui/input.tsx";
import {Loader2} from "lucide-react";
import SmoothButton from "@/components/smoothui/smooth-button";

export const AdminLoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { loginUser, isAuthenticated, loading } = useAuth();

    const expired = searchParams.get("expired") === "1";


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: "", password: "" },
    });

    const from = (location.state as { from?: Location })?.from?.pathname ?? "/admin";

    if (!loading && isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    const onSubmit = async (data: LoginFields) => {
        try {
            await loginUser(data);
            toast.success("Signed in successfully.");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Login failed");
        }
    };

    return (
        <div className="mx-auto flex min-h-[60vh] w-full max-w-sm items-center">
            <div className="w-full rounded-lg border border-gray-200 bg-background p-6 shadow-md">
                <h1 className="text-xl font-semibold text-foreground">Admin sign in</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Enter your credentials to manage listings and bookings.
                </p>

                {expired && (
                    <p
                        role="status"
                        className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
                    >
                        Your session expired. Please sign in again.
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="username" className="text-sm font-medium text-muted-foreground">
                            Username
                        </label>
                        <Input
                            id="username"
                            type="text"
                            autoComplete="username"
                            aria-invalid={Boolean(errors.username)}
                            className={inputClass}
                            {...register("username")}
                        />
                        {errors.username && (
                            <p role="alert" className="text-xs text-red-600">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            aria-invalid={Boolean(errors.password)}
                            className={inputClass}
                            {...register("password")}
                        />
                        {errors.password && (
                            <p role="alert" className="text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <SmoothButton
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5
                            text-sm font-semibold text-white transition-colors hover:bg-teal-700
                            disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                        {isSubmitting ? "Signing in…" : "Sign in"}
                    </SmoothButton>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;