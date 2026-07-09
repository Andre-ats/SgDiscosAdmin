export interface IResponseGetProdutoExterno {
    title: string | null;
    "artist-credit": IArtistCredit[] | null;
    date: string | null;
    country: string | null;
    "label-info": ILabelInfo[] | null;
    "track-count": number | null;
}

interface IArtistCredit {
    name: string;
}

interface ILabelInfo {
    label: ILabel | null;
}

interface ILabel {
    name: string;
}

export async function getProdutoExterno(
    barcode: string
): Promise<IResponseGetProdutoExterno | null> {
    const response = await fetch(
        `https://musicbrainz.org/ws/2/release?query=barcode:${barcode}&fmt=json`,
        {
            headers: {
                "User-Agent": "TesteDev",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar produto.");
    }

    const data = await response.json();

    const release = data.releases?.[0];

    if (!release) return null;

    const produto: IResponseGetProdutoExterno = {
        title: release.title ?? null,
        "artist-credit": release["artist-credit"] ?? null,
        date: release.date ?? null,
        country: release.country ?? null,
        "label-info": release["label-info"] ?? null,
        "track-count": release["track-count"] ?? null,
    };

    return produto;
}