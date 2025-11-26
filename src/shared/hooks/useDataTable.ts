import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
    type PaginationState,
} from '@tanstack/react-table';
import { useState } from 'react';

export interface UseDataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    pageSize?: number;
}

export function useDataTable<TData>({
    data,
    columns,
    pageSize = 10,
}: UseDataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return table;
}

// Export TanStack Table types for convenience
export type { ColumnDef, Row, Table } from '@tanstack/react-table';
export { flexRender } from '@tanstack/react-table';
