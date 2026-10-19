import {type ReactNode, useLayoutEffect, useState} from "react";
import {Navigate, Route, Routes, useLocation} from "react-router";
import HomePage from "@/pages/Homepage.tsx";
import AboutPage from "@/pages/Aboutpage.tsx";
import ContactPage from "@/pages/Contactpage.tsx";
import Footer from "@/components/layout/Footer.tsx";
import Header from "@/components/layout/header/Header.tsx";
import InventoryPage from "@/pages/InventoryPage.tsx";
import CarPage from "@/pages/CarPage.tsx";
import type {Car} from "@/types/typesCar.ts";
import BookingDialog from "@/components/BookingDialog.tsx";
import {WhatsAppButton} from "@/components/WhatsAppButton.tsx";
import AdminPanel from "@/pages/AdminPanel.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import AdminLoginPage from "@/pages/AdminLoginPage.tsx";
import {useCars} from "@/hooks/useCars.ts";
import CancelBookingPage from "@/pages/CancelBookingPage.tsx";
import ConsentBanner from "@/components/ConsentBanner.tsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy.tsx";
import NotFound from "@/pages/NotFound.tsx";
import DeliveryPage from "@/pages/DeliveryPage.tsx";

interface WrapperProps {
    children: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
    const location = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

    return <>{children}</>;
}

export const  AppShell = ()=>  {
    const [bookingCar, setBookingCar] = useState<Car | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const {cars, isLoading, error} = useCars();
    const { pathname } = useLocation();
    const isAdminArea = pathname.startsWith("/admin");

    const handleBookViewing = (car: Car) => {
        setBookingCar(car);
        setDialogOpen(true);
    };


    return (
        <Wrapper>
           <Header/>

            <main className="container mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
                <Routes>
                    <Route path="/" element={<HomePage cars={cars} />} />

                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact-us" element={<ContactPage />} />
                    <Route path="contact" element={<Navigate to="/contact-us" replace />} />
                    <Route path="privacy" element={<PrivacyPolicy />} />
                    <Route path="delivery" element={<DeliveryPage/>}/>

                    <Route path="cars">
                        <Route index element={<InventoryPage cars={cars} isLoading={isLoading} error={error} />} />
                        <Route
                            path=":id"
                            element={
                                <CarPage
                                    cars={cars}
                                    isLoading={isLoading}
                                    error={error}
                                    onBookViewing={handleBookViewing}
                                />
                            }
                        />
                    </Route>

                    <Route path="booking/cancel/:token" element={<CancelBookingPage />} />

                    <Route path="admin/login" element={<AdminLoginPage />} />
                    <Route path="admin" element={<ProtectedRoute />}>
                        <Route index element={<AdminPanel />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
            <ConsentBanner/>

            <BookingDialog
                car={bookingCar}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />

            {!isAdminArea && <WhatsAppButton />}
        </Wrapper>
    );
}

export default AppShell;