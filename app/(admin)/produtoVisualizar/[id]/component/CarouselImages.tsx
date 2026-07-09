"use client";

import Image from "next/image";
import { IArquivoProduto } from "@/api/produtos/typeProduto";
import { getImagemUrl } from "@/api/urlImagem";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface ICarouselImages {
    arquivos?: IArquivoProduto[];
}

export function CarouselImages({ arquivos = [] }: ICarouselImages) {
    const [api, setApi] = useState<CarouselApi>();
    const [imagemAtual, setImagemAtual] = useState(0);

    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setImagemAtual(api.selectedScrollSnap());
        };

        onSelect();
        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    if (arquivos.length === 0) {
        return (
            <div className="flex h-105 w-95 items-center justify-center rounded-xl bg-fundoSecundaria text-zinc-400">
                Sem imagem
            </div>
        );
    }

    return (
        <div>
            <Carousel setApi={setApi} className="w-95">
                <CarouselContent>
                    {arquivos.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="relative sm:h-95 sm:w-95 h-50 w-50 overflow-hidden rounded-xl bg-fundoSecundaria">
                                <Image
                                    src={getImagemUrl(item.publicId, item.tipoArquivoProduto)}
                                    alt="Imagem do produto"
                                    fill
                                    quality={100}
                                    sizes="380px"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <Carousel className="mt-4 w-95 sm:block hidden">
                <CarouselContent className="gap-3">
                    {arquivos.map((item, index) => (
                        <CarouselItem key={index} className="basis-12 m-1">
                            <button
                                type="button"
                                onClick={() => api?.scrollTo(index)}
                                className={`relative h-15 w-15 overflow-hidden rounded-lg border bg-fundoSecundaria ${imagemAtual === index ? "border-primaria" : "border-[#2A2F3A]"
                                    }`}
                            >
                                <Image
                                    src={getImagemUrl(item.publicId, item.tipoArquivoProduto)}
                                    alt="Miniatura do produto"
                                    fill
                                    className="object-cover"
                                    quality={90}
                                    sizes="80px"
                                />
                            </button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}