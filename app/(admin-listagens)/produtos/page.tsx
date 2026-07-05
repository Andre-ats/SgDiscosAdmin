import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { TabelaProdutos } from "./components/TabelaProdutos";

export default function ListagemProduto() {
    return (
        <Fragment>
            <div className="flex justify-between items-center">
                <div className="">
                    <CardTitle className="text-white text-3xl">Produtos</CardTitle>
                    <CardDescription className="mt-2 text-gray-400 text-sm">Gerencie os produtos da sua loja.</CardDescription>
                </div>
                <Button className="bg-primaria text-black p-5 hover:bg-[#ffcf0d] cursor-pointer"><Plus/> Criar Produto</Button>
            </div>
            <div>
                <TabelaProdutos/>
            </div>
        </Fragment>
    )
}