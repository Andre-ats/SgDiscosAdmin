"use client"

import { EnumStatusProduto } from "@/api/produtos/typeProduto";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface StatusEDisponibilidadeProps {
    statusProduto: string;
    setStatusProduto: (value: string) => void;

    quantidadeProduto: number | undefined;
    setQuantidadeProduto: (value: number | undefined) => void;
}

export function StatusEDisponibilidade({
    statusProduto,
    setStatusProduto,
    quantidadeProduto,
    setQuantidadeProduto,
}: StatusEDisponibilidadeProps) {

    return (
        <Fragment>
            <Card className="h-full w-full bg-fundoTerciaria">
                <CardHeader className="text-white">Status e Disponibilidade</CardHeader>
                <CardContent>
                    <Field>
                        <FieldLabel className="text-white mt-5">Status *</FieldLabel>
                        <Select value={statusProduto} onValueChange={setStatusProduto} required>
                            <SelectTrigger className="w-full border-[#2A2F3A] bg-fundoTerciaria text-white">
                                <div className="flex flex-col items-start">
                                    <SelectValue placeholder="Status..." />
                                </div>
                            </SelectTrigger>

                            <SelectContent align="start">
                                <SelectGroup>

                                    {Object.values(EnumStatusProduto)
                                        .sort((a, b) => a.localeCompare(b, "pt-BR"))
                                        .map((genero) => (
                                            <SelectItem key={genero} value={genero}>
                                                {genero}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldLabel className="text-white mt-5">Quantidade em estoque *</FieldLabel>
                        <InputGroup className="border-[#2A2F3A]">
                            <InputGroupInput
                                value={quantidadeProduto ?? ""}
                                onChange={(e) =>
                                    setQuantidadeProduto(
                                        e.target.value === "" ? undefined : Number(e.target.value)
                                    )
                                }
                                className="text-white border-[#2A2F3A]"
                                type="number"
                                placeholder="Ex.: 10"
                                required
                            />
                        </InputGroup>
                        <CardDescription className="text-[10px]">Quantidade disponível para venda.</CardDescription>
                    </Field>
                </CardContent>
            </Card>
        </Fragment>
    )
}