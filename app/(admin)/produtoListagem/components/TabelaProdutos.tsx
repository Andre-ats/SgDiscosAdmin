"use client";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Fragment, useEffect, useState } from "react";
import { getProdutos } from "@/api/produtos/getProdutos";
import { EnumStatusProduto, IPaginacaoProdutos, IProduto } from "@/api/produtos/typeProduto";
import { getColumns } from "./ColunaTabelaProdutos";
import { putStatusProduto } from "@/api/produtos/putStatusProduto";
import { toast } from "sonner";
import { PaginacaoProdutos } from "./PaginacaoProdutos";
import { BuscaProdutos } from "./BuscaProdutos";


export function TabelaProdutos() {

    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [paginacao, setPaginacao] = useState<IPaginacaoProdutos>();

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(5);

    const [nomeProduto, setNomeProduto] = useState("");
    const [generoMusical, setGeneroMusical] = useState("Todos");
    const [statusProduto, setStatusProduto] = useState("Todos");

    useEffect(() => {
        carregarProdutos();
    }, [paginaAtual, itensPorPagina, nomeProduto, generoMusical, statusProduto]);

    async function carregarProdutos(
        pagina: number = paginaAtual,
        itens: number = itensPorPagina
    ) {
        try {
            const response = await getProdutos({
                paginaAtual: pagina,
                itensPorPagina: itens,
                nomeProduto: nomeProduto || undefined,
                generoMusical: generoMusical === "Todos" ? undefined : generoMusical,
                statusProduto: statusProduto === "Todos" ? undefined : statusProduto,
            });

            setPaginaAtual(pagina);
            setItensPorPagina(itens);
            setPaginacao(response.paginacaoOutput);
            setProdutos(response.paginacaoOutput.itens ?? []);
        } catch (error) {
            console.error(error);
        }
    }

    async function mudarStatus(produto: IProduto) {
        try {
            const novoStatus =
                produto.statusProduto === EnumStatusProduto.Ativo
                    ? EnumStatusProduto.Inativo
                    : EnumStatusProduto.Ativo;

            await putStatusProduto(produto.id, novoStatus);

            toast.success("Produto atualizado com sucesso!");
            carregarProdutos();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Erro ao atualizar o produto.");
            }
        }
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
        <Fragment>
            <BuscaProdutos
                nomeProduto={nomeProduto}
                generoMusical={generoMusical}
                statusProduto={statusProduto}
                onNomeProdutoChange={setNomeProduto}
                onGeneroMusicalChange={setGeneroMusical}
                onStatusProdutoChange={setStatusProduto}
            />

            <div className="mt-5 w-full overflow-x-auto rounded-t-xl border border-[#2A2F3A] bg-fundoSecundaria">
                <Table className="min-w-200">
                    <TableHeader className="bg-fundoTerciaria">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-[#2A2F3A] hover:bg-fundoTerciaria">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        className="h-14 p-5 text-sm font-semibold text-white"
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
            </div>

            <div className="w-full">
                <PaginacaoProdutos
                    paginacao={paginacao}
                    onMudarPagina={(pagina) => carregarProdutos(pagina, itensPorPagina)}
                    onMudarItensPorPagina={(itens) => carregarProdutos(1, itens)}
                />
            </div>
        </Fragment>
    );
}