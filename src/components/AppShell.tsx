import {type ReactNode, useLayoutEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router";
import HomePage from "@/pages/Homepage.tsx";
import AboutPage from "@/pages/Aboutpage.tsx";
import ContactPage from "@/pages/Contactpage.tsx";
import Footer from "@/components/layout/Footer.tsx";

import {cars} from "@/data/carData.ts";
import Header from "@/components/layout/header/Header.tsx";
import InventoryPage from "@/pages/InventoryPage.tsx";
import CarPage from "@/pages/CarPage.tsx";
import {toast} from "sonner";
import type {Car} from "@/types/typesCar.ts";
import BookingDialog from "@/components/BookingDialog.tsx";
import {WhatsAppButton} from "@/components/WhatsAppButton.tsx";

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

    const handleBookViewing = (car: Car) => {
        setBookingCar(car);
        setDialogOpen(true);
    };

    const handleConfirmBooking = ( dateId: string, timeId: string) => {
        toast("Booking confirmed!",{
            description: `${dateId} ${timeId}`,
        });
    };

    return (
        <Wrapper>
           <Header/>

            <main className="container mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
                <Routes>
                    <Route path="/" element={<HomePage cars={cars} onBookViewing={handleBookViewing}/>} />

                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />

                    <Route path="cars">
                        <Route index element={<InventoryPage cars={cars} />} />
                        <Route path=":id" element={<CarPage cars={cars} onBookViewing={handleBookViewing}/>} />
                    </Route>
                </Routes>
            </main>

            <Footer />

            <BookingDialog
                car={bookingCar}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onConfirm={handleConfirmBooking}
            />

            <WhatsAppButton/>
        </Wrapper>
    );
}

export default AppShell;