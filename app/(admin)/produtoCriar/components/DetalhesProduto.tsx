"use client"

import { EnumFormatoProduto, EnumGeneroMusicalProduto, EnumTipoDeAlbum } from "@/api/produtos/typeProduto";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fragment } from "react/jsx-runtime";
import { MultiSelectGenero } from "./MultiSelectGenero";
import { useState } from "react";

interface DetalhesProdutoProps {
    formatoProduto: string;
    setFormatoProduto: (value: string) => void;

    tipoDeAlbum: string;
    setTipoDeAlbum: (value: string) => void;

    quantidadeDeCancoes: number | undefined;
    setQuantidadeDeCancoes: (value: number | undefined) => void;

    generosMusicaisProduto: EnumGeneroMusicalProduto[];
    setGenerosMusicaisProduto: (
        value: EnumGeneroMusicalProduto[]
    ) => void;
}

export function DetalhesProduto({
    formatoProduto,
    setFormatoProduto,
    tipoDeAlbum,
    setTipoDeAlbum,
    quantidadeDeCancoes,
    setQuantidadeDeCancoes,
    generosMusicaisProduto,
    setGenerosMusicaisProduto,
}: DetalhesProdutoProps) {

    return (
        <Fragment>
            <Card className="h-full w-full bg-fundoTerciaria">
                <CardHeader className="text-white">Detalhes do produto</CardHeader>
                <div className="flex flex-row w-full justify-between">
                    <CardContent className="flex flex-row justify-between w-full gap-5">
                        <div className="w-full">
                            <Field>
                                <FieldLabel className="text-white mt-5">Formato *</FieldLabel>
                                <Select value={formatoProduto} onValueChange={setFormatoProduto}>
                                    <SelectTrigger className="w-full border-[#2A2F3A] bg-fundoTerciaria text-white">
                                        <div className="flex flex-col items-start">
                                            <SelectValue placeholder="Formato..." />
                                        </div>
                                    </SelectTrigger>

                                    <SelectContent align="start">
                                        <SelectGroup>

                                            {Object.values(EnumFormatoProduto)
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
                        <div className="w-full">
                            <Field>
                                <FieldLabel className="text-white mt-5">Tipo de álbum *</FieldLabel>
                                <Select value={tipoDeAlbum} onValueChange={setTipoDeAlbum}>
                                    <SelectTrigger className="w-full border-[#2A2F3A] bg-fundoTerciaria text-white">
                                        <div className="flex flex-col items-start">
                                            <SelectValue placeholder="Tipo de álbum..." />
                                        </div>
                                    </SelectTrigger>

                                    <SelectContent align="start">
                                        <SelectGroup>

                                            {Object.values(EnumTipoDeAlbum)
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
                        <div className="w-full">
                            <FieldLabel className="text-white mt-5">Quantidade de canções *</FieldLabel>
                            <InputGroup className="border-[#2A2F3A] mt-2">
                                <InputGroupInput
                                    value={quantidadeDeCancoes ?? ""}
                                    onChange={(e) =>
                                        setQuantidadeDeCancoes(
                                            e.target.value === "" ? undefined : Number(e.target.value)
                                        )
                                    }
                                    className="text-white border-[#2A2F3A]"
                                    type="text"
                                    placeholder="Ex.: 14"
                                    required
                                />
                            </InputGroup>
                        </div>
                    </CardContent>
                </div>
                <CardContent className="flex flex-row justify-between w-full gap-5">
                    <div className="w-full">
                        <FieldLabel className="text-white mt-5 mb-2">Quantidade de canções *</FieldLabel>
                        <MultiSelectGenero
                            value={generosMusicaisProduto}
                            onChange={setGenerosMusicaisProduto} />
                    </div>
                </CardContent>
            </Card>
        </Fragment >
    )
}