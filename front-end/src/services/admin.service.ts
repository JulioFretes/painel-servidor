import { api } from "../common/api";
import { NovoServidor, NovoUsuario } from "../common/schemas";
import { Servidor, Usuario } from "../common/types";

export namespace ServidoresAdminService {
    export async function getAll() {
        return api.get("/admin/servidor");
    }

    export async function getAllFromUser(id: string) {
        return api.get(`/admin/servidor/usuario/${id}`);
    }

    export async function get(id: string) {
        return api.get(`/admin/servidor/${id}`);
    }

    export async function editar(data: Servidor) {
        return api.put(`/admin/servidor`, data);
    }

    export async function deletar(id: string) {
        return api.delete(`/admin/servidor/${id}`);
    }

    export async function criar(data: NovoServidor) {
        return api.post("/admin/servidor", data);
    }
}

export namespace UsuariosAdminService {
    export async function getAll() {
        return api.get("/admin/usuario");
    }

    export async function get(id: string) {
        return api.get(`/admin/usuario/${id}`);
    }

    export async function editar(data: Usuario) {
        return api.put(`/admin/usuario`, data);
    }

    export async function deletar(id: string) {
        return api.delete(`/admin/usuario/${id}`);
    }

    export async function criar(data: NovoUsuario) {
        return api.post("/admin/usuario", data);
    }
}

export namespace Permissoes {
    export async function getAllFromUsuario(id: string) {
        return api.get(`/admin/permissao/usuario/${id}`);
    }
}
