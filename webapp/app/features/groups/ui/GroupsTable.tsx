import { Button } from '@/components/ui/button';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllGroupsQueryObject } from '@/entities/group/api/getAllGroups';
import { Group } from '@/entities/group/model/groups';
import { trpcClient } from '@/lib/trpcClient';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { MoreVertical, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

function GroupsTable() {
    const { data } = useSuspenseQuery(getAllGroupsQueryObject(trpcClient));
    const navigate = useNavigate();

    const columns: ColumnDef<Group>[] = [
        {
            accessorKey: 'name',
            header: 'Nazwa grupy',
        },
    ];
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <h1 className="text-xl my-4">Tabela grup</h1>
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{
                                                width: header.getSize() === 0 ? '50px' : undefined,
                                            }}
                                            className="w-auto"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                onClick={() => navigate(`${row.original.id}`)}
                                className="cursor-pointer"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-2">
                <DataTablePagination table={table} />
            </div>
        </>
    );
}
export default GroupsTable;
