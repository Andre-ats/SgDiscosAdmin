export interface ILogin {
    login: string
    senha: string
}

export async function login(props: ILogin) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Admin/LoginAdmin`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(props),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error ?? "Erro ao realizar login.");
    }

    localStorage.setItem("token", data.token);

    return data;
}