import { CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProdutoListagem() {
    return (
        <div>
            <CardHeader>
                <Skeleton className="h-9 w-1/3 md:w-1/6 bg-fundoTerciaria" />
                <Skeleton className="h-6 w-3/6 md:w-1/5 mt-2 bg-fundoTerciaria" />
            </CardHeader>
            <CardContent className="flex md:flex-row flex-col gap-3 mt-2">
                <Skeleton className="h-12.5 w-full md:w-1/3 bg-fundoTerciaria" />
                <Skeleton className="h-12.5 w-full md:w-1/3 bg-fundoTerciaria" />
                <Skeleton className="h-12.5 w-full md:w-1/3 bg-fundoTerciaria" />
            </CardContent>
            <CardContent>
                <div className="flex w-full flex-col gap-2 mt-5">
                    <Skeleton className="h-145 w-full bg-fundoSecundaria rounded-2xl" />
                </div>
            </CardContent>
        </div>
    )
}