import { EnumTipoArquivoProduto } from "./produtos/typeProduto";

export function getImagemUrl(
  publicId: string,
  tipo: EnumTipoArquivoProduto
) {
  return `https://res.cloudinary.com/dfaxofgtj/${
    tipo === EnumTipoArquivoProduto.Imagem ? "image" : "video"
  }/upload/${publicId}`;
}