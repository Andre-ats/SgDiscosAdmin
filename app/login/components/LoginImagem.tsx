import { CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Copyright } from "lucide-react";
import Image from "next/image";
import Imgem from "../../../public/Login/vinilImgem.png"
import Imgem2 from "../../../public/Icon/logoSgDiscosSemEscrita.png"

export function LoginImagem() {
    return (
        <CardContent className="w-1/2 p-0 relative lg:block hidden">
            <Image className="object-cover rounded-l-xl" fill src={Imgem} alt="" />
            <div className="absolute inset-0 bg-black/80 rounded-l-xl" />
            <div className="absolute p-5 justify-around text-white w-full h-full">
                <div className="h-1/2">
                    <div className="w-1/5 absolute left-5">
                        <Image className="rounded-l-xl" src={Imgem2} height={80} width={80} alt="" />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-25">
                        <CardTitle className="text-4xl flex mb-1">
                            <p className="text-[#fcda54]">SG</p> DISCOS
                        </CardTitle>
                        <CardDescription className="text-white">Sua opção de música</CardDescription>
                    </div>
                </div>
                <div className="h-2/5 justify-center align-middle w-full">
                    <CardTitle className="text-2xl text-[#fcda54] mb-1">Bem-vindo de volta!</CardTitle>
                    <CardDescription className="text-white flex">Faça o login para acessar o painel <p className="text-[#fcda54] ml-1">administrativo</p>.</CardDescription>
                </div>
                <div className="h-1/4">
                    <div className="mt-9 flex items-center gap-3">
                        <Copyright color="#71717A" height={15} width={15} />
                        <CardDescription className="text-[12px]">2026 SgDiscos. Todos os direitos reservados.</CardDescription>
                    </div>
                </div>
            </div>
        </CardContent>
    )
}