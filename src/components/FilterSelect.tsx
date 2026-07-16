import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface FilterSelectProps {
    label: string;
    options: string[];
}

export const FilterSelect = ({label, options}: FilterSelectProps) => {
    return (
        <div>
            <label className="mb-1 block text-sm text-gray-950">{label}</label>
            <Select defaultValue={options[0]}>
                <SelectTrigger className="w-full text-xs text-gray-950">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="text-xs">
                    {options.map((opt) => (
                        <SelectItem className="text-gray-900 text-xs" key={opt} value={opt}>
                            {opt}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default FilterSelect;