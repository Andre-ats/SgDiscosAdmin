import {
    ColumnDef,
} from "@tanstack/react-table";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IProduto } from "@/api/produtos/typeProduto";
import { getImagemUrl } from "@/api/urlImagem";


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
                            <span className="text-[16px]">{row.original.nomeProduto}</span>
                            <span className="text-[12px]">{row.original.nomeArtistaBandaProduto}</span>
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
                <p>R$ {row.original.precoProduto}</p>
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
            cell: ({ row }) => (
                <div className="flex flex-col w-1/2">
                    {row.original.statusProduto == "Inativo" &&
                        <Button className="p-5 bg-green-500 hover:bg-green-700 text-black cursor-pointer">Ativar</Button>
                    }
                    {row.original.statusProduto == "Ativo" &&
                        <Button className="p-5 bg-red-500 hover:bg-red-700 text-white cursor-pointer">Desativar</Button>
                    }
                </div>
            ),
        }


    ]
}