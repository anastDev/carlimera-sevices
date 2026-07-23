import CarCard from "../components/CarCard.tsx";
import FaqSection from "../components/FaqSection.tsx";
import type {Car} from "@/types/typesCar.ts";
import {useNavigate} from "react-router";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay'

import fiat from "../assets/fiat.jpg";
import mazda from "../assets/mazda.jpg";
import nissan from "../assets/nissan.jpg";
import peugeot from "../assets/peugeot.jpg";
import toyota from "../assets/toyota.jpg";
import {motion} from "framer-motion";
import Testimonials3 from "@/components/smoothui/testimonials-3";
import SmoothButton from "@/components/smoothui/smooth-button";

interface HomePageProps {
    cars: Car[];
   onBookViewing: (car: Car) => void;
}

const heroImages: string[] = [fiat, mazda, nissan, peugeot, toyota];

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: "easeOut" },
} as const;

export const HomePage = ({ cars, onBookViewing }: HomePageProps) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-7xl mt-4 lg:mt-14 px-4 sm:px-6">

                {/* Hero Section */}
                <section className="relative hidden lg:grid lg:grid-cols-2 gap-8 items-center py-0 lg:py-12 overflow-hidden">

                    {/* Text & Filter Half  */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative order-2 flex flex-col justify-center z-20 p-6 sm:p-12 lg:p-0 lg:order-1 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent lg:bg-none text-white lg:text-inherit mt-56 sm:mt-72 lg:mt-0"
                    >
                        <div className="text-center lg:text-left">
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-200 lg:text-primary">
                                Are you looking for a car?
                            </p>
                            <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-brand-dark sm:text-4xl lg:text-5xl">
                                Find Your Next Vehicle Today.
                            </h1>
                            <p className="mb-6 max-w-md mx-auto lg:mx-0 text-sm text-white/90 lg:text-muted-foreground sm:text-base">
                                Discover your perfect car with CARlimera Services. Reliable, vetted vehicles ready for delivery.
                            </p>
                        </div>

                        {/* Filters Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 rounded-lg items-end border bg-card p-4 shadow-md text-foreground"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <SmoothButton className="rounded-full"
                                              onClick={() => navigate("/cars")}>
                                    Browse All Cars
                                </SmoothButton>
                            </motion.div>
                        </motion.div>

                        <p className="mt-4 text-center lg:text-left text-xs text-white/80 lg:text-muted-foreground">
                            Every vehicle DVLA checked · Warranty included
                        </p>
                    </motion.div>

                    {/* Carousel Half */}
                    <div className="absolute inset-0 z-10 h-full lg:relative lg:order-2 w-full lg:h-[37.5rem]">
                        <div className="absolute inset-0 bg-brand-dark/40 lg:hidden z-10 pointer-events-none" />
                        <Carousel
                            className="h-full w-full"
                            opts={{ loop: true }}
                            plugins={[
                                Autoplay({
                                    delay: 4000,
                                    stopOnInteraction: false,
                                    stopOnMouseEnter: true,
                                }),
                            ]}
                        >
                            <CarouselContent className="ml-0 h-full rounded-xl">
                                {heroImages.map((src, i) => (
                                    <CarouselItem key={i} className="h-full pl-0 rounded-xl">
                                        <img
                                            src={src}
                                            alt=""
                                            aria-hidden="true"
                                            className="h-full w-full object-cover rounded-xl shadow-md"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </section>

                {/* Mobile Hero */}
                <section className="lg:hidden">
                    <div className="px-4 sm:px-6 pt-14 text-center">
                        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-primary">
                            Are you looking for a car?
                        </p>
                        <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-dark">
                            Find Your Next Vehicle Today.
                        </h1>
                        <p className="mb-5 text-sm text-muted-foreground">
                            Reliable, vetted vehicles ready for delivery from a small local Coventry team.
                        </p>

                        <SmoothButton className="rounded-full"
                                      onClick={() => navigate("/cars")}>
                            Browse All Cars
                        </SmoothButton>

                        <p className="mt-3 text-xs text-muted-foreground">
                            Every vehicle DVLA checked · Warranty included
                        </p>
                    </div>

                    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 py-5 -mx-4 sm:-mx-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {heroImages.map((src, i) => (
                            <div key={i} className="relative shrink-0 w-[60%] snap-start rounded-lg overflow-hidden shadow-sm">
                                <img src={src} alt="" aria-hidden="true" className="h-40 w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-10 py-6 sm:space-y-16 sm:py-10 mt-10">

                {/* Featured Vehicles Section */}
                <motion.section {...fadeUp}>
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">Our Top Featured Vehicles</h2>
                        <p className="text-sm text-muted-foreground">Handpicked models checked for ultimate reliability.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {cars && cars.slice(0, 3).map((car, index) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                            >
                                <CarCard car={car} />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Customer Reviews Section */}
                <Testimonials3 />

                {/* Test Drive Section */}
                <motion.section {...fadeUp} className="rounded-lg border bg-card py-6 px-4 text-center shadow-md sm:rounded-xl sm:px-8 sm:py-16">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground sm:text-sm">
                        Ready for a Test Drive?
                    </p>
                    <h2 className="mb-3 text-lg font-extrabold tracking-tight text-primary sm:text-2xl lg:text-4xl">
                        Get Behind the Wheel Today.
                    </h2>
                    <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground sm:mb-8 sm:text-base">
                        See how your favorite car feels on the road before making any big decisions.
                    </p>

                    <SmoothButton className="rounded-lg" onClick={() => cars && cars.length > 0 && onBookViewing(cars[0])}>
                        Book a Test Drive
                    </SmoothButton>
                </motion.section>


                {/* FAQ Section */}
                <motion.section {...fadeUp} className="border-t border-border pt-2">
                    <FaqSection />
                </motion.section>

            </div>
        </div>
    );
};

export default HomePage;