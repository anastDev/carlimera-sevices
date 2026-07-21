import Select from "@/components/smoothui/select";

interface FilterFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
}

export const  FilterField = ({
                                 label,
                                 value,
                                 onChange,
                                 options,
                             }: FilterFieldProps)=>  {

    const selectOptions = options.map((option) => ({
        value: option,
        label: option,
    }));

    return (
        <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {label}
            </label>

            <Select
                aria-label={label}
                value={value}
                options={selectOptions}
                onValueChange={onChange}
                placeholder={`Select ${label}`}
            />
        </div>
    );
}

export default FilterField;