import type { LoginCredentials, SignupCredentials, ForgotPasswordData, ResetPasswordData, AuthResponse } from "../types/auth";

// Utility to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mocked auth service
export const authService = {
    /**
     * Mock login - accepts any credentials
     * Returns mock user and token
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        await delay(400);

        // Simulate success for any valid email format
        return {
            user: {
                id: "mock-user-1",
                email: credentials.email,
                name: "Mock User",
            },
            token: `mock-jwt-token-${Date.now()}`,
        };
    },

    /**
     * Mock signup - accepts any credentials
     * Returns mock user and token
     */
    signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
        await delay(500);

        return {
            user: {
                id: `mock-user-${Date.now()}`,
                email: credentials.email,
                name: credentials.name,
            },
            token: `mock-jwt-token-${Date.now()}`,
        };
    },

    /**
     * Mock forgot password - always succeeds
     * Simulates 800-1200ms delay
     */
    forgotPassword: async (_data: ForgotPasswordData): Promise<{ success: boolean }> => {
        const randomDelay = Math.floor(Math.random() * 400) + 800; // 800-1200ms
        await delay(randomDelay);

        return { success: true };
    },

    /**
     * Mock reset password - always succeeds
     */
    resetPassword: async (_data: ResetPasswordData): Promise<{ success: boolean }> => {
        await delay(400);

        return { success: true };
    },

    /**
     * Mock logout - instant
     */
    logout: async (): Promise<void> => {
        // In real implementation, would invalidate token on server
        await delay(100);
    },
};
