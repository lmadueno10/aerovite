import { Search } from "lucide-react";
import { Input } from "@shared/components/ui/input";

interface TableSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const TableSearch = ({
    value,
    onChange,
    placeholder = "Search...",
    className,
}: TableSearchProps) => {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`pl-9 ${className || ""}`}
            />
        </div>
    );
};
