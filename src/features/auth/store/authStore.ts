import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthState, LoginCredentials, SignupCredentials } from "../types/auth";
import { authService } from "../services/authService";

interface AuthStore extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (credentials: SignupCredentials) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (credentials) => {
                const { user, token } = await authService.login(credentials);
                set({ user, token, isAuthenticated: true });
            },

            signup: async (credentials) => {
                const { user, token } = await authService.signup(credentials);
                set({ user, token, isAuthenticated: true });
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },

            setUser: (user) => {
                set({ user });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
