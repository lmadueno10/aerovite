import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AutoPart } from "@/core/domain/AutoPart";

interface InventoryTableProps {
    inventory: AutoPart[];
    loading: boolean;
}

export const InventoryTable = ({ inventory, loading }: InventoryTableProps) => {
    const getStockBadge = (stock: number) => {
        if (stock < 20) return <Badge variant="destructive">Low Stock</Badge>;
        if (stock < 50) return <Badge variant="secondary">Medium</Badge>;
        return <Badge variant="default">In Stock</Badge>;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="text-center py-8">Loading inventory...</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">Stock</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventory.map((part) => (
                                <TableRow key={part.id}>
                                    <TableCell className="font-medium">{part.name}</TableCell>
                                    <TableCell>{part.sku}</TableCell>
                                    <TableCell>{part.category}</TableCell>
                                    <TableCell className="text-right">{part.stock}</TableCell>
                                    <TableCell className="text-right">${part.price.toFixed(2)}</TableCell>
                                    <TableCell>{getStockBadge(part.stock)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};
