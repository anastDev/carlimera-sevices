import { useState} from "react";
import {
    Calendar,
    CheckCircle, Clock,
    Fuel, Info, Key, Layers,
    Milestone, NotepadText,
    Settings,
    ShieldCheck,
    Sparkles, UserCheck
} from "lucide-react";
import type {Car} from "@/types/typesCar.ts";
import {
    Carousel, type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Breadcrumb from "@/components/smoothui/breadcrumb";
import {useParams} from "react-router";
import SmoothButton from "@/components/smoothui/smooth-button";

interface CarPageProps {
    cars: Car[];
    onBookViewing: (car: Car) => void;
}

export const CarPage = ({cars, onBookViewing}: CarPageProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const { id } = useParams<{ id: string }>();
    const [current, setCurrent] = useState(0);

    const car = cars.find((car) => car.id === id);
    const imageCount = car!.images?.length ?? 0;

    const handlePrev = () => {
        const next = (current - 1 + imageCount) % imageCount;
        setCurrent(next);
        api?.scrollTo(next);
    };

    const handleNext = () => {
        const next = (current + 1) % imageCount;
        setCurrent(next);
        api?.scrollTo(next);
    };

    return (
        <div className="container mx-auto max-w-7xl px-4 pb-10 mt-12 sm:mt-20 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <Breadcrumb
                className="hover:text-primary"
                items={[
                    { label: "Home", href: "/" },
                    { label: "All Cars", href: "/cars" },
                    { label: `${car?.year} ${car?.make} ${car?.model}`, href: `/cars/${car?.id}`},
                ]}
            >
            </Breadcrumb>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-6">
                <div className="lg:col-span-2 space-y-8">

                    {/* Header Details */}
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl my-3">
                            {car!.title}
                        </h1>
                    </div>

                    {/* Img Gallery */}
                    <div className="space-y-4">
                        <Carousel setApi={setApi} className="relative w-full max-h-[33rem] group">

                            {/* Main Hero Window View */}
                            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-secondary shadow-sm border border-border">
                                {car?.images && car?.images.length > 0 ? (
                                    <img
                                        src={car.images[current]}
                                        alt={`${car.make} ${car.model}`}
                                        className="h-full w-full object-cover object-center transition-opacity duration-300"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground font-medium">
                                        No images available
                                    </div>
                                )}

                                {/* Overlay Navigation Buttons  */}
                                {car?.images && car?.images.length > 1 && (
                                    <>
                                        <CarouselPrevious
                                            onClick={handlePrev}
                                            className="absolute left-4 top-10 -translate-y-1/2 h-10 w-10 bg-secondary/80 text-foreground backdrop-blur-sm hover:bg-secondary  border-none shadow-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                                        />
                                        <CarouselNext
                                            onClick={handleNext}
                                            className="absolute right-4 top-10 -translate-y-1/2 h-10 w-10 bg-secondary/80 text-foreground backdrop-blur-sm hover:bg-secondary  border-none shadow-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                                        />
                                    </>
                                )}
                            </div>

                            {car?.images && car?.images.length > 1 && (
                                <div className="mx-auto max-w-xs px-4 mt-4">
                                    <CarouselContent className="-ml-2">
                                        {car.images.map((imgUrl, index) => (
                                            <CarouselItem key={index} className="pl-2 basis-24">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setCurrent(index);
                                                        api?.scrollTo(index);
                                                    }}
                                                    className={`group relative aspect-square w-full overflow-hidden rounded-lg border-2 bg-background transition-all ${
                                                        current === index
                                                            ? "border-ring ring-2 ring-background"
                                                            : "border-transparent hover:border-muted-foreground"
                                                    }`}
                                                >
                                                    <img
                                                        src={imgUrl}
                                                        alt={`${car.make} ${car.model} view ${index + 1}`}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    {current !== index && (
                                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                                                    )}
                                                </button>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </div>
                            )}
                        </Carousel>
                    </div>

                    {/* Quick Info Grid Badges */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 rounded-lg border border-border bg-background p-5 shadow-sm">
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-accent text-sidebar-primary p-2.5">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[0.70rem] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider">Year</p>
                                <p className="text-[0.85rem] sm:text-sm font-bold text-foreground">{car?.year}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-accent text-sidebar-primary p-2.5">
                                <Milestone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[0.70rem] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider">Mileage</p>
                                <p className="text-[0.85rem] sm:text-sm font-bold text-foreground">{car?.mileage.toLocaleString()} mi</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-accent text-sidebar-primary p-2.5 ">
                                <Settings className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[0.70rem] text-muted-foreground font-semibold uppercase tracking-wider">Transmission</p>
                                <p className="text-[0.85rem] font-bold text-foreground capitalize">{car?.transmission}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-accent text-sidebar-primary p-2.5 ">
                                <NotepadText className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[0.70rem] text-muted-foreground font-semibold uppercase tracking-wider">Registration</p>
                                <p className="text-[0.85rem] font-bold text-foreground uppercase">{car?.registration}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-accent text-sidebar-primary p-2.5 ">
                                <Fuel className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[0.70rem] text-muted-foreground font-semibold uppercase tracking-wider">Fuel Type</p>
                                <p className="text-[0.85rem] font-bold text-foreground capitalize">{car?.fuelType}</p>
                            </div>
                        </div>

                        {(car?.doors || car?.seats) && (
                            <div className="flex items-center space-x-3">
                                <div className="rounded-lg bg-accent text-sidebar-primary p-2.5 ">
                                    <Layers className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Layout</p>
                                    <p className="text-sm font-bold text-foreground">
                                        {car.doors || car.doors || "—"} Doors / {car.seats || car.seats || "—"} Seats
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description Text Frame */}
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground">Description</h2>
                        <p className="text-base leading-relaxed text-foreground/80">
                            {car?.description}
                        </p>
                    </div>

                    {/* Specification Table Module */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground">Technical Specifications</h2>
                        <div className="overflow-hidden rounded-lg border border-border bg-background">
                            <dl className="divide-y divide-gray-200">
                                <div className="grid grid-cols-3 gap-4 px-6 py-4">
                                    <dt className="text-sm font-semibold text-foreground/80">Engine Size</dt>
                                    <dd className="col-span-2 text-sm text-foreground font-medium">{car?.engine}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4 px-6 py-4">
                                    <dt className="text-sm font-semibold text-foreground/80">Drivetrain</dt>
                                    <dd className="col-span-2 text-sm text-foreground font-medium">{car?.drivetrain}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4 px-6 py-4">
                                    <dt className="text-sm font-semibold text-foreground/80">Exterior Color</dt>
                                    <dd className="col-span-2 text-sm text-foreground font-medium">{car?.exteriorColor}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4 px-6 py-4">
                                    <dt className="text-sm font-semibold text-foreground/80">Interior Material</dt>
                                    <dd className="col-span-2 text-sm text-foreground font-medium">{car?.interiorColor}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4 px-6 py-4">
                                    <dt className="text-sm font-semibold text-foreground/80">Top Speed</dt>
                                    <dd className="col-span-2 text-sm text-foreground font-medium">{car?.topSpeed} mph</dd>
                                </div>
                                {( car?.prevOwners !== undefined) && (
                                    <div className="grid grid-cols-3 gap-4 px-6 py-4">
                                        <dt className="text-sm font-semibold text-foreground/80">Previous Owners</dt>
                                        <dd className="col-span-2 text-sm text-foreground font-medium">
                                            {car.prevOwners}
                                        </dd>
                                    </div>
                                )}
                                {(car?.motExpiry) && (
                                    <div className="grid grid-cols-3 gap-4 px-6 py-4">
                                        <dt className="text-sm font-semibold text-foreground/80">MOT Status</dt>
                                        <dd className="col-span-2 text-sm text-foreground font-medium">
                                            {car.motExpiry}
                                        </dd>
                                    </div>
                                )}
                                {(car?.keys !== undefined) && (
                                    <div className="grid grid-cols-3 gap-4 px-6 py-4">
                                        <dt className="text-sm font-semibold text-foreground/80">Number of Keys</dt>
                                        <dd className="col-span-2 text-sm text-foreground font-medium">
                                            { car.keys ? car.keys : "Not Specified"}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>

                    {/* Features Checklist Grid */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground flex items-center">
                            <Sparkles className="mr-2 h-5 w-5 text-sidebar-primary" />
                            Premium Features & Highlights
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {car?.features.map((feature, idx) => {
                                const [title, desc] = feature.split(':');
                                return (
                                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:bg-background/80 transition-colors">
                                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                                        <div>
                                            <h4 className="font-bold text-sm text-foreground">{title}</h4>
                                            {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc.trim()}</p>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Inspection Notice Card */}
                    <div className="rounded-xl bg-border/30 p-6 space-y-4">
                        <h3 className="text-lg font-bold text-foreground/80 flex items-center">
                            <ShieldCheck className="mr-2 h-6 w-6 text-primary/80" />
                            Pre-Inspection & Condition Report
                        </h3>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                            {car?.conditionText}
                        </p>
                        <div className="flex items-start bg-background rounded-lg p-3 text-xs text-foreground/80">
                            <Info className="mr-2.5 h-5 w-5 flex-shrink-0 text-primary/80 mt-0.5" />
                            <span>
                                <strong>Verification Notice:</strong> While the exterior presents remarkably well in high-resolution photography, we always recommend an in-person viewing and a test drive to verify the interior trim condition, soft-top mechanism seals, and mechanical history.
                            </span>
                        </div>
                    </div>

                </div>

                {/* Pricing Action Panel */}
                <div className="space-y-6">
                    <div className="sticky top-10 rounded-lg border border-border bg-background p-6 shadow-md shadow-border lg:mt-24">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Vehicle Price</span>
                            <div className="flex items-baseline space-x-1 mt-1">
                                <span className="text-4xl font-black text-foreground">£{car?.price.toLocaleString()}</span>
                                <span className="text-sm font-medium text-muted-foreground ml-1">no extra dealer fees</span>
                            </div>
                        </div>

                        {/* Primary Call to Action */}
                        <SmoothButton
                            onClick={() => cars && cars.length > 0 && onBookViewing(cars[0])}
                            className="w-full flex justify-center items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3.5 text-base font-bold  shadow-sm  transition-all cursor-pointer"
                        >
                            Book a Viewing / Test Drive
                        </SmoothButton>

                        {/* Dealer Trust Badges */}
                        <ul className="mt-6 space-y-3.5 border-t border-border pt-6 text-sm text-muted-foreground font-medium">
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 h-5 w-5 text-sidebar-primary flex-shrink-0" />
                                <span>Zero deposit required to book a slot</span>
                            </li>
                            {car?.serviceHistory && (
                                <li className="flex items-center">
                                    <UserCheck className="mr-3 h-5 w-5 text-sidebar-primary flex-shrink-0" />
                                    <span>Verified {car.serviceHistory}</span>
                                </li>
                            )}
                            {(car?.keys && car?.keys > 1) && (
                                <li className="flex items-center">
                                    <Key className="mr-3 h-5 w-5 text-sidebar-primary flex-shrink-0" />
                                    <span>Supplied with operational spare keys</span>
                                </li>
                            )}
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 h-5 w-5 text-sidebar-primary flex-shrink-0" />
                                <span>Fully accompanied test drives available</span>
                            </li>
                        </ul>

                        {/* Timing Module */}
                        <div className="mt-6 rounded-xl bg-background/50 p-4 border border-border">
                            <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider mb-2">Dealership & Hours</h4>
                            <div className="mt-2.5 flex items-start gap-1.5 text-xs text-muted-foreground font-medium">
                                <Clock className="h-4 w-4 text-sidebar-primary flex-shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <div className="flex justify-between border-b border-primary/30 pb-1.5">
                                        <span className="text-primary pr-10">Monday – Friday</span>
                                        <span className="text-primary font-semibold">9:00 AM – 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between pb-1">
                                        <span className="text-primary">Sunday</span>
                                        <span className="text-primary font-semibold">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CarPage;