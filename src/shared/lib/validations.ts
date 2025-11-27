import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');
export const requiredString = z.string().min(1, 'This field is required');
export const positiveNumber = z.number().positive('Must be a positive number');
export const nonNegativeNumber = z.number().nonnegative('Must be zero or greater');
export const urlSchema = z.string().url('Invalid URL').optional().or(z.literal(''));

// ============================================
// Auth Schemas
// ============================================

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().optional(),
});

export const signupSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// ============================================
// Dashboard / Inventory schemas
// ============================================

export const productFormSchema = z.object({
    name: requiredString,
    sku: requiredString,
    price: positiveNumber,
    stock: nonNegativeNumber,
    category: requiredString,
});

export type ProductFormData = z.infer<typeof productFormSchema>;

// ============================================
// User schemas
// ============================================

export const userFormSchema = z.object({
    name: requiredString.min(2, 'Name must be at least 2 characters'),
    email: emailSchema,
    website: urlSchema,
});

export type UserFormData = z.infer<typeof userFormSchema>;

// User ID selector schema
export const userIdSelectorSchema = z.object({
    userId: z.number().int().min(1, 'User ID must be at least 1').max(10, 'User ID must be at most 10'),
});

export type UserIdFormData = z.infer<typeof userIdSelectorSchema>;
