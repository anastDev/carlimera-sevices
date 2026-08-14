import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import FilterPanel from "@/components/FilterPanel.tsx";
import type {FilterState} from "@/types/filterState.ts";
import type {ReactNode} from "react";

interface MobileSheetFilterProps {
    mobileFilterControl: boolean;
    filters: FilterState;
    openChange: (open: boolean) => void;
    setFilters: (filters: FilterState) => void;
    onsearch: () => void;
    onreset: () => void;
    categories: string[];
    years: string[];
    makes: string[];
    fuelTypes: string[];
    transmissions: string[];
    mobileSheetTrigger: ReactNode;
    priceBounds: [number, number];
}

export const MobileSheetFilter = (
    {mobileSheetTrigger, mobileFilterControl, filters, setFilters, openChange, categories, onreset, onsearch, years, makes, fuelTypes, transmissions, priceBounds}
    : MobileSheetFilterProps) => {
    return (
        <Sheet open={mobileFilterControl} onOpenChange={openChange}>
            <SheetTrigger>
                {mobileSheetTrigger}
            </SheetTrigger>
            <SheetContent side="bottom" className="w-full overflow-y-auto sm:max-w-sm px-4 py-4" >
                <div className="mt-8">
                    <FilterPanel
                        filters={filters}
                        setFilters={setFilters}
                        onSearch={onsearch}
                        onReset={onreset}
                        categories={categories}
                        years={years}
                        makes={makes}
                        fuelTypes={fuelTypes}
                        transmissions={transmissions}
                        priceBounds={priceBounds}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSheetFilter;