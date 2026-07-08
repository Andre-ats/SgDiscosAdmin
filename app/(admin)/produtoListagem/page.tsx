import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { TabelaProdutos } from "./components/TabelaProdutos";
import Link from "next/link";

export default function ListagemProduto() {
    return (
        <Fragment>
            <div className="md:flex justify-between items-center">
                <div className="">
                    <CardTitle className="text-white text-3xl">Produtos</CardTitle>
                    <CardDescription className="mt-2 text-gray-400 text-sm">Gerencie os produtos da sua loja.</CardDescription>
                </div>
                <Link href="/produtoCriar">
                    <Button className="bg-primaria text-black p-5 hover:bg-[#ffcf0d] cursor-pointer mt-4 md:mt-0 w-full md:mt-fix">
                        <Plus />
                        Criar Produto
                    </Button>
                </Link>
            </div>
            <div>
                <TabelaProdutos />
            </div>
        </Fragment>
    )
}