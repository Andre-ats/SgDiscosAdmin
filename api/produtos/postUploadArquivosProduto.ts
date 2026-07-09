export async function postUploadArquivosProduto(
  produtoId: string,
  arquivos: File[]
) {
  const formData = new FormData();

  arquivos.forEach((arquivo) => {
    formData.append("ArquivoLista", arquivo);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Produto/UploadArquivos/UploadArquivos`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        produtoId,
      },
      body: formData,
    }
  );

  const text = await response.text();

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.replace("/login");
  }

  if (!response.ok) {
    throw new Error(text || "Erro ao realizar operação.");
  }

  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}