import { useMemo, useCallback } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@shared/components/ui/table";
import { Badge } from "@shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { useDataTable, type ColumnDef, flexRender } from "@shared/hooks/useDataTable";
import type { AutoPart } from "../types/inventory";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

interface InventoryTableProps {
    inventory: AutoPart[];
    loading: boolean;
}

export const InventoryTable = ({ inventory, loading }: InventoryTableProps) => {
    const getStockBadge = useCallback((stock: number) => {
        if (stock < 20) return <Badge variant="destructive">Low Stock</Badge>;
        if (stock < 50) return <Badge variant="secondary">Medium</Badge>;
        return <Badge variant="default">In Stock</Badge>;
    }, []);

    const columns = useMemo<ColumnDef<AutoPart>[]>(
        () => [
            {
                accessorKey: "name",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="h-8 px-2"
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ getValue }) => (
                    <div className="font-medium">{getValue<string>()}</div>
                ),
            },
            {
                accessorKey: "sku",
                header: "SKU",
            },
            {
                accessorKey: "category",
                header: "Category",
                filterFn: "includesString",
            },
            {
                accessorKey: "stock",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="h-8 px-2 ml-auto"
                    >
                        Stock
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ getValue }) => (
                    <div className="text-right">{getValue<number>()}</div>
                ),
            },
            {
                accessorKey: "price",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="h-8 px-2 ml-auto"
                    >
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ getValue }) => (
                    <div className="text-right">${getValue<number>().toFixed(2)}</div>
                ),
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => getStockBadge(row.original.stock),
            },
        ],
        [getStockBadge]
    );

    const table = useDataTable({
        data: inventory,
        columns,
        pageSize: 10,
    });

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">Loading inventory...</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Filter Input */}
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Filter by category..."
                            value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("category")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            {table.getFilteredRowModel().rows.length} row(s) total
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <div className="text-sm">
                                Page {table.getState().pagination.pageIndex + 1} of{" "}
                                {table.getPageCount()}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
