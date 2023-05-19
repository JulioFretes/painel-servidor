import { api } from "../common/api";

export namespace UsuarioService {
    export async function getMinhasPermissoes() {
        return api.get("/usuario/permissoes");
    }

    export async function getMeuUsuario() {
        return api.get("/usuario/meu-usuario");
    }

    export async function getMeusServidores() {
        return api.get("/usuario/servidores");
    }
}

export default UsuarioService;
