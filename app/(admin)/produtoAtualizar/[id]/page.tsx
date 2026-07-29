import { CardDescription, CardTitle } from "@/components/ui/card";
import { AtualizarProduto } from "./components/AtualizarProduto";
import { Fragment } from "react/jsx-runtime";

export default function ProdutoAtualizar() {
    return (
        <Fragment>
            <div className="flex justify-between items-center">
                <div className="">
                    <CardTitle className="text-white text-3xl">Atualizar Produto</CardTitle>
                    <CardDescription className="mt-2 text-gray-400 text-sm">Preencha os dados abaixo para atualizar um produto existente.</CardDescription>
                </div>
            </div>
            <AtualizarProduto />
        </Fragment>
    )
}