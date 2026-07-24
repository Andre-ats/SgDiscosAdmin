"use client";

import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { EnumGeneroMusicalProduto } from "@/api/produtos/typeProduto";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectGeneroProps {
    value: EnumGeneroMusicalProduto[];
    onChange: (value: EnumGeneroMusicalProduto[]) => void;
}

export function MultiSelectGenero({
    value,
    onChange,
}: MultiSelectGeneroProps) {

    function toggleGenero(genero: EnumGeneroMusicalProduto) {
        if (value.includes(genero)) {
            onChange(value.filter((g) => g !== genero));
        } else {
            onChange([...value, genero]);
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full min-h-12 h-auto justify-between border-[#2A2F3A] bg-fundoTerciaria hover:bg-fundoTerciaria"
                >
                    <div className="flex flex-wrap gap-2">
                        {value.length === 0 ? (
                            <span className="text-zinc-400">
                                Selecione um ou mais gêneros
                            </span>
                        ) : (
                            value.map((genero) => (
                                <Badge
                                    key={genero}
                                    className="bg-primaria text-black flex items-center gap-1"
                                >
                                    {genero}

                                    <span
                                        className="cursor-pointer rounded-sm p-1 hover:bg-black/10"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleGenero(genero);
                                        }}
                                    >
                                        <X className="h-3 w-3" />
                                    </span>
                                </Badge>
                            ))
                        )}
                    </div>

                    <ChevronDown className="h-4 w-4 opacity-60" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="w-(--radix-popover-trigger-width) p-0"
            >
                <Command>
                    <CommandInput placeholder="Pesquisar gênero..." />

                    <CommandEmpty>
                        Nenhum gênero encontrado.
                    </CommandEmpty>

                    <CommandGroup className="max-h-72 overflow-auto">
                        {Object.values(EnumGeneroMusicalProduto)
                            .sort((a, b) => a.localeCompare(b, "pt-BR"))
                            .map((genero) => (
                                <CommandItem
                                    key={genero}
                                    onSelect={() => toggleGenero(genero)}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${value.includes(genero)
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />

                                    {genero}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}