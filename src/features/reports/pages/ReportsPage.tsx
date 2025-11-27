import { PlaceholderPage } from "@shared/components/common/PlaceholderPage";
import { useLocation } from "react-router-dom";

export const ReportsPage = () => {
    const location = useLocation();
    const getTitle = () => {
        if (location.pathname === "/reports") return "Reports Overview";
        const path = location.pathname.split("/").pop();
        if (!path) return "Reports";
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    };

    return <PlaceholderPage title={getTitle()} />;
};
