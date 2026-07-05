import { EnumStatusProduto } from "./typeProduto";

export async function putStatusProduto(
  idProduto: string,
  statusProduto: EnumStatusProduto
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Produto/UpdateStatusProduto/UpdateStatusProduto`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        idProduto,
        statusProduto,
      }),
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Erro ao alterar o status do produto.");
  }

  return text;
}