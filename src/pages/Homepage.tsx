import { Button } from "@/components/ui/button.tsx";
import CarCard from "../components/CarCard.tsx";
import FaqSection from "../components/FaqSection.tsx";
import type {Car} from "@/types/typesCar.ts";
import ReviewCard from "@/components/ReviewCard.tsx";
import FilterSelect from "@/components/FilterSelect.tsx";
import {useNavigate} from "react-router";

interface HomePageProps {
    cars: Car[];
    onBookViewing: (car: Car) => void;
}

export const HomePage = ({ cars, onBookViewing }: HomePageProps)=>  {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen px-4 sm:px-6  lg:px-8">
            <div className="mx-auto max-w-7xl space-y-10 sm:space-y-16">

                {/* Hero Section */}
                <section className="rounded-2xl bg-brand-dark px-5 py-8 shadow-xl sm:rounded-3xl sm:px-10 sm:py-16">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-200 sm:text-xs">
                        Are you looking for a car?
                    </p>
                    <h1 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Find Your Next Vehicle Today.
                    </h1>
                    <p className="mb-6 max-w-xl text-sm text-teal-50/90 sm:mb-8 sm:text-base">
                        Discover your perfect car with CARlimera Services. Reliable, vetted vehicles ready for delivery.
                    </p>

                    {/* Filter Card Container */}
                    <div className="grid grid-cols-1 gap-3 rounded-xl bg-card p-4 text-foreground shadow-lg sm:grid-cols-2 sm:gap-4 sm:rounded-2xl sm:p-5 md:grid-cols-3 lg:grid-cols-5 lg:items-end">
                        <FilterSelect label="Category" options={["All", "Coupe", "Hatchback", "Suv"]} />
                        <FilterSelect label="Make" options={["All", "Hyundai", "Fiat", "Nissan", "Mazda"]} />
                        <FilterSelect label="Model" options={["All"]} />
                        <FilterSelect label="Price" options={["Any"]} />

                        <Button
                            onClick={() => navigate("/cars")}
                            className="col-span-full w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-semibold  shadow-sm transition-colors lg:col-span-1"
                        >
                            Search
                        </Button>
                    </div>
                </section>

                {/* Featured Vehicles Section */}
                <section>
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-lg font-bold tracking-tight text-gray-950 sm:text-xl">Our Top Featured Vehicles</h2>
                        <p className="text-sm text-gray-500">Handpicked models checked for ultimate reliability.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {cars && cars.slice(0, 4).map((car) => (
                            <CarCard key={car.id} car={car} onBookViewing={onBookViewing} />
                        ))}
                    </div>
                </section>

                {/* Test Drive Section  */}
                <section className="rounded-2xl border border-border bg-card px-5 py-4 text-center shadow-sm sm:rounded-3xl sm:px-10 sm:py-16">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground sm:text-xs">
                        Ready for a Test Drive?
                    </p>
                    <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
                        Get Behind the Wheel Today.
                    </h2>
                    <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground sm:mb-8 sm:text-base">
                        See how your favorite car feels on the road before making any big decisions.
                    </p>

                    <div className="flex justify-center">
                        <Button
                            onClick={() => cars && cars.length > 0 && onBookViewing(cars[0])}
                            className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-5 font-semibold  shadow-md transition-colors sm:w-auto"
                        >
                            Book a Test Drive
                        </Button>
                    </div>
                </section>

                {/* Customer Reviews Section */}
                <section>
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-lg font-bold tracking-tight sm:text-xl mb-1 text-brand-dark">What early customers say</h2>
                        <p className="text-sm text-muted-foreground">A few honest reviews - we're a small dealership, not a review farm</p>
                    </div>

                    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
                        <div className="snap-start">
                            <ReviewCard quote="Straightforward, no pushy sales. Car matched the listing." author="D., Coventry" />
                        </div>
                        <div className="snap-start">
                            <ReviewCard quote="Easy to book a viewing online, showed up and it was ready." author="R., Birmingham" />
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="pt-4 border-t border-slate-100">
                    <FaqSection />
                </section>

            </div>
        </div>
    );
}

export default HomePage;