"use client";

import { EnumCondicao, EnumEmbalagemProduto } from "@/api/produtos/typeProduto";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface InformacoesGeraisProps {
    nomeProduto: string;
    setNomeProduto: (value: string) => void;

    nomeArtistaBanda: string;
    setNomeArtistaBanda: (value: string) => void;

    descricao: string;
    setDescricao: (value: string) => void;

    empresaGravadora: string;
    setEmpresaGravadora: (value: string) => void;

    origem: string;
    setOrigem: (value: string) => void;

    anoLancamento: number | undefined;
    setAnoLancamento: (value: number | undefined) => void;

    codigoDeBarra: string;
    setCodigoDeBarra: (value: string) => void;

    embalagem: string;
    setEmbalagem: (value: string) => void;

    condicao: string;
    setCondicao: (value: string) => void;

    handleApiExternaProduto: (barcode: string) => Promise<void>
}

export function InformacoesGerais({
    nomeProduto,
    setNomeProduto,
    nomeArtistaBanda,
    setNomeArtistaBanda,
    descricao,
    setDescricao,
    empresaGravadora,
    setEmpresaGravadora,
    origem,
    setOrigem,
    anoLancamento,
    setAnoLancamento,
    codigoDeBarra,
    setCodigoDeBarra,
    embalagem,
    setEmbalagem,
    handleApiExternaProduto,
    condicao, 
    setCondicao
}: InformacoesGeraisProps) {
    return (
        <Fragment>
            <Card className="h-full w-full bg-fundoTerciaria">
                <CardHeader className="text-white">Informações gerais</CardHeader>
                <div>
                    <CardContent>
                        <Field>
                            <FieldLabel className="text-white">Título *</FieldLabel>
                            <InputGroup className="border-[#2A2F3A]">
                                <InputGroupInput
                                    value={nomeProduto}
                                    onChange={(e) => setNomeProduto(e.target.value)}
                                    className="text-white border-[#2A2F3A]"
                                    type="text"
                                    placeholder="Ex.: Back In Black - AC/DC"
                                    required
                                />
                            </InputGroup>
                            <FieldLabel className="text-white mt-5">Artista / Banda *</FieldLabel>
                            <InputGroup className="border-[#2A2F3A]">
                                <InputGroupInput
                                    value={nomeArtistaBanda}
                                    onChange={(e) => setNomeArtistaBanda(e.target.value)}
                                    className="text-white border-[#2A2F3A]"
                                    type="text"
                                    placeholder="Ex.: AC/DC"
                                    required
                                />
                            </InputGroup>
                            <FieldLabel className="text-white mt-5">
                                Descrição *
                            </FieldLabel>

                            <div className="w-full">
                                <Textarea
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    maxLength={2000}
                                    placeholder="Descreva o produto, faixas, edições, detalhes, etc."
                                    className="w-full min-h-40 resize-none break-all text-white border-[#2A2F3A]"
                                />

                                <div className="mt-2 flex justify-end">
                                    <span className="text-sm text-zinc-400">
                                        {descricao.length}/2000
                                    </span>
                                </div>
                            </div>
                            <div className="flex md:flex-row flex-col w-full justify-between gap-5">
                                <div className="w-full">
                                    <FieldLabel className="text-white mt-5">Empresa / Gravadora *</FieldLabel>
                                    <InputGroup className="border-[#2A2F3A] mt-2">
                                        <InputGroupInput
                                            value={empresaGravadora}
                                            onChange={(e) => setEmpresaGravadora(e.target.value)}
                                            className="text-white border-[#2A2F3A]"
                                            type="text"
                                            placeholder="Ex.: Columbia Records"
                                            required
                                        />
                                    </InputGroup>
                                </div>
                                <div className="w-full">
                                    <FieldLabel className="text-white mt-5">Origem *</FieldLabel>
                                    <InputGroup className="border-[#2A2F3A] mt-2">
                                        <InputGroupInput
                                            value={origem}
                                            onChange={(e) => setOrigem(e.target.value)}
                                            className="text-white border-[#2A2F3A]"
                                            type="text"
                                            placeholder="Ex.: EUA"
                                            required
                                        />
                                    </InputGroup>
                                </div>
                                <div className="w-full">
                                    <FieldLabel className="text-white mt-5">Ano de lançamento *</FieldLabel>
                                    <InputGroup className="border-[#2A2F3A] mt-2">
                                        <InputGroupInput
                                            value={anoLancamento ?? ""}
                                            onChange={(e) =>
                                                setAnoLancamento(
                                                    e.target.value === "" ? undefined : Number(e.target.value)
                                                )
                                            }
                                            className="text-white border-[#2A2F3A]"
                                            type="number"
                                            placeholder="Ex.: 1979"
                                            required
                                        />
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="flex md:flex-row flex-col w-full justify-between gap-5">
                                <div className="md:w-1/2 w-full">
                                    <FieldLabel className="text-white mt-5">Código de barra(EAN/UPC) *</FieldLabel>
                                    <InputGroup className="border-[#2A2F3A] mt-2">
                                        <InputGroupInput
                                            value={codigoDeBarra}
                                            onChange={(e) => setCodigoDeBarra(e.target.value)}
                                            className="text-white border-[#2A2F3A]"
                                            type="text"
                                            placeholder="Ex.: 0123456789123"
                                            required
                                        />
                                        <Button onClick={() => handleApiExternaProduto(codigoDeBarra)} className="bg-primaria text-black hover:bg-[#ffcf0d]">Buscar<Search /></Button>
                                    </InputGroup>
                                </div>
                                <div className="md:w-1/2 w-full">
                                    <Field>
                                        <FieldLabel className="text-white mt-5">Condição *</FieldLabel>
                                        <Select value={condicao} onValueChange={setCondicao}>
                                            <SelectTrigger className="w-full border-[#2A2F3A] bg-fundoTerciaria text-white">
                                                <div className="flex flex-col items-start">
                                                    <SelectValue placeholder="Condição..." />
                                                </div>
                                            </SelectTrigger>

                                            <SelectContent align="start">
                                                <SelectGroup>

                                                    {Object.values(EnumCondicao)
                                                        .sort((a, b) => a.localeCompare(b, "pt-BR"))
                                                        .map((condicao) => (
                                                            <SelectItem key={condicao} value={condicao}>
                                                                {condicao}
                                                            </SelectItem>
                                                        ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>
                                <div className="md:w-1/2 w-full">
                                    <Field>
                                        <FieldLabel className="text-white mt-5">Embalagem *</FieldLabel>
                                        <Select value={embalagem} onValueChange={setEmbalagem}>
                                            <SelectTrigger className="w-full border-[#2A2F3A] bg-fundoTerciaria text-white">
                                                <div className="flex flex-col items-start">
                                                    <SelectValue placeholder="Embalagem..." />
                                                </div>
                                            </SelectTrigger>

                                            <SelectContent align="start">
                                                <SelectGroup>

                                                    {Object.values(EnumEmbalagemProduto)
                                                        .sort((a, b) => a.localeCompare(b, "pt-BR"))
                                                        .map((genero) => (
                                                            <SelectItem key={genero} value={genero}>
                                                                {genero}
                                                            </SelectItem>
                                                        ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>
                            </div>
                        </Field>
                    </CardContent>
                </div>
            </Card>
        </Fragment>
    )
}