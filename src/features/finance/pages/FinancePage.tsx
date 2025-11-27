import { PlaceholderPage } from "@shared/components/common/PlaceholderPage";
import { useLocation } from "react-router-dom";

export const FinancePage = () => {
    const location = useLocation();
    const getTitle = () => {
        if (location.pathname === "/finance") return "Finance Overview";
        const path = location.pathname.split("/").pop();
        if (!path) return "Finance";
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    };

    return <PlaceholderPage title={getTitle()} />;
};
