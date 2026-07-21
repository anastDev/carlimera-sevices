import { Button } from "@/components/ui/button.tsx";
import CarCard from "../components/CarCard.tsx";
import FaqSection from "../components/FaqSection.tsx";
import type {Car} from "@/types/typesCar.ts";
import ReviewCard from "@/components/ReviewCard.tsx";
import FilterSelect from "@/components/FilterSelect.tsx";
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
import { motion } from "framer-motion";

interface HomePageProps {
    cars: Car[];
}

const heroImages: string[] = [fiat, mazda, nissan, peugeot, toyota];

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: "easeOut" },
} as const;

export const HomePage = ({ cars }: HomePageProps) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-7xl mt-10 sm:mt-14 px-4 sm:px-6">

                {/* Hero Section */}
                <section className="relative block lg:grid lg:grid-cols-2 gap-8 items-center py-0 lg:py-12 overflow-hidden rounded-xl lg:rounded-none">

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
                            <div className="w-full">
                                <FilterSelect label="Category" options={["All", "Coupe", "Hatchback", "Suv"]} />
                            </div>
                            <div className="w-full">
                                <FilterSelect label="Make" options={["All", "Hyundai", "Fiat", "Nissan", "Mazda"]} />
                            </div>
                            <div className="w-full">
                                <FilterSelect label="Model" options={["All"]} />
                            </div>
                            <div className="w-full">
                                <FilterSelect label="Price" options={["Any"]} />
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <Button
                                    onClick={() => navigate("/cars")}
                                    className="w-full rounded-lg bg-primary h-9 px-4 font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                                >
                                    Search
                                </Button>
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
                </motion.section>

                {/* Customer Reviews Section */}
                <motion.section {...fadeUp}>
                    <div className="mb-4 sm:mb-6">
                        <h2 className="mb-1 text-lg font-bold tracking-tight text-foreground sm:text-2xl">What early customers say</h2>
                        <p className="text-xs text-muted-foreground">We're a small local team, so every single honest review means the world to us.</p>
                    </div>

                    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [&>div]:min-w-[85%] [&>div]:sm:min-w-0">
                        <div className="snap-start">
                            <ReviewCard quote="Straightforward, no pushy sales. Car matched the listing." author="D., Coventry" />
                        </div>
                        <div className="snap-start">
                            <ReviewCard quote="Easy to book a viewing online, showed up and it was ready." author="R., Birmingham" />
                        </div>
                    </div>
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