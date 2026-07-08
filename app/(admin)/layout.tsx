import { SideBarLayout } from "./components/layoutComponents/SideBarLayout";

export default function ListagemLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex min-h-screen bg-fundoPrimaria">
            <aside className="w-64 border-r border-[#2A2F3A] sticky top-0 h-screen">
                <SideBarLayout/>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}