import {z} from 'zod';

export const loginSchema = z.object({
    username: z.string().min(3, {error: "Username is invalid"}),
    password: z.string().min(5, {error: 'Password must be at least 5 characters'}),
});

export type LoginFields = z.infer<typeof loginSchema>;