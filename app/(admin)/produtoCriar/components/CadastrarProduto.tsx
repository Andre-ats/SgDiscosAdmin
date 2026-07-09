"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { InformacoesGerais } from "./InformacoesGerais";
import { StatusEDisponibilidade } from "./StatusEDisponibilidade";
import { PrecoProduto } from "./PrecoProduto";
import { DetalhesProduto } from "./DetalhesProduto";
import { UploadImagensProduto } from "./UploadImagensProduto";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnumEmbalagemProduto, EnumFormatoProduto, EnumGeneroMusicalProduto, EnumStatusProduto, EnumTipoDeAlbum } from "@/api/produtos/typeProduto";
import { postCriarProduto } from "@/api/produtos/postCriarProduto";
import { postUploadArquivosProduto } from "@/api/produtos/postUploadArquivosProduto";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { getProdutoExterno, IResponseGetProdutoExterno } from "@/api/externa/musicbrainz/getProdutoExterno";
import { getPais } from "@/app/funcoes/PaisesFuncoes";

export function CadastrarProdutos() {

    const [nomeProduto, setNomeProduto] = useState("")
    const [nomeArtistaBanda, setNomeArtistaBanda] = useState("")
    const [descricao, setDescricao] = useState("");
    const [empresaGravadora, setEmpresaGravadora] = useState("")
    const [origem, setOrigem] = useState("")
    const [anoLancamento, setAnoLancamento] = useState<number>()
    const [codigoDeBarra, setCodigoDeBarra] = useState("")
    const [embalagem, setEmbalagem] = useState("")
    const [status, setStatus] = useState("")
    const [quantiaCancoes, setQuantiaCancoes] = useState<number>()
    const [quantidadeProduto, setQuantidadeProduto] = useState<number>();
    const [precoProduto, setPrecoProduto] = useState("");
    const [formatoProduto, setFormatoProduto] = useState("");
    const [tipoDeAlbum, setTipoDeAlbum] = useState("");
    const [quantidadeDeCancoes, setQuantidadeDeCancoes] = useState<number>();
    const [generosMusicaisProduto, setGenerosMusicaisProduto] = useState<EnumGeneroMusicalProduto[]>([]);
    const [imagens, setImagens] = useState<File[]>([]);

    const [produtoApiExterna, setProdutoApiExterna] = useState<IResponseGetProdutoExterno | null>()

    const [spinner, setSpinner] = useState(false)

    const router = useRouter();

    async function handleApiExternaProduto(barcode: string) {
        if(barcode.length < 1){
            toast.error("Código de barra não pode ser nulo.")
            return
        }

        try {
            setSpinner(true);

            const produto = await getProdutoExterno(barcode);

            console.log(produto);

            if (!produto) {
                toast.error("Produto não encontrado.");
                return;
            }

            setNomeProduto(produto.title ?? "");

            setNomeArtistaBanda(
                produto["artist-credit"]
                    ?.map((x) => x.name)
                    .join(", ") ?? ""
            );

            setEmpresaGravadora(
                produto["label-info"]
                    ?.map((x) => x.label?.name)
                    .join(" / ") ?? ""
            );

            setOrigem(getPais(produto.country));

            setAnoLancamento(
                produto.date
                    ? Number(produto.date.substring(0, 4))
                    : undefined
            );

            setCodigoDeBarra(barcode);

            setQuantidadeDeCancoes(produto["track-count"] ?? undefined);

            toast.success("Produto encontrado.");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao buscar produto.");
        } finally {
            setSpinner(false);
        }
    }


    function removerImagem(index: number) {
        setImagens((prev) => prev.filter((_, i) => i !== index));
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setImagens((prev) => [...prev, ...acceptedFiles]);
    }, []);

    async function criarProduto() {
        try {
            const response = await postCriarProduto({
                nomeProduto,
                nomeArtistaBandaProduto: nomeArtistaBanda,
                descricaoProduto: descricao,
                empresaProduto: empresaGravadora,
                origemProduto: origem,
                anoLancamentoProduto: anoLancamento!,
                codigoBarra: codigoDeBarra,
                embalagemProduto: embalagem as EnumEmbalagemProduto,
                formatoProduto: formatoProduto as EnumFormatoProduto,
                tipoDeAlbum: tipoDeAlbum as EnumTipoDeAlbum,
                generosMusicaisProduto,
                quantidadeDeCancoesProduto: quantidadeDeCancoes!,
                quantidadeProduto: quantidadeProduto!,
                precoProduto: Number(precoProduto!.replace(",", ".")),
                statusProduto: status as EnumStatusProduto,
            });

            setSpinner(true);

            const produtoId = response.produto.id;

            if (imagens.length > 0) {
                await postUploadArquivosProduto(produtoId, imagens);
            }

            toast.success("Produto criado com sucesso!");
            router.push("/produtoListagem")
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Erro ao criar produto.");
            }
        } finally {
            setSpinner(false);
        }
    }

    return (
        <>
            {spinner &&
                <Fragment>
                    <div className="fixed inset-0 z-50 bg-black/60" />

                    <Spinner
                        color="white"
                        className="fixed left-1/2 top-1/2 z-60 h-10 w-10 -translate-x-1/2 -translate-y-1/2"
                    />
                </Fragment>
            }
            <div className="grid w-full grid-cols-1 items-stretch gap-4 xl:grid-cols-[2fr_1fr] mt-4">
                <InformacoesGerais
                    nomeProduto={nomeProduto}
                    setNomeProduto={setNomeProduto}
                    nomeArtistaBanda={nomeArtistaBanda}
                    setNomeArtistaBanda={setNomeArtistaBanda}
                    descricao={descricao}
                    setDescricao={setDescricao}
                    empresaGravadora={empresaGravadora}
                    setEmpresaGravadora={setEmpresaGravadora}
                    origem={origem}
                    setOrigem={setOrigem}
                    anoLancamento={anoLancamento}
                    setAnoLancamento={setAnoLancamento}
                    codigoDeBarra={codigoDeBarra}
                    setCodigoDeBarra={setCodigoDeBarra}
                    embalagem={embalagem}
                    setEmbalagem={setEmbalagem}
                    handleApiExternaProduto={handleApiExternaProduto}
                />
                <div className="flex h-full w-full flex-col gap-4">
                    <StatusEDisponibilidade
                        statusProduto={status}
                        setStatusProduto={setStatus}
                        quantidadeProduto={quantidadeProduto}
                        setQuantidadeProduto={setQuantidadeProduto}
                    />
                    <PrecoProduto
                        precoProduto={precoProduto}
                        setPrecoProduto={setPrecoProduto}
                    />
                </div>
            </div>

            <div className="mt-4 w-full">
                <DetalhesProduto
                    formatoProduto={formatoProduto}
                    setFormatoProduto={setFormatoProduto}
                    tipoDeAlbum={tipoDeAlbum}
                    setTipoDeAlbum={setTipoDeAlbum}
                    quantidadeDeCancoes={quantidadeDeCancoes}
                    setQuantidadeDeCancoes={setQuantidadeDeCancoes}
                    generosMusicaisProduto={generosMusicaisProduto}
                    setGenerosMusicaisProduto={setGenerosMusicaisProduto}
                />
            </div>

            <div className="mt-4 grid w-full grid-cols-1 items-stretch gap-4 xl:grid-cols-2">
                <UploadImagensProduto onDrop={onDrop} />

                <Card className="h-full min-h-90 w-full bg-fundoTerciaria">
                    <CardHeader className="text-white">Arquivos enviados</CardHeader>

                    <CardContent className="h-full">
                        <div className="flex h-full flex-col gap-3">
                            {imagens.length === 0 ? (
                                <div className="flex min-h-65 flex-1 items-center justify-center rounded-lg border border-dashed border-[#2A2F3A]">
                                    <p className="text-sm text-zinc-400">
                                        Nenhum arquivo enviado.
                                    </p>
                                </div>
                            ) : (
                                imagens.map((imagem, index) => (
                                    <div
                                        key={`${imagem.name}-${index}`}
                                        className="flex items-center justify-between rounded-lg border border-[#2A2F3A] bg-fundoSecundaria p-2"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={URL.createObjectURL(imagem)}
                                                alt={imagem.name}
                                                className="h-14 w-14 rounded-md object-cover"
                                            />

                                            <div className="flex flex-col">
                                                <span className="max-w-48 truncate text-sm text-white">
                                                    {imagem.name}
                                                </span>

                                                <span className="text-xs text-zinc-400">
                                                    {(imagem.size / 1024 / 1024).toFixed(2)} MB
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removerImagem(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-end w-full mt-5">
                <Button
                    onClick={criarProduto}
                    type="submit"
                    className="bg-primaria text-color hover:bg-[#ffcf0d] py-8 px-5 cursor-pointer"
                >
                    <Plus /> Criar Produto
                </Button>
            </div>
        </>
    );
}