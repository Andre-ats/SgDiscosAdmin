import { Fragment } from "react/jsx-runtime";
import { VisualizarProduto } from "./component/VisualizarProduto";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Visualizar Produto | SGDiscos",
};

export default function ProdutoVisualizar(){

    return(
        <Fragment>
            <VisualizarProduto/>
        </Fragment>
    )
}