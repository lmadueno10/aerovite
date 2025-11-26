import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');
export const requiredString = z.string().min(1, 'This field is required');
export const positiveNumber = z.number().positive('Must be a positive number');
export const nonNegativeNumber = z.number().nonnegative('Must be zero or greater');
export const urlSchema = z.string().url('Invalid URL').optional().or(z.literal(''));

// Dashboard / Inventory schemas
export const productFormSchema = z.object({
    name: requiredString,
    sku: requiredString,
    price: positiveNumber,
    stock: nonNegativeNumber,
    category: requiredString,
});

export type ProductFormData = z.infer<typeof productFormSchema>;

// User schemas
export const userFormSchema = z.object({
    name: requiredString.min(2, 'Name must be at least 2 characters'),
    email: emailSchema,
    website: urlSchema,
});

export type UserFormData = z.infer<typeof userFormSchema>;

// User ID selector schema
export const userIdSchema = z.object({
    userId: z.number().int().min(1, 'User ID must be at least 1').max(10, 'User ID must be at most 10'),
});

export type UserIdFormData = z.infer<typeof userIdSchema>;
