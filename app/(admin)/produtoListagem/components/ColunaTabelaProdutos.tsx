import {
    ColumnDef,
} from "@tanstack/react-table";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IProduto } from "@/api/produtos/typeProduto";
import { getImagemUrl } from "@/api/urlImagem";
import { Eye, Power, Search } from "lucide-react";
import Link from "next/link";


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
                <p>R$ {row.original.precoProduto.toFixed(2)}</p>
            )
        },
        {
            accessorKey: "quantidadeProduto",
            header: "Estoque",
        },
        {
            accessorKey: "statusProduto",
            header: "Status",
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

                        <Button
                            size="icon"
                            onClick={() => onMudarStatus(row.original)}
                            className={`h-9 w-9 cursor-pointer ${ativo
                                ? "bg-red-500 text-white hover:bg-red-700"
                                : "bg-green-500 text-black hover:bg-green-700"
                                }`}
                        >
                            <Power className="h-4 w-4" />
                        </Button>
                    </div>
                );
            },
        }


    ]
}