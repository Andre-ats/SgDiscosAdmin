import { IProduto } from "@/api/produtos/typeProduto";
import { Card } from "@/components/ui/card";
import { Field, FieldTitle } from "@/components/ui/field";

interface IInformacoesGeraisProps {
    produtos?: IProduto;
}

export function InformacoesGerais(props: IInformacoesGeraisProps) {
    return (
        <Card className="bg-fundoTerciaria p-6">
            <Field>
                <FieldTitle className="text-lg text-white">
                    Informações gerais
                </FieldTitle>

                <div className="mt-6 border-t border-[#2A2F3A]">
                    <div className="grid sm:grid-cols-3 gap-8 py-4">
                        <div>
                            <p className="text-xs text-zinc-400">
                                Gravadora
                            </p>

                            <p className="mt-1 text-sm font-medium text-white">
                                {props.produtos?.empresaProduto}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-400">
                                Origem
                            </p>

                            <p className="mt-1 text-sm font-medium text-white">
                                {props.produtos?.origemProduto}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-400">
                                Ano de lançamento
                            </p>

                            <p className="mt-1 text-sm font-medium text-white">
                                {props.produtos?.anoLancamentoProduto}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-[#2A2F3A]"></div>

                    <div className="grid sm:grid-cols-3 gap-8 py-4">
                        <div>
                            <p className="text-xs text-zinc-400">
                                Código de barras (EAN/UPC)
                            </p>

                            <p className="mt-1 text-sm font-medium text-white">
                                {props.produtos?.codigoBarra}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-400">
                                Embalagem
                            </p>

                            <p className="mt-1 text-sm font-medium text-white">
                                {props.produtos?.embalagemProduto}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-400">
                                Condição do produto
                            </p>

                            <p className="mt-1 text-sm font-medium text-white">
                                {props.produtos?.condicao}
                            </p>
                        </div>

                        <div />
                    </div>
                </div>
            </Field>
        </Card>
    );
}