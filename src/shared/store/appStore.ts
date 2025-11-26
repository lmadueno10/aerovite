import { create } from "zustand";

interface AppState {
    sidebarOpen: boolean;
    selectedMenu: string;
    theme: "light" | "dark";
    toggleSidebar: () => void;
    setSelectedMenu: (menu: string) => void;
    setTheme: (theme: "light" | "dark") => void;
}

export const useAppStore = create<AppState>((set) => ({
    sidebarOpen: true,
    selectedMenu: "Dashboard",
    theme: "light",
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSelectedMenu: (menu) => set({ selectedMenu: menu }),
    setTheme: (theme) => set({ theme }),
}));
