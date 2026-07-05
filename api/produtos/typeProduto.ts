export enum EnumEmbalagemProduto {
  Lacrado = "Lacrado",
  Aberto = "Aberto",
  Reembalado = "Reembalado",
  SemEmbalagem = "SemEmbalagem",
}

export enum EnumFormatoProduto {
  Vinil = "Vinil",
  CD = "CD",
  DVD = "DVD",
  BluRay = "BluRay",
}

export enum EnumGeneroMusicalProduto {
  Rock = "Rock",
  Pop = "Pop",
  Metal = "Metal",
  Punk = "Punk",
  Hardcore = "Hardcore",
  Grunge = "Grunge",
  Indie = "Indie",
  Blues = "Blues",
  Jazz = "Jazz",
  Soul = "Soul",
  Funk = "Funk",
  Disco = "Disco",
  RnB = "RnB",
  HipHop = "HipHop",
  Rap = "Rap",
  Trap = "Trap",
  Reggae = "Reggae",
  Ska = "Ska",
  Dub = "Dub",
  Country = "Country",
  Folk = "Folk",
  Gospel = "Gospel",
  Classica = "Classica",
  Opera = "Opera",
  Eletronica = "Eletronica",
  House = "House",
  Techno = "Techno",
  Trance = "Trance",
  DrumAndBass = "DrumAndBass",
  Dubstep = "Dubstep",
  Synthwave = "Synthwave",
  LoFi = "LoFi",
  Ambient = "Ambient",
  Soundtrack = "Soundtrack",
  Orquestral = "Orquestral",
  MPB = "MPB",
  Samba = "Samba",
  Pagode = "Pagode",
  BossaNova = "BossaNova",
  Sertanejo = "Sertanejo",
  Forro = "Forro",
  Axe = "Axe",
  FunkBrasileiro = "FunkBrasileiro",
  Infantil = "Infantil",
  KPop = "KPop",
  JPop = "JPop",
  Anime = "Anime",
  Instrumental = "Instrumental",
  Outros = "Outros",
}

export enum EnumStatusProduto {
  Ativo = "Ativo",
  Inativo = "Inativo",
  Esgotado = "Esgotado",
  EmBreve = "EmBreve",
}

export enum EnumTipoArquivoProduto {
  Imagem = "Imagem",
  Video = "Video",
}

export enum EnumTipoDeAlbum {
  Album = "Album",
  EP = "EP",
  Single = "Single",
  Live = "Live",
  Soundtrack = "Soundtrack",
  Remix = "Remix",
  Deluxe = "Deluxe",
}

export interface IArquivoProduto {
  publicId: string;
  tipoArquivoProduto: EnumTipoArquivoProduto;
}

export interface IProduto {
  nomeProduto: string;
  nomeArtistaBandaProduto: string;
  descricaoProduto: string;
  empresaProduto: string;
  origemProduto: string;
  anoLancamentoProduto: number;
  codigoBarra: string;

  embalagemProduto: EnumEmbalagemProduto;
  formatoProduto: EnumFormatoProduto;
  tipoDeAlbum: EnumTipoDeAlbum;
  statusProduto: EnumStatusProduto;

  generosMusicaisProduto: EnumGeneroMusicalProduto[];
  arquivosProdutos: IArquivoProduto[];

  quantidadeDeCancoesProduto: number;
  quantidadeProduto: number;
  precoProduto: number;
  precoDescontoProduto: number;

  id: string;
  dataDeCriacao: string;
  dataDeAtualizacao: string;
}

export interface IListagemProdutosResponse {
  paginacaoOutput: IPaginacaoProdutos;
}

export interface IPaginacaoProdutos {
  itens: IProduto[];
  totalItens: number;
  paginaAtual: number;
  itensPorPagina: number;
  totalPaginas: number;
}