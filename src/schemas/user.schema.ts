import {z} from 'zod';

export const userSchema = z.object({
    username: z.string().min(3, {error: 'Username must be at least 3 characters'}),
    password:z.string().min(5,{error: 'Password must be at least 5 characters'}),
    fullName: z.string(),
    email: z.email('Invalid email address').min(1, {error: "Email is required"}),
    phoneType: z.enum(['phone', 'home', 'work']).optional().or(z.literal("")),
    phoneNumber: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .optional(),

    email: z.email('Invalid email address').min(1, {error: "Email is required"}).optional(),

    password: z.string()
        .min(5, "Password must be at least 5 characters")
        .optional()
        .or(z.literal('')),

    fullName: z.string(),
    phoneType: z.enum(['phone', 'home', 'work']).optional().or(z.literal("")),
    phoneNumber: z.string().optional(),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;

export const bookingFormSchema = z.object({
    fullName: z.string(),
    email: z.email('Invalid email address').min(1, {error: "Email is required"}),
    phoneNumber: z.string()
        .trim()
        .min(7, "Enter a valid phone number")
        .regex(/^[0-9+\s()-]+$/, "Phone number can only contain digits, spaces, +, -, ()"),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export const contactFormSchema = z.object({
    fullName: z.string(),
    email: z.email('Invalid email address').min(1, {error: "Email is required"}),
    message: z.string().min(5, "Message must be at least 5 characters"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>;