import { IPaginacaoProdutos } from "@/api/produtos/typeProduto";
import { getPaginas } from "@/app/funcoes/QuantiaDePagina";
import { Field, FieldLabel } from "@/components/ui/field";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

interface IPaginacaoProdutosComponent {
    paginacao?: IPaginacaoProdutos;
    onMudarPagina?: (pagina: number) => void;
    onMudarItensPorPagina?: (itens: number) => void;
}

export function PaginacaoProdutos({
    paginacao,
    onMudarPagina,
    onMudarItensPorPagina,
}: IPaginacaoProdutosComponent) {
    if (!paginacao) return null;

    const paginas: (number | "...")[] = getPaginas({
        paginaAtual: paginacao.paginaAtual,
        totalPaginas: paginacao.totalPaginas,
    });


    return (
        <Pagination className="w-full rounded-b-xl border border-[#2A2F3A] bg-fundoSecundaria p-5">
            <PaginationContent className="gap-2 w-full flex md:justify-between flex-col md:flex-row">
                <div className="">
                    <Field orientation="horizontal" className="w-fit">
                        <FieldLabel htmlFor="select-rows-per-page" className="text-white hidden md:block">Exibindo</FieldLabel>
                        <Select defaultValue="10"
                            value={String(paginacao.itensPorPagina)}
                            onValueChange={(value) => onMudarItensPorPagina?.(Number(value))}
                        >
                            <SelectTrigger className="w-20 text-primaria" id="select-rows-per-page">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent align="start">
                                <SelectGroup>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldLabel htmlFor="select-rows-per-page" className="text-white hidden md:flex">de<p className="text-primaria">{paginacao.totalItens}</p> produtos</FieldLabel>
                    </Field>
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                className="sm:h-9 sm:w-9 h-6 w-6 border border-[#2A2F3A] bg-fundoTerciaria text-white hover:bg-[#2A2F3A] [&>span]:hidden"
                                onClick={(e) => {
                                    e.preventDefault();

                                    if (paginacao.paginaAtual > 1) {
                                        onMudarPagina?.(paginacao.paginaAtual - 1);
                                    }
                                }}

                            >
                                <ChevronLeft className="h-4 w-4" />
                            </PaginationPrevious>
                        </PaginationItem>

                        {paginas.map((pagina, index) => {
                            if (pagina === "...") {
                                return (
                                    <PaginationItem key={`ellipsis-${index}`}>
                                        <PaginationEllipsis className="text-gray-400" />
                                    </PaginationItem>
                                );
                            }

                            return (
                                <PaginationItem key={pagina}>
                                    <PaginationLink
                                        className={
                                            pagina === paginacao.paginaAtual
                                                ? "sm:h-9 sm:w-9 h-6 w-6 border border-primaria bg-fundoTerciaria text-primaria hover:bg-fundoTerciaria"
                                                : "sm:h-9 sm:w-9 h-6 w-6 border border-[#2A2F3A] bg-fundoTerciaria text-white hover:bg-[#2A2F3A]"
                                        }
                                        href="#"
                                        isActive={pagina === paginacao.paginaAtual}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onMudarPagina?.(pagina);
                                        }}
                                    >
                                        {pagina}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                className="sm:h-9 sm:w-9 h-6 w-6 border border-[#2A2F3A] bg-fundoTerciaria text-white hover:bg-[#2A2F3A] [&>span]:hidden"
                                onClick={(e) => {
                                    e.preventDefault();

                                    if (paginacao.paginaAtual < paginacao.totalPaginas) {
                                        onMudarPagina?.(paginacao.paginaAtual + 1);
                                    }
                                }}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </PaginationNext>
                        </PaginationItem>
                    </div>
                </div>
            </PaginationContent>
        </Pagination>
    );
}