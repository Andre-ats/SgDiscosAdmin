import { Card } from "@/components/ui/card";
import { Fragment } from "react/jsx-runtime";
import { CarouselImages } from "./CarouselImages";
import { EnumStatusProduto, IProduto } from "@/api/produtos/typeProduto";
import { Field, FieldContent, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Barcode, CalendarDays, Disc3Icon, Layers, Package, PackageCheckIcon, ShieldCheck } from "lucide-react";

interface IVisualizacaoPrincipal {
    produtos?: IProduto
}

export function VisualizacaoPrincipal(props: IVisualizacaoPrincipal) {
    return (
        <Fragment>
            <Card className="grid h-full gap-8 bg-fundoTerciaria p-6 2xl:grid-cols-[420px_1fr]">
                <CarouselImages arquivos={props.produtos?.arquivosProdutos} />
                <div className="flex w-full flex-row items-stretch gap-5">
                    <Field>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-black">
                                {props.produtos?.statusProduto ===
                                    EnumStatusProduto.Ativo ? (
                                    <p className="flex items-center gap-1 text-[11px] text-green-400">
                                        <span className="size-1.5 rounded-full bg-green-400" />

                                        Em estoque
                                    </p>
                                ) : props.produtos?.statusProduto ===
                                    EnumStatusProduto.Esgotado ? (
                                    <p className="flex items-center gap-2 text-[11px] text-red-500">
                                        <span className="size-1.5 rounded-full bg-red-500" />

                                        Esgotado
                                    </p>
                                ) : props.produtos?.statusProduto ===
                                    EnumStatusProduto.PreVenda ? (
                                    <p className="flex items-center gap-2 text-[11px] text-orange-400">
                                        <span className="size-1.5 rounded-full bg-orange-400" />

                                        Pré-venda
                                    </p>
                                ) : props.produtos?.statusProduto ===
                                    EnumStatusProduto.SobEncomenda ? (
                                    <p className="flex items-center gap-2 text-[11px] text-blue-500">
                                        <span className="size-1.5 rounded-full bg-blue-500" />

                                        Sob Encomenda
                                    </p>
                                )
                                    : (
                                        <p className="text-[11px] text-gray-400">
                                            {props.produtos?.statusProduto}
                                        </p>
                                    )}
                            </span>
                        </div>

                        <FieldTitle className="text-4xl font-semibold text-white">
                            {props.produtos?.nomeProduto}
                        </FieldTitle>

                        <FieldDescription className="mt-1 text-lg text-primaria">
                            {props.produtos?.nomeArtistaBandaProduto}
                        </FieldDescription>

                        <p className="mt-6 text-3xl font-bold text-white">
                            R$ {props.produtos?.precoProduto?.toFixed(2).replace(".", ",")}
                        </p>

                        <FieldDescription>Estoque: {props.produtos?.quantidadeProduto} unidade(s)</FieldDescription>

                        <div className="mt-8 grid gap-4 text-sm text-zinc-400 sm:grid-cols-2">
                            <div className="flex items-center gap-2">
                                <Disc3Icon className="h-5 w-5 text-primaria" />
                                {props.produtos?.formatoProduto} - {props.produtos?.tipoDeAlbum}
                            </div>

                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-5 w-5 text-primaria" />
                                {props.produtos?.anoLancamentoProduto}
                            </div>

                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-primaria" />
                                {props.produtos?.embalagemProduto}
                            </div>

                            <div className="flex items-center gap-2">
                                <Barcode className="h-5 w-5 text-primaria" />
                                {props.produtos?.codigoBarra}
                            </div>
                            <div className="flex items-center gap-2">
                                <Layers className="h-5 w-5 text-primaria" />
                                {props.produtos?.quantidadeDiscos}
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primaria" />
                                {props.produtos?.condicao}
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {props.produtos?.generosMusicaisProduto.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-[#2A2F3A] bg-fundoSecundaria px-3 py-1 text-xs text-white"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </Field>
                </div>
            </Card>
        </Fragment>
    )
}