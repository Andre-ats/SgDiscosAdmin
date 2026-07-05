import { SideBarLayout } from "./layoutComponents/SideBarLayout";

export default function ListagemLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex min-h-screen bg-fundoPrimaria">
            <aside className="w-64 border-r border-[#2A2F3A]">
                <SideBarLayout/>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}