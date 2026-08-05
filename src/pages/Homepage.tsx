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
            <div className="container mx-auto max-w-7xl mt-4 lg:mt-10 px-4 sm:px-6">

                {/* Hero Section */}
                <section className="relative hidden lg:grid lg:grid-cols-2 gap-16 items-center lg:py-16 overflow-hidden">

                    {/* Text & Filter Half  */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative order-2 flex flex-col justify-center z-20 p-6 sm:p-12 lg:p-0 lg:pr-8 lg:order-1 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent lg:bg-none text-white lg:text-inherit mt-56 sm:mt-72 lg:mt-0"
                    >
                        <div className="text-center lg:text-left">
                            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">
                                Are you looking for a car?
                            </p>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                Find Your Next Vehicle Today.
                            </h1>
                            <p className="mb-8 max-w-md mx-auto lg:mx-0 text-sm text-muted-foreground sm:text-base lg:text-lg">
                                Discover your perfect car with CARlimera Services. Reliable, vetted vehicles ready for delivery.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div>
                            <SmoothButton className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                          onClick={() => navigate("/cars")}>
                                Browse All Cars
                            </SmoothButton>
                            <p className="mt-4 text-center lg:text-left text-xs text-muted-foreground/80">
                                Every vehicle DVLA checked · Warranty included
                            </p>
                        </div>

                    </motion.div>

                    {/* Carousel Half */}
                    <div className="absolute inset-0 z-10 h-full lg:relative lg:order-2 w-full lg:h-[37.5rem] rounded-lg">
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
                            <CarouselContent className="ml-0 h-full rounded-lg">
                                {heroImages.map((src, i) => (
                                    <CarouselItem key={i} className="h-full pl-0 rounded-lg">
                                        <img
                                            src={src}
                                            alt=""
                                            aria-hidden="true"
                                            className="h-full w-full object-cover rounded-lg shadow-md"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </section>

                {/* Mobile Hero */}
                <section className="lg:hidden">
                    <div className="px-2 pt-18 text-center">
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

                    <div className="px-2 pt-6 pb-4">
                        <Carousel
                            className="w-full"
                            opts={{ loop: true, align: "start" }}
                            plugins={[
                                Autoplay({
                                    delay: 3500,
                                    stopOnInteraction: false,
                                    stopOnMouseEnter: true,
                                }),
                            ]}
                        >
                            <CarouselContent className="-ml-3">
                                {heroImages.map((src, i) => (
                                    <CarouselItem key={i} className="pl-3 basis-[60%]">
                                        <div className="relative overflow-hidden rounded-lg shadow-sm">
                                            <img src={src} alt="" aria-hidden="true" className="h-44 w-full object-cover" />
                                        </div>
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
                        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl ">Our Top Featured Vehicles</h2>
                        <p className="text-sm sm:text-base text-muted-foreground my-1">Handpicked models checked for ultimate reliability.</p>
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
                                <CarCard car={car}  onclick={() => navigate(`/cars/${car.id}`)}/>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Customer Reviews Section */}
                <Testimonials3 />

                {/* Test Drive Section */}
                <motion.section {...fadeUp} className="rounded-lg border bg-card py-6 px-4 text-center shadow-md sm:px-8 sm:py-16">
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
                <motion.section {...fadeUp} className="pt-2">
                    <FaqSection />
                </motion.section>

            </div>
        </div>
    );
};

export default HomePage;