import {Input} from "@/components/ui/input.tsx";
import PriceRangeFilter from "@/components/PriceRangeFilter.tsx";
import {Button} from "@/components/ui/button.tsx";
import FilterField from "@/components/FilterField.tsx";
import type {FilterState} from "@/types/filterState.ts";

interface FilterPanelProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    onSearch: () => void;
    onReset: () => void;
    categories: string[];
    years: string[];
    makes: string[];
    fuelTypes: string[];
    transmissions: string[];
    priceBounds: [number, number];
}

export const  FilterPanel = ({
                         filters,
                         setFilters,
                         onSearch,
                         onReset,
                         categories,
                         years,
                         makes,
                         fuelTypes,
                         transmissions,
                        priceBounds,
                     }: FilterPanelProps)=>  {
    return (
        <div className="space-y-5">

            {/* Temporary Field */}
            <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Search by title</label>
                <Input
                    placeholder="e.g. Qashqai, Fiesta..."
                    value={filters.title}
                    onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                />
            </div>

            <FilterField
                label="Category"
                value={filters.category}
                onChange={(v) => setFilters({ ...filters, category: v })}
                options={categories}
            />
            <FilterField
                label="Make"
                value={filters.make}
                onChange={(v) => setFilters({ ...filters, make: v })}
                options={makes}
            />
            <FilterField
                label="Year"
                value={filters.year}
                onChange={(v) => setFilters({ ...filters, year: v })}
                options={years}
            />
            <FilterField
                label="Fuel type"
                value={filters.fuelType}
                onChange={(v) => setFilters({ ...filters, fuelType: v })}
                options={fuelTypes}
            />
            <FilterField
                label="Transmission"
                value={filters.transmission}
                onChange={(v) => setFilters({ ...filters, transmission: v })}
                options={transmissions}
            />

            <div>
                <PriceRangeFilter
                    min={priceBounds[0]}
                    max={priceBounds[1]}
                    onChange={(range) => setFilters({ ...filters, priceRange: range })}
                />
            </div>

            <div className="flex gap-2 pt-2">
                <Button
                    variant="outline"
                    onClick={onReset}
                    className="flex-1 py-4 px-3 border-border text-muted-foreground hover:bg-secondary hover:text-primary"
                >
                    Reset all
                </Button>
                <Button
                    onClick={onSearch}
                    className="flex-1 py-4 px-3 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    Search
                </Button>
            </div>
        </div>
    );
}

export default FilterPanel;