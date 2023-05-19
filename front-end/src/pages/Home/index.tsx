import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Console from "./Console";
import { Log, Servidor } from "../../common/types";
import Abas from "../../components/Abas";
import UsuarioService from "../../services/usuario.service";
import SelectServidor from "./SelectServidor";
import Inicializacao from "./Inicializacao";
import AuthService from "../../services/auth.service";
import ServidorService from "../../services/servidor.service";
import { connect, startServerLogListener } from "../../common/websockets";
import Configuracoes from "./Configuracoes";

const Home: React.FC = () => {
    const [servidores, setServidores] = useState<Servidor[]>();
    const [serverId, setServerId] = useState<string>("");
    const [logs, setLogs] = useState<Log[]>([]);
    const [abaSelecionada, setAbaSelecionada] = useState<string>("console");
    const usuario = AuthService.getUsuarioAtual();

    function conectarWebsockets(serverId: string) {
        connect(usuario!.id, `logs_${serverId}`);
        startServerLogListener((e: Log) => {
            setLogs((logs) => {
                const novosLogs = [...logs, e];
                const filteredLogs = novosLogs.filter((log, index) => {
                    return (
                        novosLogs.findIndex(
                            (log2) =>
                                log2.timestamp === log.timestamp &&
                                log2.serverId === log.serverId
                        ) === index
                    );
                });
                return filteredLogs;
            });
        });
    }

    useEffect(() => {
        const carregarServidores = async () => {
            const res = await UsuarioService.getMeusServidores();
            setServidores(res.data);
            setServerId(res.data?.[0]?.id);
        };

        carregarServidores().catch((err) => console.error(err));

        return () => {};
    }, []);

    useEffect(() => {
        const carregarLogs = async () => {
            async function carregarLogsInicias(serverId: string) {
                const res = await ServidorService.getLogs({
                    serverId,
                    linhas: 1048500,
                });
                const logs = res.data?.message?.split("\n")?.join("\n");
                return {
                    serverId,
                    timestamp: 0,
                    message: logs,
                };
            }

            let logsCarregados: Log[] = [];
            for await (const servidor of servidores ?? []) {
                conectarWebsockets(servidor.id);
                const logs = await carregarLogsInicias(servidor.id);
                logsCarregados.push(logs);
            }
            setLogs(logsCarregados);
        };

        try {
            carregarLogs();
        } catch (err) {
            console.error(err);
        }
    }, [serverId]);

    const onSubmitInicializacao = (data: any) => {
        setServidores((servidores) => {
            const index = servidores?.findIndex(
                (servidor) => servidor.id === serverId
            );
            if (index !== undefined && index !== -1) {
                const novosServidores = [...servidores!];
                novosServidores[index] = {
                    ...novosServidores[index],
                    ...data,
                };
                return novosServidores;
            }
            return servidores;
        });
    };

    const memoizedAbas = React.useMemo(() => {
        return [
            {
                label: "Console",
                value: "console",
                element: <Console logs={logs} serverId={serverId} />,
                extra: logs,
            },
            {
                label: "Inicialização",
                value: "inicializacao",
                element: (
                    <Inicializacao
                        servidor={
                            (servidores ?? []).find(
                                (servidor) => servidor.id === serverId
                            )!
                        }
                        onSubmit={onSubmitInicializacao}
                    />
                ),
            },
            {
                label: "Configurações",
                value: "configuracoes",
                element: <Configuracoes />,
            },
        ];
    }, [serverId, logs]);

    return servidores && (!servidores.length || !serverId) ? (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
                flexDirection: "column",
                color: "gainsboro",
                height: "100%",
            }}
        >
            <Typography variant="h4">
                Nenhum servidor relacionado ao seu usuário.
            </Typography>
            <Typography variant="h6">
                Entre em contato com o administrador do sistema.
            </Typography>
        </Box>
    ) : (
        <Abas
            trocarAba={setAbaSelecionada}
            selecionada={abaSelecionada}
            abas={memoizedAbas}
            variant="fullWidth"
        >
            <SelectServidor
                servidores={servidores ?? []}
                trocarServidor={setServerId}
                servidorSelecionado={serverId}
            />
        </Abas>
    );
};

export default Home;
