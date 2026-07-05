"use client";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getProdutos } from "@/api/produtos/getProdutos";
import { IProduto } from "@/api/produtos/typeProduto";
import { getColumns } from "./ColunaTabelaProdutos";


export function TabelaProdutos() {

    const [produtos, setProdutos] = useState<IProduto[]>([]);

    useEffect(() => {
        carregarProdutos();
    }, []);

    async function carregarProdutos() {
        try {
            const response = await getProdutos();

            setProdutos(response.paginacaoOutput.itens ?? []);
        } catch (error) {
            console.error(error);
        }
    }

    async function mudarStatus(produto: IProduto) {
        await //alterarStatusProduto(produto.id);

        carregarProdutos();
    }
    const columns = getColumns({
        onMudarStatus: mudarStatus,
    });

    const table = useReactTable({
        data: produtos,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table className="mt-5 overflow-hidden rounded-xl border border-[#2A2F3A] bg-fundoSecundaria">
            <TableHeader className="bg-fundoTerciaria">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="border-[#2A2F3A] hover:bg-fundoTerciaria">
                        {headerGroup.headers.map((header) => (
                            <TableHead
                                className="h-14 text-sm font-semibold text-white p-5"
                                key={header.id}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>

            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow
                        className="border-[#2A2F3A] bg-fundoSecundaria hover:bg-fundoTerciaria"
                        key={row.id}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell
                                className="p-5 text-sm text-[#F5F7FA]"
                                key={cell.id}
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}