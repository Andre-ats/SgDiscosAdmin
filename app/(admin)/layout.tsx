import { SideBarLayout } from "./components/layoutComponents/SideBarLayout";

export default function ListagemLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex min-h-screen w-full bg-fundoPrimaria">
            <aside className="fixed left-0 top-0 h-screen w-22.5 lg:w-65 bg-fundoSecundaria border-r border-[#2A2F3A]">
                <SideBarLayout />
            </aside>

            <main className="min-h-screen w-full pl-22.5 lg:pl-65 bg-fundoPrimaria">
                <div className="w-full overflow-x-auto p-5">
                    {children}
                </div>
            </main>
        </div>
    );
}