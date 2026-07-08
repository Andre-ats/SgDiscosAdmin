"use client"

import { getProdutoById } from "@/api/produtos/getProdutoById";
import { IProduto } from "@/api/produtos/typeProduto";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { VisualizacaoPrincipal } from "./VisualizacaoPrincipal";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldTitle } from "@/components/ui/field";
import { InformacoesGerais } from "./InformacoesGerais";

export function VisualizarProduto() {

    const { id } = useParams();
    const [produto, setProduto] = useState<IProduto>()

    useEffect(() => {
        getProdutosByIdHandler()
    }, [])

    async function getProdutosByIdHandler() {
        setProduto(await getProdutoById(id as string))
    }

    console.log(produto)

    return (
        <Fragment>
            <div className="flex justify-between items-center">
                <div className="">
                    <CardTitle className="text-white text-3xl">Visualizar Produto</CardTitle>
                    <CardDescription className="mt-2 text-gray-400 text-sm">Visualize os campos do seu produto.</CardDescription>
                </div>
            </div>
            <div className="w-full flex flex-row gap-5 mt-4">
                <div className="w-3/5">
                    <VisualizacaoPrincipal produtos={produto} />
                </div>
                <div className="flex w-2/5 flex-col gap-6">
                    <Card className="flex-1 gap-8 bg-fundoTerciaria p-6">
                        <div className="justify-center">
                            <Field>
                                <FieldTitle className="text-white text-lg">Descrição</FieldTitle>
                                <Textarea
                                    spellCheck={false}
                                    value={produto?.descricaoProduto}
                                    maxLength={2000}
                                    placeholder="Descreva o produto, faixas, edições, detalhes, etc."
                                    className="w-full min-h-40 resize-none break-all text-white border-[#2A2F3A] disabled:bg-fundoTerciaria"
                                    disabled
                                />

                                <div className="mt-2 flex justify-end">
                                    <span className="text-sm text-zinc-400">
                                        {produto?.descricaoProduto.length}/2000
                                    </span>
                                </div>
                            </Field>
                        </div>
                    </Card>
                    <Card className="flex-1 bg-fundoTerciaria p-6">
                        <Field>
                            <FieldTitle className="text-white text-lg">
                                Detalhes do produto
                            </FieldTitle>

                            <div className="divide-y divide-[#2A2F3A]">
                                <div className="grid grid-cols-2 py-4">
                                    <span className="text-sm text-zinc-400">Formato</span>
                                    <span className="text-sm font-medium text-white">
                                        {produto?.formatoProduto}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 py-4">
                                    <span className="text-sm text-zinc-400">Tipo de álbum</span>
                                    <span className="text-sm font-medium text-white">
                                        {produto?.tipoDeAlbum}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 py-4">
                                    <span className="text-sm text-zinc-400">Quantidade de canções</span>
                                    <span className="text-sm font-medium text-white">
                                        {produto?.quantidadeDeCancoesProduto}
                                    </span>
                                </div>
                            </div>
                        </Field>
                    </Card>
                </div>
            </div>
            <div className="mt-6">
                <InformacoesGerais produtos={produto}/>
            </div>
        </Fragment>
    )
}