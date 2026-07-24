import { IProduto } from "./typeProduto";

export async function getProdutoById(id?: string): Promise<IProduto> {

    if (localStorage.getItem("role") !== "Admin") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/login";
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Produto/ListarProdutosById?ProdutoId=${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
            data?.erro?.join("\n") ??
            data?.erro ??
            data?.error ??
            "Erro ao buscar produto."
        );
    }

    const data = await response.json();

    return data.produto;
}