import { useAuthStore } from "../store/authStore";

/**
 * Hook to access auth state and actions
 */
export function useAuth() {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const login = useAuthStore((state) => state.login);
    const signup = useAuthStore((state) => state.signup);
    const logout = useAuthStore((state) => state.logout);

    return {
        user,
        isAuthenticated,
        login,
        signup,
        logout,
    };
}
