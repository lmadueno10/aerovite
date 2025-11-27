import { PlaceholderPage } from "@shared/components/common/PlaceholderPage";
import { useLocation } from "react-router-dom";

export const CustomersPage = () => {
    const location = useLocation();
    const getTitle = () => {
        if (location.pathname === "/customers") return "All Customers";
        const path = location.pathname.split("/").pop();
        if (!path) return "Customers";
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    };

    return <PlaceholderPage title={getTitle()} />;
};
