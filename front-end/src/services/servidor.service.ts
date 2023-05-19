import { api } from "../common/api";
import { Inicializacao } from "../common/schemas";

export namespace ServidorService {
    export async function iniciar(serverId: string) {
        return api.post("/servidor/iniciar", { serverId });
    }

    export async function parar(serverId: string) {
        return api.post("/servidor/parar", { serverId });
    }

    export async function reiniciar(serverId: string) {
        return api.post("/servidor/reiniciar", { serverId });
    }

    export async function kill(serverId: string) {
        return api.post("/servidor/kill", { serverId });
    }

    export async function rodarComando(serverId: string, comando: string) {
        return api.post("/servidor/rodar-comando", { serverId, comando });
    }

    export async function getLogs({
        serverId,
        linhas,
    }: {
        serverId: string;
        linhas?: number;
    }) {
        return api.get(`/servidor/logs/${serverId}?linhas=${linhas ?? 0}`);
    }

    export async function editarInicializacao(parametros: Inicializacao) {
        return api.put(`/servidor/inicializacao/${parametros.id}`, parametros);
    }

    export async function getJarFiles() {
        return api.get("/servidor/jar-files/info");
    }

    export async function getJarFile(id: string | undefined) {
        if (!id) return Promise.resolve(undefined);
        return api.get(`/servidor/jar-file/info/${id}`);
    }
}

export default ServidorService;
