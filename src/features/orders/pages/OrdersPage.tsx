import { PlaceholderPage } from "@shared/components/common/PlaceholderPage";
import { useLocation } from "react-router-dom";

export const OrdersPage = () => {
    const location = useLocation();
    const getTitle = () => {
        if (location.pathname === "/orders") return "All Orders";
        const path = location.pathname.split("/").pop();
        if (!path) return "Orders";
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    };

    return <PlaceholderPage title={getTitle()} />;
};
