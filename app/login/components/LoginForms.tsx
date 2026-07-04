"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Shield, Mail, LogIn, Lock } from "lucide-react";
import { useEffect, useState } from "react";

export function LoginForms() {

    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()

    function logar() {
        console.log(email, senha)
    }

    return (
        <Card className="w-4/5 my-10 sm:my-25 flex flex-row bg-[#1D212B]">
            <CardContent className="w-full flex items-center">
                <FieldGroup className="flex items-center">
                    <Field>
                        <div className="flex flex-col items-center text-center">
                            <Shield color="white" className="mb-4 h-10 w-10" />

                            <FieldLabel className="sm:text-2xl text-xl font-semibold text-white">
                                Acessar o Painel
                            </FieldLabel>

                            <FieldDescription className="text-white text-[12px] sm:text-sm">
                                Informe seu email e senha para entrar.
                            </FieldDescription>
                        </div>
                    </Field>
                    <Field>
                        <FieldLabel className="text-white">E-mail</FieldLabel>
                        <InputGroup className="border-[#2A2F3A]">
                            <InputGroupAddon>
                                <Mail />
                            </InputGroupAddon>
                            <InputGroupInput
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-white border-[#2A2F3A]" type="email" placeholder="Digite seu Email..." />
                        </InputGroup>
                    </Field>

                    <Field>
                        <FieldLabel className="text-white">Senha</FieldLabel>
                        <InputGroup className="border-[#2A2F3A]">
                            <InputGroupAddon>
                                <Lock />
                            </InputGroupAddon>
                            <InputGroupInput
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="text-white" type="password" placeholder="Digite sua Senha..." />
                        </InputGroup>
                    </Field>

                    <div className="w-full flex justify-center">
                        <Field className="w-1/2 mt-4">
                            <Button onClick={logar} className="bg-[#fcda54] text-color hover:bg-[#ffcf0d]"><LogIn />Entrar</Button>
                        </Field>
                    </div>
                </FieldGroup>
            </CardContent>
        </Card>
    )
}