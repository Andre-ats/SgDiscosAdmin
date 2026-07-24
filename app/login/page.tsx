import { Card } from "@/components/ui/card";
import { LoginForms } from "./components/LoginForms";
import { LoginImagem } from "./components/LoginImagem";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | SGDiscos",
};

export default function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-fundoPrimaria">
            <div className="2xl:w-3/5 lg:w-11/12 xl:w-4/5 sm:w-3/5 w-full m-5 sm:m-0">
                <Card className="lg:flex lg:flex-row p-0 gap-0 bg-fundoSecundaria">
                    <LoginImagem />
                    <div className="flex lg:w-1/2 items-center justify-center">
                        <LoginForms />
                    </div>
                </Card>
            </div>
        </div>
    );
}
