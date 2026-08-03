import {
  EnumCondicao,
  EnumEmbalagemProduto,
  EnumFormatoProduto,
  EnumGeneroMusicalProduto,
  EnumStatusProduto,
  EnumTipoDeAlbum,
} from "./typeProduto";

export interface ICriarProdutoInput {
  nomeProduto: string;
  nomeArtistaBandaProduto: string;
  descricaoProduto: string;
  empresaProduto: string;
  origemProduto: string;
  anoLancamentoProduto: number;
  codigoBarra: string;
  condicao: EnumCondicao
  embalagemProduto: EnumEmbalagemProduto;
  formatoProduto: EnumFormatoProduto;
  tipoDeAlbum: EnumTipoDeAlbum;
  generosMusicaisProduto: EnumGeneroMusicalProduto[];
  quantidadeDeCancoesProduto: number;
  quantidadeProduto: number;
  quantidadeDiscos: number
  precoProduto: number;
  statusProduto: EnumStatusProduto;
}

export async function postCriarProduto(body: ICriarProdutoInput) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Produto/CadastrarProduto`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        criarProdutoDto: body,
      }),
    }
  );

  const text = await response.text();

  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.replace("/login");
  }

  console.log(data.errors)

  if (!response.ok) {
    if (Array.isArray(data?.erro)) {
      throw new Error(data.erro.join("\n"));
    }

    if (typeof data?.erro === "string") {
      throw new Error(data.erro);
    }

    if (typeof data?.error === "string") {
      throw new Error(data.error);
    }

    throw new Error("Erro ao cadastrar produto.");
  }

  return data;
}