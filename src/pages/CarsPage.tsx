import {useState} from "react";
import {
    Calendar,
    CheckCircle, Clock,
    Fuel, Info,
    Milestone,
    Settings,
    ShieldCheck,
    Sparkles
} from "lucide-react";
import type {Car} from "@/types/typesCar.ts";

interface CarsPageProps {
    cars: Car[];
    onBookViewing: (car: Car) => void;
}

export const CarsPage = ({ cars, onBookViewing }: CarsPageProps) => {
    const [activeImage, setActiveImage] = useState(0);

    if (!cars || cars.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
                <p className="text-lg font-medium text-gray-700">No vehicles are currently available.</p>
            </div>
        );
    }

    const currentCar = cars[0];

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-gray-50/50">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Title and Badges */}
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-flex items-center rounded-md  px-2.5 py-1 text-xs font-semibold text-blue-900 ring-1 ring-inset ring-blue-700/20">
                                {currentCar.bodyType}
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {currentCar.title}
                        </h1>
                    </div>

                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-200">
                            {currentCar.images && currentCar.images.length > 0 ? (
                                <img
                                    src={currentCar.images[activeImage]}
                                    alt={`${currentCar.brand} ${currentCar.model}`}
                                    className="h-full w-full object-cover object-center transition-opacity duration-300"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500 font-medium">
                                    No images available
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {currentCar.images && currentCar.images.length > 1 && (
                            <div className="grid grid-cols-5 gap-3">
                                {currentCar.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(index)}
                                        className={`aspect-[4/3] overflow-hidden rounded-lg border-2 bg-gray-100 transition-all ${
                                            activeImage === index ? 'border-blue-700 ring-2 ring-blue-100' : 'border-transparent hover:border-gray-400'
                                        }`}
                                    >
                                        <img src={image} alt="" className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
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
                                <Fuel className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Fuel Type</p>
                                <p className="text-sm font-bold text-gray-900 capitalize">{currentCar.fuelType}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-gray-900">Description</h2>
                        <p className="text-base leading-relaxed text-gray-700">
                            {currentCar.description}
                        </p>
                    </div>

                    {/* Features Checklist */}
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

                    {/* Condition Report Box */}
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

                    {/* Expanded Specification Table */}
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
                                    <dd className="col-span-2 text-sm text-gray-950 font-medium">{currentCar.topSpeed} km/h</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                </div>

                {/* Right Column: Sticky Pricing & Action Widget */}
                <div className="space-y-6">
                    <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md shadow-gray-100">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Vehicle Price</span>
                            <div className="flex items-baseline space-x-1 mt-1">
                                <span className="text-4xl font-black text-blue-950">£{currentCar.price.toLocaleString()}</span>
                                <span className="text-sm font-medium text-gray-600 ml-1">no extra dealer fees</span>
                            </div>
                        </div>

                        {/* Primary Action Button */}
                        <button
                            onClick={() => onBookViewing(currentCar)}
                            className="w-full flex justify-center items-center rounded-xl bg-blue-700 px-4 py-3.5 text-base font-bold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-all cursor-pointer"
                        >
                            Book a Viewing / Test Drive
                        </button>

                        {/* Reassurance points */}
                        <ul className="mt-6 space-y-3.5 border-t border-gray-100 pt-6 text-sm text-gray-700 font-medium">
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 h-5 w-5 text-emerald-600 flex-shrink-0" />
                                <span>Zero deposit required to book a slot</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 h-5 w-5 text-emerald-600 flex-shrink-0" />
                                <span>Flexible morning & evening slots available</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 h-5 w-5 text-emerald-600 flex-shrink-0" />
                                <span>Fully accompanied test drives available</span>
                            </li>
                        </ul>

                        {/* Dealership Info Box */}
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
}

export default CarsPage;