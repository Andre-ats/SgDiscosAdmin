import { CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react/jsx-runtime";

export function LoadingProdutoCriar() {
    return (
        <Fragment>
            <CardHeader>
                <Skeleton className="h-9 w-1/3 md:w-1/6 bg-fundoTerciaria" />
                <Skeleton className="h-6 w-3/6 md:w-1/5 mt-2 bg-fundoTerciaria" />
            </CardHeader>
            <CardContent className="flex gap-5 mt-2 w-full 2xl:flex-row flex-col">
                <Skeleton className="h-145 lg:col-span-2 2xl:w-237.75 w-full bg-fundoTerciaria" />

                <div className="flex flex-col gap-3">
                    <Skeleton className="h-71 2xl:w-158.5 w-full bg-fundoTerciaria" />
                    <Skeleton className="h-71 2xl:w-158.5 w-full bg-fundoTerciaria" />
                </div>
            </CardContent>
            <Skeleton className="h-71 w-full mt-5 bg-fundoTerciaria" />
        </Fragment>
    )
}