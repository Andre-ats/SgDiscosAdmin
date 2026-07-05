import { IListagemProdutosResponse } from "./typeProduto";

export async function getProdutos(): Promise<IListagemProdutosResponse> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Produto/ListarProdutos`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    if (!response.ok) {
        const data = await response.json();

        throw new Error(data.error ?? "Erro ao listar produtos.");
    }

    return await response.json();
}