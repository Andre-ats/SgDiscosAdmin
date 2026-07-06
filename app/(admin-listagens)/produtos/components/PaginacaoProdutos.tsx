import { IPaginacaoProdutos } from "@/api/produtos/typeProduto";
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

    const paginas = Array.from(
        { length: paginacao.totalPaginas },
        (_, index) => index + 1
    );

    return (
        <Pagination className="w-full rounded-b-xl border border-[#2A2F3A] bg-fundoSecundaria p-5">
            <PaginationContent className="gap-2 w-full flex justify-between">
                <div className="">
                    <Field orientation="horizontal" className="w-fit">
                        <FieldLabel htmlFor="select-rows-per-page" className="text-white">Exibindo</FieldLabel>
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
                        <FieldLabel htmlFor="select-rows-per-page" className="text-white">de<p className="text-primaria">{paginacao.totalItens}</p> produtos</FieldLabel>
                    </Field>
                </div>

                <div className="flex gap-2">
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            className="h-9 w-9 border border-[#2A2F3A] bg-fundoTerciaria text-white hover:bg-[#2A2F3A] [&>span]:hidden"
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

                    {paginas.map((pagina) => (
                        <PaginationItem key={pagina}>
                            <PaginationLink
                                href="#"
                                isActive={pagina === paginacao.paginaAtual}
                                className={
                                    pagina === paginacao.paginaAtual
                                        ? "h-9 w-9 border border-primaria bg-fundoTerciaria text-primaria hover:bg-fundoTerciaria"
                                        : "h-9 w-9 border border-[#2A2F3A] bg-fundoTerciaria text-white hover:bg-[#2A2F3A]"
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    onMudarPagina?.(pagina);
                                }}
                            >
                                {pagina}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {paginacao.totalPaginas > 5 && (
                        <PaginationItem>
                            <PaginationEllipsis className="text-gray-400" />
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            className="h-9 w-9 border border-[#2A2F3A] bg-fundoTerciaria text-white hover:bg-[#2A2F3A] [&>span]:hidden"
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
            </PaginationContent>
        </Pagination>
    );
}