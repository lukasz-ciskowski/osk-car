import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStudentsQueryObject } from '@/entities/user/api/getStudents';
import { User } from '@/entities/user/model/user';
import { trpcClient } from '@/lib/trpcClient';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';

function StudentsTable() {
    const { data } = useSuspenseQuery(getStudentsQueryObject(trpcClient));

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'firstName',
            header: 'Imię',
        },
        {
            accessorKey: 'lastName',
            header: 'Nazwisko',
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
            <h1 className="text-xl my-4">Tabela aktywnych kursantów</h1>
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
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
export default StudentsTable;
