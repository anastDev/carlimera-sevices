import {useAuth} from "@/hooks/useAuth.ts";
import { Button } from "@/components/ui/button"
import {useNavigate} from "react-router";
import {LogOut} from "lucide-react";
import { toast } from "sonner";

export const LogoutButton = () => {
    const {logoutUser} = useAuth();
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) return null;

    const handleLogout = () => {
        logoutUser();
        toast.success("Signed out successfully.");
        navigate("/admin/login", {replace: true});
    }

    return (
        <>
            <div className="">
                <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="gap-1.5 bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg border-border text-sm font-medium
        transition-colors hover:border-red-600 hover:text-red-600 cursor-pointer p-4"
                >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Log out
                </Button>
            </div>
        </>
    )
}

export default LogoutButton;