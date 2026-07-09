export const PAISES: Record<string, string> = {
    BR: "Brasil",
    US: "Estados Unidos",
    UK: "Reino Unido",
    AU: "Austrália",
    CA: "Canadá",
    DE: "Alemanha",
    FR: "França",
    IT: "Itália",
    JP: "Japão",
    ES: "Espanha",
    PT: "Portugal",

    XE: "Europa",
    XW: "Mundial",
};

export function getPais(sigla: string | null | undefined): string {
    if (!sigla) return "";

    return PAISES[sigla] ?? sigla;
}