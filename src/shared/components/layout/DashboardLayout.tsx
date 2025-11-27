import { Sidebar } from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { ProtectedRoute } from "@features/auth";

export const DashboardLayout = () => {
    const location = useLocation();

    return (
        <ProtectedRoute>
            <div className="flex h-screen overflow-hidden bg-gray-50">
                <Sidebar currentPath={location.pathname} />
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </ProtectedRoute>
    );
};
