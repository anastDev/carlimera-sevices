import { useState, useEffect, useCallback } from "react";
import {getPendingAppointmentCount} from "@/services/api.appointment.ts";
import CarsPanel from "@/components/CarsPanel.tsx";
import AppointmentsPanel from "@/components/AppointmentsPanel.tsx";
import {CalendarCheck, CarIcon} from "lucide-react";
import {Card} from "@/components/ui/card.tsx";
import { motion } from "framer-motion";
import LogoutButton from "@/components/LogoutButton.tsx";

type PanelTab = "cars" | "appointments";

const TABS: { value: PanelTab; label: string; icon: typeof CarIcon }[] = [
    { value: "cars", label: "Listings", icon: CarIcon },
    { value: "appointments", label: "Appointments", icon: CalendarCheck },
];

export const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState<PanelTab>("cars");
    const [pendingCount, setPendingCount] = useState(0);

    const loadPendingCount = useCallback(async () => {
        try {
            setPendingCount(await getPendingAppointmentCount());
        } catch {
            setPendingCount(0);
        }
    }, []);

    useEffect(() => {
        loadPendingCount();
    }, [loadPendingCount]);

    return (
        <div className="mx-auto w-full max-w-7xl min-h-screen">
            <div className="mb-6 mt-18 flex flex-row justify-between">
               <div>
                   <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
                       Admin panel
                   </h1>
                   <p className="mt-1 text-sm text-muted-foreground">
                       Manage your listings and respond to booking requests.
                   </p>
               </div>
                <div>
                    <LogoutButton/>
                </div>
            </div>

            <div role="tablist" aria-label="Admin sections" className="flex gap-1 border-b border-border">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.value;

                    return (
                        <button
                            key={tab.value}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${tab.value}`}
                            onClick={() => setActiveTab(tab.value)}
                            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium
                                transition-colors ${
                                isActive
                                    ? "text-teal-700"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            {tab.label}

                            {tab.value === "appointments" && pendingCount > 0 && (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                                    {pendingCount}
                                </span>
                            )}

                            {isActive && (
                                <motion.div
                                    layoutId="admin-tab-underline"
                                    className="absolute inset-x-0 -bottom-px h-0.5 bg-teal-600"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <Card className="mt-4 p-6 shadow-none">
                <div role="tabpanel" id={`panel-${activeTab}`}>
                    {activeTab === "cars" ? (
                        <CarsPanel />
                    ) : (
                        <AppointmentsPanel onDecisionMade={loadPendingCount} />
                    )}
                </div>
            </Card>
        </div>
    );
};

export default AdminPanel;