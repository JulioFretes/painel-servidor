import React, { useEffect, useState } from "react";
import { Servidor, Usuario } from "../../common/types";
import Abas from "../../components/Abas";
import TelaCarregamento from "../../templates/TelaCarregamento";
import { useMemo } from "react";
import { AbaServidores } from "./Abas/Servidores";
import { AbaUsuarios } from "./Abas/Usuarios";
import * as AdminService from "../../services/admin.service";

const PainelAdmin: React.FC = () => {
    const [servidores, setServidores] = useState<Servidor[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const recarregarServidores = async () => {
        AdminService.ServidoresAdminService.getAll().then((res) => {
            setServidores(res.data);
        });
    };

    const recarregarUsuarios = async () => {
        AdminService.UsuariosAdminService.getAll().then((res) => {
            setUsuarios(res.data);
        });
    };

    const abas = useMemo(
        () => [
            {
                label: "Servidores",
                value: "servidores",
                element: (
                    <AbaServidores
                        servidores={servidores}
                        onUpdate={() => recarregarServidores()}
                    />
                ),
            },
            {
                label: "Usuários",
                value: "usuarios",
                element: (
                    <AbaUsuarios
                        usuarios={usuarios}
                        onUpdate={() => recarregarUsuarios()}
                    />
                ),
            },
        ],
        [servidores, usuarios]
    );
    const [abaSelecionada, setAbaSelecionada] = useState<string>(abas[0].value);

    useEffect(() => {
        async function carregarDados() {
            if (usuarios?.length > 0 || servidores?.length > 0) return;

            await Promise.all([recarregarServidores(), recarregarUsuarios()]);
        }

        carregarDados();

        return () => {};
    }, []);

    return (
        <Abas
            selecionada={abaSelecionada}
            abas={abas}
            trocarAba={setAbaSelecionada}
            variant="fullWidth"
        />
    );
};

export default PainelAdmin;
