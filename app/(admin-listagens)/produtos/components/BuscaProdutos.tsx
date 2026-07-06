import { EnumGeneroMusicalProduto, EnumStatusProduto } from "@/api/produtos/typeProduto";
import { Field, FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

interface BuscaProdutosProps {
    nomeProduto: string;
    generoMusical: string;
    statusProduto: string;
    onNomeProdutoChange: (value: string) => void;
    onGeneroMusicalChange: (value: string) => void;
    onStatusProdutoChange: (value: string) => void;
}

export function BuscaProdutos({
    nomeProduto,
    generoMusical,
    statusProduto,
    onNomeProdutoChange,
    onGeneroMusicalChange,
    onStatusProdutoChange,
}: BuscaProdutosProps) {
    return (
        <FieldGroup className="mt-4 grid grid-cols-3 gap-3 ">
            <Field>
                <InputGroup className="border-[#2A2F3A] bg-fundoTerciaria py-6">
                    <InputGroupAddon>
                        <Search className="h-4 w-4 text-zinc-400" />
                    </InputGroupAddon>

                    <InputGroupInput
                        value={nomeProduto}
                        onChange={(e) => onNomeProdutoChange(e.target.value)}
                        className="text-white placeholder:text-zinc-400"
                        type="text"
                        placeholder="Buscar produtos ou bandas..."
                    />
                </InputGroup>
            </Field>

            <Field>
                <Select value={generoMusical} onValueChange={onGeneroMusicalChange}>
                    <SelectTrigger className="w-full border-[#2A2F3A] bg-fundoTerciaria text-white py-6">
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-zinc-400">Categoria</span>
                            <SelectValue placeholder="Todas" />
                        </div>
                    </SelectTrigger>

                    <SelectContent align="start">
                        <SelectGroup>
                            <SelectItem value="Todos">Todas</SelectItem>

                            {Object.values(EnumGeneroMusicalProduto)
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

            <Field>
                <Select value={statusProduto} onValueChange={onStatusProdutoChange}>
                    <SelectTrigger className="w-full border-[#2A2F3A] bg-fundoTerciaria text-white py-6">
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-zinc-400">Status</span>
                            <SelectValue placeholder="Todos" />
                        </div>
                    </SelectTrigger>

                    <SelectContent align="start">
                        <SelectGroup>
                            <SelectItem value="Todos">Todos</SelectItem>

                            {Object.values(EnumStatusProduto).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
        </FieldGroup>
    );
}