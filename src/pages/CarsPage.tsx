import {useEffect, useState} from "react";
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
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {
    Carousel, type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";


interface CarsPageProps {
    cars: Car[];
    onBookViewing: (car: Car) => void;
}

export const CarsPage = ({ cars, onBookViewing }: CarsPageProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    if (!cars || cars.length === 0) {
        return (
            <div className="flex min-h-[25rem] flex-col items-center justify-center p-8 text-center">
                <p className="text-lg font-medium text-gray-700">No vehicles are currently available.</p>
            </div>
        );
    }

    const currentCar = cars[0];

    return (
        <div className="container mx-auto max-w-7xl px-4 pb-8 mt-12 sm:mt-20 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-gray-400 hover:text-orange-400">
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-gray-400" />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/browse" className="text-gray-400 hover:text-orange-400">
                            Browse Cars
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-gray-400" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-gray-400">
                            {currentCar.year} {currentCar.brand} {currentCar.model}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-6">
                <div className="lg:col-span-2 space-y-8">

                    {/* Header Details */}
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl my-3">
                            {currentCar.title}
                        </h1>
                    </div>

                    {/* Img Gallery */}
                    <div className="space-y-4">
                        <Carousel setApi={setApi} className="relative w-full h-[33rem] group">

                            {/* Main Hero Window View */}
                            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-200">
                                {currentCar.images && currentCar.images.length > 0 ? (
                                    <img
                                        src={currentCar.images[current]}
                                        alt={`${currentCar.brand} ${currentCar.model}`}
                                        className="h-full w-full object-cover object-center transition-opacity duration-300"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500 font-medium">
                                        No images available
                                    </div>
                                )}

                                {/* Overlay Navigation Buttons */}
                                {currentCar.images && currentCar.images.length > 1 && (
                                    <>
                                        <CarouselPrevious
                                            onClick={()=> setCurrent(current - 1)}
                                            className="absolute left-4 top-10 -translate-y-1/2 h-10 w-10 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-900 border-none shadow-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                                        />
                                        <CarouselNext
                                            onClick={()=> setCurrent(current + 1)}
                                            className="absolute right-4 top-10 -translate-y-1/2 h-10 w-10 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-900 border-none shadow-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                                        />
                                    </>
                                )}
                            </div>

                            {currentCar.images && currentCar.images.length > 1 && (
                                <div className="mx-auto max-w-xs px-4 mt-4">
                                    <CarouselContent className="-ml-2">
                                        {currentCar.images.map((imgUrl, index) => (
                                            <CarouselItem key={index} className="pl-2 basis-24">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setCurrent(index);
                                                        api?.scrollTo(index);
                                                    }}
                                                    className={`group relative aspect-square w-full overflow-hidden rounded-lg border-2 bg-white transition-all ${
                                                        current === index
                                                            ? "border-blue-700 ring-2 ring-blue-100"
                                                            : "border-transparent hover:border-gray-300"
                                                    }`}
                                                >
                                                    <img
                                                        src={imgUrl}
                                                        alt={`${currentCar.brand} ${currentCar.model} view ${index + 1}`}
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
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Year</p>
                                <p className="text-sm font-bold text-gray-900">{currentCar.year}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
                                <Milestone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Mileage</p>
                                <p className="text-sm font-bold text-gray-900">{currentCar.mileage.toLocaleString()} mi</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
                                <Settings className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Transmission</p>
                                <p className="text-sm font-bold text-gray-900 capitalize">{currentCar.transmission}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
                                <NotepadText className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Registration</p>
                                <p className="text-sm font-bold text-gray-900 uppercase">{currentCar.registration}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
                                <Fuel className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Fuel Type</p>
                                <p className="text-sm font-bold text-gray-900 capitalize">{currentCar.fuelType}</p>
                            </div>
                        </div>

                        {(currentCar.doors || currentCar.seats || currentCar.doors || currentCar.seats) && (
                            <div className="flex items-center space-x-3">
                                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
                                    <Layers className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Layout</p>
                                    <p className="text-sm font-bold text-gray-900">
                                        {currentCar.doors || currentCar.doors || "—"} Dr / {currentCar.seats || currentCar.seats || "—"} St
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description Text Frame */}
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-gray-900">Description</h2>
                        <p className="text-base leading-relaxed text-gray-700">
                            {currentCar.description}
                        </p>
                    </div>

                    {/* Specification Table Module */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Technical Specifications</h2>
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                            <dl className="divide-y divide-gray-200">
                                <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50/50">
                                    <dt className="text-sm font-semibold text-gray-600">Engine Size</dt>
                                    <dd className="col-span-2 text-sm text-gray-950 font-medium">{currentCar.engine}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50/50">
                                    <dt className="text-sm font-semibold text-gray-600">Drivetrain</dt>
                                    <dd className="col-span-2 text-sm text-gray-950 font-medium">{currentCar.drivetrain}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50/50">
                                    <dt className="text-sm font-semibold text-gray-600">Exterior Color</dt>
                                    <dd className="col-span-2 text-sm text-gray-950 font-medium">{currentCar.exteriorColor}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50/50">
                                    <dt className="text-sm font-semibold text-gray-600">Interior Material</dt>
                                    <dd className="col-span-2 text-sm text-gray-950 font-medium">{currentCar.interiorColor}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50/50">
                                    <dt className="text-sm font-semibold text-gray-600">Top Speed</dt>
                                    <dd className="col-span-2 text-sm text-gray-950 font-medium">{currentCar.topSpeed} mph</dd>
                                </div>
                                {( currentCar.prevOwners !== undefined) && (
                                    <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50/50">
                                        <dt className="text-sm font-semibold text-gray-600">Previous Owners</dt>
                                        <dd className="col-span-2 text-sm text-gray-950 font-medium">
                                            {currentCar.prevOwners}
                                        </dd>
                                    </div>
                                )}
                                {(currentCar.motExpiry) && (
                                    <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50/50">
                                        <dt className="text-sm font-semibold text-gray-600">MOT Status</dt>
                                        <dd className="col-span-2 text-sm text-gray-950 font-medium">
                                            {currentCar.motExpiry}
                                        </dd>
                                    </div>
                                )}
                                {(currentCar.keys !== undefined) && (
                                    <div className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50/50">
                                        <dt className="text-sm font-semibold text-gray-600">Number of Keys</dt>
                                        <dd className="col-span-2 text-sm text-gray-950 font-medium">
                                            { currentCar.keys ? currentCar.keys : "Not Specified"}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>

                    {/* Features Checklist Grid */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                            <Sparkles className="mr-2 h-5 w-5 text-blue-700" />
                            Premium Features & Highlights
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {currentCar.features.map((feature, idx) => {
                                const [title, desc] = feature.split(':');
                                return (
                                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100/50 hover:bg-gray-100/80 transition-colors">
                                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900">{title}</h4>
                                            {desc && <p className="text-xs text-gray-600 mt-0.5">{desc.trim()}</p>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Inspection Notice Card */}
                    <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6 space-y-4">
                        <h3 className="text-lg font-bold text-blue-950 flex items-center">
                            <ShieldCheck className="mr-2 h-6 w-6 text-blue-800" />
                            Pre-Inspection & Condition Report
                        </h3>
                        <p className="text-sm text-gray-800 leading-relaxed">
                            {currentCar.conditionText}
                        </p>
                        <div className="flex items-start bg-white border border-blue-200 rounded-lg p-3 text-xs text-blue-950">
                            <Info className="mr-2.5 h-5 w-5 flex-shrink-0 text-blue-700 mt-0.5" />
                            <span>
                                <strong>Verification Notice:</strong> While the exterior presents remarkably well in high-resolution photography, we always recommend an in-person viewing and a test drive to verify the interior trim condition, soft-top mechanism seals, and mechanical history.
                            </span>
                        </div>
                    </div>

                </div>

                {/* Pricing Action Panel */}
                <div className="space-y-6">
                    <div className="sticky top-20 rounded-xl border border-gray-200 bg-white p-6 shadow-md shadow-gray-100 lg:mt-24">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Vehicle Price</span>
                            <div className="flex items-baseline space-x-1 mt-1">
                                <span className="text-4xl font-black text-blue-950">£{currentCar.price.toLocaleString()}</span>
                                <span className="text-sm font-medium text-gray-600 ml-1">no extra dealer fees</span>
                            </div>
                        </div>

                        {/* Primary Call to Action */}
                        <button
                            type="button"
                            onClick={() => onBookViewing(currentCar)}
                            className="w-full flex justify-center items-center rounded-xl bg-blue-700 px-4 py-3.5 text-base font-bold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-all cursor-pointer"
                        >
                            Book a Viewing / Test Drive
                        </button>

                        {/* Dealer Trust Badges */}
                        <ul className="mt-6 space-y-3.5 border-t border-gray-100 pt-6 text-sm text-gray-700 font-medium">
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 h-5 w-5 text-emerald-600 flex-shrink-0" />
                                <span>Zero deposit required to book a slot</span>
                            </li>
                            {currentCar.serviceHistory && (
                                <li className="flex items-center">
                                    <UserCheck className="mr-3 h-5 w-5 text-emerald-600 flex-shrink-0" />
                                    <span>Verified {currentCar.serviceHistory}</span>
                                </li>
                            )}
                            {((currentCar.keys&& currentCar.keys > 1) || (currentCar.keys && currentCar.keys > 1)) && (
                                <li className="flex items-center">
                                    <Key className="mr-3 h-5 w-5 text-emerald-600 flex-shrink-0" />
                                    <span>Supplied with operational spare keys</span>
                                </li>
                            )}
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 h-5 w-5 text-emerald-600 flex-shrink-0" />
                                <span>Fully accompanied test drives available</span>
                            </li>
                        </ul>

                        {/* Timing Module */}
                        <div className="mt-6 rounded-xl bg-gray-50 p-4 border border-gray-100">
                            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">Dealership & Hours</h4>
                            <div className="mt-2.5 flex items-start gap-1.5 text-xs text-gray-700 font-medium">
                                <Clock className="h-4 w-4 text-blue-700 flex-shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="font-semibold text-gray-900">Open Daily: 9:00 AM – 6:00 PM</p>
                                    <p className="text-gray-500">Strictly by appointment only.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CarsPage;