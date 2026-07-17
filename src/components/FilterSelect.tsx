import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
interface FilterSelectProps {
    label: string;
    options: string[];
}

export const FilterSelect = ({label, options}: FilterSelectProps) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-medium text-muted-foreground">{label}</label>
            <Select defaultValue={options[0]}>
                <SelectTrigger className="w-full text-xs h-9 bg-background border-input text-foreground">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="text-xs">
                    {options.map((opt) => (
                        <SelectItem className="text-xs" key={opt} value={opt}>
                            {opt}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default FilterSelect;