import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {List, Grid2x2, SlidersHorizontal} from "lucide-react";
import SmoothButton from "@/components/smoothui/smooth-button";
import type {Car} from "@/types/typesCar.ts";
import CarCard from "@/components/CarCard.tsx";
import FilterPanel from "@/components/FilterPanel.tsx";
import type {FilterState} from "@/types/filterState.ts";
import Breadcrumb from "@/components/smoothui/breadcrumb";
import Select from "@/components/smoothui/select";
import MobileSheetFilter from "@/components/MobileSheetFilter.tsx";
import {useNavigate} from "react-router";

const items = [
    { label: "Home", value: "/" },
    { label: "All Cars" },
];

interface InventoryPageProps {
    cars: Car[];
}

const DEFAULT_PRICE_MIN = 1100;
const DEFAULT_PRICE_MAX = 16500;

const defaultFilters: FilterState = {
    category: "All",
    year: "All",
    make: "All",
    fuelType: "All",
    transmission: "All",
    title: "",
    priceRange: [DEFAULT_PRICE_MIN, DEFAULT_PRICE_MAX],
};

type ViewMode = "list" | "grid";
type SortOption = "default" | "name" | "asc" | "desc";

const sortLabels: Record<SortOption, string> = {
    default: "Featured",
    name: "Name: A-Z",
    "asc": "Price: Asc",
    "desc": "Price: Desc",
};

export const InventoryPage = ({ cars }: InventoryPageProps) => {
    const [filters, setFilters] = useState<FilterState>(defaultFilters);
    const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const navigate = useNavigate();
    const [view, setView] = useState<ViewMode>("grid");
    const [sort, setSort] = useState<SortOption>("default");

    const categories = useMemo(() => ["All", ...new Set(cars.map((c) => c.category))], [cars]);
    const years = useMemo(
        () => ["All", ...new Set(cars.map((c) => String(c.year)))].sort().reverse(),
        [cars]
    );
    const makes = useMemo(() => ["All", ...new Set(cars.map((c) => c.make))], [cars]);
    const fuelTypes = useMemo(() => ["All", ...new Set(cars.map((c) => c.fuelType))], [cars]);
    const transmissions = useMemo(() => ["All", ...new Set(cars.map((c) => c.transmission))], [cars]);

    const filteredCars = useMemo(() => {
        return cars.filter((car) => {
            if (appliedFilters.category !== "All" && car.category !== appliedFilters.category) return false;
            if (appliedFilters.year !== "All" && String(car.year) !== appliedFilters.year) return false;
            if (appliedFilters.make !== "All" && car.make !== appliedFilters.make) return false;
            if (appliedFilters.fuelType !== "All" && car.fuelType !== appliedFilters.fuelType) return false;
            if (appliedFilters.transmission !== "All" && car.transmission !== appliedFilters.transmission) return false;
            if (
                appliedFilters.title &&
                !car.title.toLowerCase().includes(appliedFilters.title.toLowerCase())
            )
                return false;
            const price = Number(car.price);
            return !(price < appliedFilters.priceRange[0] || price > appliedFilters.priceRange[1]);
        });
    }, [cars, appliedFilters]);

    const sortedCars = useMemo(() => {
        const result = [...filteredCars];
        switch (sort) {
            case "name":
                return result.sort((a, b) => a.title.localeCompare(b.title));
            case "asc":
                return result.sort((a, b) => Number(a.price) - Number(b.price));
            case "desc":
                return result.sort((a, b) => Number(b.price) - Number(a.price));
            default:
                return result;
        }
    }, [filteredCars, sort]);

    const handleSearch = () => {
        setAppliedFilters(filters);
        setMobileFiltersOpen(false);
    };

    const handleReset = () => {
        setFilters(defaultFilters);
        setAppliedFilters(defaultFilters);
    };

    const activeFilterCount = Object.entries(appliedFilters).filter(([key, value]) => {
        if (key === "priceRange") {
            const [min, max] = value as [number, number];
            return min !== DEFAULT_PRICE_MIN || max !== DEFAULT_PRICE_MAX;
        }
        if (key === "title") return Boolean(value);
        return value !== "All";
    }).length;

    return (
        <div className="container mx-auto max-w-7xl px-4 pb-10 mt-12 sm:mt-20 sm:px-6 lg:px-8">
            <Breadcrumb items={items} className="hover:text-primary" />

            <div className="mb-6 mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 flex-col">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Our Cars
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        {sortedCars.length} {sortedCars.length === 1 ? "car" : "cars"} available
                    </p>
                </div>


                <div className="flex flex-row items-center gap-1.5">
                    <div className="flex items-center gap-2 max-w-xs">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                        <Select
                            className="pr-5 space-x-4"
                            value={sort}
                            onValueChange={(v) => setSort(v as SortOption)}
                            options={(Object.keys(sortLabels) as SortOption[]).map((key) => ({
                                value: key,
                                label: sortLabels[key],
                            }))}
                            placeholder="Sort by">
                        </Select>
                    </div>

                    <div className="hidden lg:flex items-center rounded-lg border border-border bg-background p-0.5 space-x-1">
                        {(["list", "grid"] as ViewMode[]).map((mode) => {
                            const active = view === mode;
                            const Icon = mode === "list" ? List : Grid2x2;
                            return (
                                <SmoothButton
                                    key={mode}
                                    onClick={() => setView(mode)}
                                    aria-label={`${mode} view`}
                                    aria-pressed={active}
                                    className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                                        active
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-background text-muted-foreground hover:bg-secondary"
                                    }`}
                                >
                                    <Icon size={16} aria-hidden="true" />
                                </SmoothButton>
                            );
                        })}
                    </div>

                    <div className="lg:hidden">
                        <MobileSheetFilter
                            mobileSheetTrigger={
                            <SmoothButton variant="soft" className="relative gap-2 rounded-lg bg-background">
                                <SlidersHorizontal size={20} aria-hidden="true" />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center  bg-primary text-xs font-semibold text-primary-foreground">
                      {activeFilterCount}
                    </span>
                                )}
                            </SmoothButton>}
                            mobileFilterControl={mobileFiltersOpen}
                            openChange={setMobileFiltersOpen}
                            filters={filters}
                            setFilters={setFilters}
                            onsearch={handleSearch}
                            onreset={handleReset}
                            categories={categories}
                            years={years}
                            makes={makes}
                            fuelTypes={fuelTypes}
                            transmissions={transmissions}
                            />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <aside className="hidden lg:col-span-1 lg:block">
                    <div className="sticky top-24 rounded-lg border border-border bg-card p-5 shadow-sm">
                        <h2 className="mb-4 text-sm font-semibold text-foreground">Filter results</h2>
                        <FilterPanel
                            filters={filters}
                            setFilters={setFilters}
                            onSearch={handleSearch}
                            onReset={handleReset}
                            categories={categories}
                            years={years}
                            makes={makes}
                            fuelTypes={fuelTypes}
                            transmissions={transmissions}
                        />
                    </div>
                </aside>

                <div className="lg:col-span-3">
                    {sortedCars.length === 0 ? (
                        <div className="flex min-h-[18.75rem] flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
                            <p className="mb-1 text-base font-medium text-foreground">No cars match those filters.</p>
                            <p className="mb-4 text-sm text-muted-foreground">Try widening your search or resetting all filters.</p>
                            <SmoothButton variant="outline" onClick={handleReset} className="border-border">
                                Reset all
                            </SmoothButton>
                        </div>
                    ) : (
                        <div
                            className={
                                view === "grid"
                                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-2"
                                    : "flex flex-col gap-4"
                            }
                        >
                            <AnimatePresence mode="popLayout">
                                {sortedCars.map((car) => (
                                    <motion.div
                                        key={car.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <CarCard car={car} view={view}  onclick={() => navigate(`/cars/${car.id}`)}/>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryPage;