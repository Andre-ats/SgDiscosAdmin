"use client";

import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { LogOut, Package, Plus, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import iconSgDiscosSemEscrita from "../../../../public/Icon/logoSgDiscosSemEscrita.png";

export function SideBarLayout() {
    const pathname = usePathname();
    const router = useRouter();

    function sairConta() {
        localStorage.removeItem("token");
        router.push("/");
    }

    const links = [
        {
            nome: "Produtos",
            icone: Package,
            rota: "/produtoListagem",
        },
        {
            nome: "Criar Produto",
            icone: Plus,
            rota: "/produtoCriar",
        },
    ];

    return (
        <div className="flex h-screen flex-col">
            <div>
                <div className="m-2 flex items-center border-b border-[#2A2F3A] pb-3">
                    <Image
                        className="absolute top-2 left-4"
                        src={iconSgDiscosSemEscrita}
                        alt=""
                        width={40}
                        height={40}
                    />

                    <div className="flex w-full justify-center mt-3">
                        <CardDescription className="text-white flex text-2xl ml-4">
                            <p className="text-primaria">SG</p>DISCOS
                        </CardDescription>
                    </div>
                </div>

                <div className="flex flex-col gap-3 p-5">
                    {links.map((link) => {
                        const Icon = link.icone;

                        return (
                            <Link key={link.rota} href={link.rota}>
                                <Button
                                    className={`w-full justify-start p-5 gap-3 cursor-pointer ${pathname === link.rota
                                            ? "bg-primaria text-black hover:bg-[#ffcf0d]"
                                            : "bg-transparent text-white hover:bg-[#2A2F3A]"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {link.nome}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="mt-auto border-t border-[#2A2F3A] p-5">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fundoTerciaria text-white">
                        <User className="h-5 w-5" />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">Admin</span>
                        <span className="text-xs text-zinc-400">Painel administrativo</span>
                    </div>
                </div>

                <Button
                    onClick={sairConta}
                    className="w-full justify-start gap-3 bg-transparent text-white hover:bg-red-500 hover:text-white cursor-pointer"
                >
                    <LogOut className="h-5 w-5" />
                    Sair da conta
                </Button>
            </div>
        </div>
    );
}