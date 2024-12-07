import { Button } from '@/components/ui/button';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { retrieveGroupWithStudentsQueryObject } from '@/entities/group/api/retrieveGroupWithStudents';
import { trpcClient } from '@/lib/trpcClient';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddStudentModal from './AddStudentModal';

interface Props {
    id: number;
}

function SingleGroupTable({ id }: Props) {
    const { data } = useSuspenseQuery(retrieveGroupWithStudentsQueryObject(id, trpcClient));
    const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);

    const columns: ColumnDef<(typeof data.students)[number]>[] = [
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
        data: data?.students ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h1 className="text-xl my-2">Tabela kursantów dla grupy</h1>
                    <div className="text-sm text-gray-500">
                        Grupa: <b>{data.group.name}</b>
                    </div>
                </div>
                <Button onClick={() => setAddStudentModalOpen(true)}>
                    <Plus />
                    Dodaj kursanta
                </Button>
            </div>
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
            {addStudentModalOpen && <AddStudentModal groupId={id} onClose={() => setAddStudentModalOpen(false)} />}
        </>
    );
}
export default SingleGroupTable;
