import { CardDescription, CardTitle } from "@/components/ui/card";
import { Fragment } from "react/jsx-runtime";
import { CadastrarProdutos } from "./components/CadastrarProduto";
import { DetalhesProduto } from "./components/DetalhesProduto";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Criar Produto | SGDiscos",
};

export default function produtoCadastrar() {
    return (
        <Fragment>
            <div className="flex justify-between items-center">
                <div className="">
                    <CardTitle className="text-white text-3xl">Criar Produto</CardTitle>
                    <CardDescription className="mt-2 text-gray-400 text-sm">Preencha os dados abaixo para cadastrar um novo produto.</CardDescription>
                </div>
            </div>
            <div>
                <CadastrarProdutos/>
            </div>
            
        </Fragment>
    )
}