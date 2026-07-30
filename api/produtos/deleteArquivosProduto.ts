import { EnumTipoArquivoProduto } from "./typeProduto";

interface IDeleteArquivosProduto {
  produtoId: string
  arquivo: IArquivo[]
}

export interface IArquivo {
  publicId: string
  enumTipoArquivo: EnumTipoArquivoProduto
}

export async function deleteArquivosProduto(
  props: IDeleteArquivosProduto
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Produto/DeleteArquivo/DeleteArquivo`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        produtoId: props.produtoId,
        "Content-Type": "application/json-patch+json",
      },
      body: JSON.stringify(props.arquivo),
    }
  );

  const text = await response.text();

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.replace("/login");
    return null;
  }

  if (!response.ok) {
    throw new Error(text || "Erro ao excluir arquivos.");
  }

  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}