export type Usuario = {
    id?: any | null;
    usuario: string;
    email: string;
    password: string;
    permissoes?: Array<string>;
    servidores: Array<string>;
};

export type Log = {
    serverId: string;
    timestamp: number;
    message: string;
};

export type Status =
    | "online"
    | "offline"
    | "starting"
    | "stopping"
    | "restarting"
    | "killing"
    | "errored";

export type Servidor = {
    id: string;
    nome?: string;
    cpu?: number;
    ram?: number;
    RAM?: {
        total: number;
        usado: number;
    };
    Armazenamento?: {
        total: number;
        usado: number;
    };
    status?: Status;
    ip?: string;
    porta?: number;
    args?: string;
    id_arquivo_jar?: number;
};

export type Permissao = {
    id: string;
    descricao?: string;
};

export type ArquivoJar = {
    id: number;
    nome: string;
    versao_minecraft: string;
    versao_build: string;
    suporta_plugins: boolean;
    suporta_mods: boolean;
};
