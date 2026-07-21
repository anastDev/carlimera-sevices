import {useState} from "react";
import {Slider} from "@/components/ui/slider.tsx";

interface PriceRangeFilterProps {
    min?: number;
    max?: number;
    onChange?: (range: [number, number]) => void;
}

const formatPrice = (value: number) =>
    `£${value.toLocaleString("en-GB")}`;

export const PriceRangeFilter = ({
                                             min = 1100,
                                             max = 16500,
                                            onChange
                                         }: PriceRangeFilterProps)=>  {
    const [range, setRange] = useState<[number, number]>([min, max]);

    const handleChange = (value: number | readonly number[]) => {
        const newRange = value as [number, number];
        setRange(newRange);
        onChange?.(newRange);
    }

    return (
        <div className="min-w-[10rem]">
            <label className="mb-1 block text-sm text-gray-950">
                Price
                <span className="ml-1 font-normal text-muted-foreground">
          {formatPrice(range[0])} - {formatPrice(range[1])}
        </span>
            </label>
            <Slider
                min={min}
                max={max}
                step={100}
                value={range}
                onValueChange={handleChange}
                className="mt-2 w-full"
            />
        </div>
    );
}

export default PriceRangeFilter;