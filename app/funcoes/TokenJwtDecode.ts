export function TokenJwtDecode<T = unknown>(token: string): T | null {
    try {
        const parts = token.split(".");

        if (parts.length !== 3) {
            return null;
        }

        const payload = parts[1];

        const base64 = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((char) => {
                    return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );

        return JSON.parse(jsonPayload) as T;
    } catch {
        return null;
    }
}