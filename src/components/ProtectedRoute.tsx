import {Navigate, Outlet, useLocation,} from "react-router";
import {useAuth} from "@/hooks/useAuth.ts";
import {UnauthorizedPage} from "@/pages/UnauthorizedPage.tsx";

const ProtectedRoute = () => {
    const { isAuthenticated, loading, authUser } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center text-gray-400">
                Loading…
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    
    if (authUser?.role !== "admin") {
        return (
            <UnauthorizedPage
                title="Admins only"
                message="This area is restricted to administrators."
            />
        );
    }
    return <Outlet/>
}

export default ProtectedRoute;