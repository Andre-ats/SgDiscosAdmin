"use client";

import { ILogin, login } from "@/api/login/login";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Shield, Mail, LogIn, Lock } from "lucide-react";
import { FormEvent, Fragment, useState } from "react";
import { toast } from "sonner";

export function LoginForms() {

    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")

    const [spinner, setSpinner] = useState(false)

    async function logar() {

        const dados: ILogin = {
            login: email,
            senha,
        };

        try {
            setSpinner(true);
            await login(dados);
            toast.success("Login realizado com sucesso!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Erro inesperado.");
            }
        } finally {
            setSpinner(false);
        }
    }

    return (
        <Fragment>
            {spinner &&
                <Fragment>
                    <div className="absolute inset-0 bg-black/60 rounded-l-xl" />
                    <Spinner color="white" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10" />
                </Fragment>
            }
            <Card className="w-4/5 my-10 sm:my-25 flex flex-row bg-[#1D212B]">
                <CardContent className="w-full flex items-center">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            logar();
                        }}
                        className="w-full"
                    >
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
                                        className="text-white border-[#2A2F3A]"
                                        type="email"
                                        placeholder="Digite seu Email..."
                                        required
                                    />
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
                                        className="text-white"
                                        type="password"
                                        placeholder="Digite sua Senha..."
                                        required
                                    />
                                </InputGroup>
                            </Field>

                            <div className="w-full flex justify-center">
                                <Field className="w-1/2 mt-4">
                                    <Button
                                        type="submit"
                                        className="bg-[#fcda54] text-color hover:bg-[#ffcf0d]"
                                    >
                                        <LogIn />
                                        Entrar
                                    </Button>
                                </Field>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </Fragment>
    )
}