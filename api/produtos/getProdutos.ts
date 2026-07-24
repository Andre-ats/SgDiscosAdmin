import { IGetProdutosInput, IListagemProdutosResponse } from "./typeProduto";

export async function getProdutos(
    filtros?: IGetProdutosInput
): Promise<IListagemProdutosResponse> {

    if (localStorage.getItem("role") !== "Admin") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/login";
    }

    const params = new URLSearchParams();

    if (filtros?.paginaAtual)
        params.append("PaginacaoInput.PaginaAtual", filtros.paginaAtual.toString());

    if (filtros?.itensPorPagina)
        params.append("PaginacaoInput.ItensPorPagina", filtros.itensPorPagina.toString());

    if (filtros?.nomeProduto)
        params.append("NomeProduto", filtros.nomeProduto);

    if (filtros?.codigoBarra)
        params.append("CodigoBarra", filtros.codigoBarra);

    if (filtros?.generoMusical)
        params.append("GeneroMusical", filtros.generoMusical);

    if (filtros?.formatoProduto)
        params.append("FormatoProduto", filtros.formatoProduto);

    if (filtros?.tipoDeAlbum)
        params.append("TipoDeAlbum", filtros.tipoDeAlbum);

    if (filtros?.statusProduto)
        params.append("StatusProduto", filtros.statusProduto);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Produto/ListarProdutos?${params.toString()}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    if (!response.ok) {
        const data = await response.json();

        throw new Error(data.error ?? "Erro ao listar produtos.");
    }

    return await response.json();
}