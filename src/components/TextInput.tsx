import type {ControllerRenderProps, FieldError, UseFormRegisterReturn} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {inputClass} from "@/utils/styles.ts";

interface TextInputProps {
    id: string;
    registration: UseFormRegisterReturn | ControllerRenderProps<any, any>;
    error?: FieldError;
    type?: string;
    placeholder?: string;
    step?: string;
}

export const TextInput = ({ id, registration, error, type = "text", placeholder, step }: TextInputProps)=>  {
    return (
        <Input
            id={id}
            type={type}
            step={step}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            className={inputClass}
            {...registration}
        />
    );
}

export default TextInput;