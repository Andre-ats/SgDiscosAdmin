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

    if (!response.ok) {
        throw new Error("Erro ao realizar login.");
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);

    return data;
}