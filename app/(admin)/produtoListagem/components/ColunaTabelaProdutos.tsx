import {
    ColumnDef,
} from "@tanstack/react-table";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EnumStatusProduto, IProduto } from "@/api/produtos/typeProduto";
import { getImagemUrl } from "@/api/urlImagem";
import { Eye, Pencil, Power, Search } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";


interface ColumnsProps {
    onMudarStatus: (produto: IProduto) => void;
}

export function getColumns({
    onMudarStatus,
}: ColumnsProps): ColumnDef<IProduto>[] {
    return [
        {
            accessorKey: "imagem",
            header: "Produto",
            cell: ({ row }) => {
                const arquivo = row.original.arquivosProdutos?.[0];

                const imagem = arquivo
                    ? getImagemUrl(arquivo.publicId, arquivo.tipoArquivoProduto)
                    : "https://dummyimage.com/300x300/ffffff/e5e7eb&text=Sem+Imagem";

                return (
                    <div className="flex items-center gap-3">
                        <Image
                            src={imagem}
                            alt={row.original.nomeProduto}
                            width={45}
                            height={45}
                            className="rounded-md object-cover"
                        />
                        <div className="flex flex-col">
                            <span className="text-[16px] max-w-33 xl:max-w-40 truncate">{row.original.nomeProduto}</span>
                            <span className="text-[12px] max-w-33 xl:max-w-40 truncate">{row.original.nomeArtistaBandaProduto}</span>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "categoria",
            header: "Categoria",
            cell: ({ row }) => (
                <p className="bg-primaria text-black w-fit p-2 rounded-xl">{row.original.generosMusicaisProduto[0]}</p>
            )
        },
        {
            accessorKey: "preco",
            header: "Preço",
            cell: ({ row }) => (
                <p>
                    {row.original.precoProduto.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
            )
        },
        {
            accessorKey: "quantidadeProduto",
            header: "Estoque",
        },
        {
            accessorKey: "statusProduto",
            header: "Status",
            cell: ({ row }) => {
                const coresStatus = {
                    [EnumStatusProduto.Ativo]: "bg-green-500 text-black",
                    [EnumStatusProduto.Inativo]: "bg-red-500 text-white",
                    [EnumStatusProduto.Esgotado]: "bg-orange-500 text-white",
                    [EnumStatusProduto.PreVenda]: "bg-orange-500 text-white",
                };

                return (
                    <Fragment>
                        {row.original.statusProduto === EnumStatusProduto.Ativo ? (
                            <p className="text-green-400 text-[11px] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Em estoque</p>
                        ) : row.original.statusProduto === EnumStatusProduto.Inativo ? (
                            <p className="text-red-500 text-[11px] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Inativo</p>
                        ) : row.original.statusProduto === EnumStatusProduto.Esgotado ? (
                            <p className="text-red-500 text-[11px] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Esgotado</p>
                        ) : row.original.statusProduto === EnumStatusProduto.PreVenda ? (
                            <p className="text-orange-400 text-[11px] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>Pré-venda</p>
                        ) : row.original.statusProduto === EnumStatusProduto.SobEncomenda ? (
                            <p className="text-blue-500 text-[11px] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Sob Encomenda</p>
                        ): (
                            <p>{row.original.statusProduto}</p>
                        )}
                    </Fragment>
                );
            }
        },

        {
            id: "acoes",
            header: "Ações",
            cell: ({ row }) => {
                const ativo = row.original.statusProduto === "Ativo";

                return (
                    <div className="flex items-center gap-2">
                        <Button
                            asChild
                            size="icon"
                            variant="outline"
                            className="h-9 w-9 border-[#2A2F3A] bg-fundoTerciaria text-white hover:bg-[#2A2F3A]"
                        >
                            <Button asChild size="icon">
                                <Link href={`/produtoVisualizar/${row.original.id}`}>
                                    <Eye />
                                </Link>
                            </Button>
                        </Button>


                        <Link href={`/produtoAtualizar/${row.original.id}`}>
                            <Button
                                size="icon"
                                className="h-9 w-9 cursor-pointer border-[#2A2F3A] bg-primaria text-black hover:bg-[#ffcf0d]"
                            >

                                <Pencil />
                            </Button>
                        </Link>
                    </div>
                );
            },
        }


    ]
}