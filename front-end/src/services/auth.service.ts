import { api } from "../common/api";
import { Usuario } from "../common/types";

export namespace AuthService {
    export async function registrar(
        usuario: string,
        email: string,
        senha: string
    ) {
        return api.post("/auth/signup", {
            usuario,
            email,
            senha,
        });
    }

    export async function login(usuario: string, senha: string) {
        const res = await api.post("/auth/signin", {
            usuario,
            senha,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify(res.data.Usuario));
        localStorage.setItem("session", res.data.session);

        return res;
    }

    export async function logout() {
        localStorage.removeItem("usuario");
        api.get("/auth/signout");
        window.location.href = "/login";
    }

    export function getUsuarioAtual() {
        try {
            const usuarioStr: string | null = localStorage.getItem("usuario");

            if (usuarioStr != null) {
                let usuario = JSON.parse(usuarioStr) as Usuario;
                const permissoes: string[] = JSON.parse(
                    atob(localStorage.getItem("session") || "[]")
                );
                usuario = { ...usuario, permissoes: permissoes };
                return usuario;
            }
        } catch (err) {
            alert("Erro ao carregar usuário logado. Tente novamente." + err);
            localStorage.removeItem("usuario");
        }

        return null;
    }
}

export default AuthService;
