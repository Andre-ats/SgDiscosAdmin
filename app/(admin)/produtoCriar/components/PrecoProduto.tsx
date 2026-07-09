"use client"

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Banknote } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface PrecoProdutoProps {
    precoProduto: string | undefined;
    setPrecoProduto: (value: string) => void;
}

export function PrecoProduto({
    precoProduto,
    setPrecoProduto,
}: PrecoProdutoProps) {


    return (
        <Fragment>
            <Card className="h-full w-full bg-fundoTerciaria">
                <CardHeader className="text-white">Preço</CardHeader>
                <CardContent>
                    <Field>
                        <FieldLabel className="text-white mt-5">Preço do produto (R$) *</FieldLabel>
                        <InputGroup className="border-[#2A2F3A]">
                            <InputGroupAddon>
                                <Banknote />
                            </InputGroupAddon>
                            <InputGroupInput
                                type="text"
                                inputMode="decimal"
                                placeholder="Ex.: 19,90"
                                value={precoProduto}
                                onChange={(e) => {
                                    const valor = e.target.value.replace(/[^0-9,]/g, "");
                                    setPrecoProduto(valor);
                                }}
                                className="text-white border-[#2A2F3A]"
                                required
                            />
                        </InputGroup>
                        <FieldLabel className="text-white mt-5">Preço promocional (R$)</FieldLabel>
                        <InputGroup className="border-[#2A2F3A]">
                            <InputGroupAddon>
                                <Banknote />
                            </InputGroupAddon>
                            <InputGroupInput
                                className="text-white border-[#2A2F3A]"
                                type="text"
                                placeholder="Ex.: 0,00"
                                readOnly
                            />
                        </InputGroup>
                        <CardDescription className="text-[10px]">Preço promocional somente na edição.</CardDescription>
                    </Field>
                </CardContent>
            </Card>
        </Fragment>
    )
}