import type {FieldValues, UseFormRegister, Path} from "react-hook-form";

export interface FormErrors {
    username?: string;
    password?: string;
    firstname?:string;
    lastname?: string;
    email?: string;
    area?: string;
    street?: string;
    number?: string;
    po?:string;
    municipality?: string;
    phoneType?: string;
    phoneNumber?: string;
}

export interface Options {
    value: string;
    label: string;
}

export interface FormInputProps <T extends FieldValues>{
    type: string;
    label?: string;
    name: Path<T>;
    placeholder: string;
    options?: Options[];
    required: boolean;
    register: UseFormRegister<T>;
    className?: string;
}