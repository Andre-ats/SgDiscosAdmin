interface IGetPaginasProps {
    paginaAtual: number;
    totalPaginas: number;
}

export function getPaginas({
    paginaAtual,
    totalPaginas,
}: IGetPaginasProps): (number | "...")[] {
    const paginas: (number | "...")[] = [];

    if (totalPaginas <= 3) {
        for (let i = 1; i <= totalPaginas; i++) {
            paginas.push(i);
        }

        return paginas;
    }

    paginas.push(1);

    if (paginaAtual > 3) {
        paginas.push("...");
    }

    const inicio = Math.max(2, paginaAtual - 1);
    const fim = Math.min(totalPaginas - 1, paginaAtual + 1);

    for (let i = inicio; i <= fim; i++) {
        paginas.push(i);
    }

    if (paginaAtual < totalPaginas - 2) {
        paginas.push("...");
    }

    paginas.push(totalPaginas);

    return paginas;
}