"use client";

import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import iconSgDiscosSemEscrita from "../../../public/Icon/logoSgDiscosSemEscrita.png"

export function SideBarLayout() {

    const pathname = usePathname();

    const links = [
        {
            nome: "Produtos",
            icone: Package,
            rota: "/produtos",
        },
        {
            nome: "Criar Produto",
            icone: Plus,
            rota: "/criarProduto",
        },
    ];

    return (
        <Fragment>
            <div className="m-2 flex items-center border-b border-[#2A2F3A] pb-3">
                <Image className="absolute top-2" src={iconSgDiscosSemEscrita} alt="" width={45} height={45} />
                <div className="flex w-full justify-center mt-3">
                    <CardDescription className="text-white flex text-2xl"><p className="text-primaria">SG</p>DISCOS</CardDescription>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-28 p-5">
                {links.map((link) => {
                    const Icon = link.icone;

                    return (
                        <Link key={link.rota} href={link.rota}>
                            <Button
                                className={`w-full justify-start p-5 gap-3 bg-primaria text-black hover:bg-[#ffcf0d] cursor-pointer ${pathname == link.rota 
                                    ? "bg-primaria text-black"
                                    : "bg-transparent text-white hover:bg-[#2A2F3A]"}`}
                            >
                                <Icon className="h-5 w-5" />
                                {link.nome}
                            </Button>
                        </Link>
                    );
                })}
            </div>
        </Fragment>
    )
}