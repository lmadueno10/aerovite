import { PlaceholderPage } from "@shared/components/common/PlaceholderPage";
import { useLocation } from "react-router-dom";

export const ProductsPage = () => {
    const location = useLocation();
    const getTitle = () => {
        if (location.pathname === "/products") return "All Products";
        const path = location.pathname.split("/").pop();
        if (!path) return "Products";
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    };

    return <PlaceholderPage title={getTitle()} />;
};
