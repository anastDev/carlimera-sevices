import {Toaster} from "sonner";
import {BrowserRouter as Router} from "react-router";
import AppShell from "@/components/AppShell.tsx";

export default function App() {
    return (
        <>
            <Router>
                <AppShell />
            </Router>
            <Toaster richColors position="top-center" toastOptions={{ className: "z-[80]" }} />
        </>
    );
};