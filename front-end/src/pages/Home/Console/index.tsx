import React, { useState } from "react";
import Code from "./Code";
import { Log } from "../../../common/types";
import BarraComando from "./BarraComando";
import { Box } from "@mui/system";
import BotoesAcoes from "./BotoesAcoes";
import StatusCard from "./StatusCard";
import { ServidorService } from "../../../services/servidor.service";

interface IProps {
    serverId: string;
    logs: Log[];
}

const Console: React.FC<IProps> = ({ serverId, logs }) => {
    logs = logs?.sort((a, b) => a.timestamp - b.timestamp);
    const [isEnviandoComando, setIsEnviandoComando] = useState<boolean>(false);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1.2rem",
            }}
        >
            <Box
                sx={{
                    color: "#ffffffb7",
                }}
            >
                <StatusCard />
                <BotoesAcoes
                    serverId={serverId}
                    sx={{
                        width: "30rem",
                    }}
                />
            </Box>
            <Box
                sx={{
                    width: "50rem",
                    height: "30rem",
                    backgroundColor: "transparent",
                }}
            >
                <Code content={logs} />
                <BarraComando
                    onSubmit={(comando: string) => {
                        if (isEnviandoComando) return;

                        setIsEnviandoComando(true);
                        ServidorService.rodarComando(serverId, comando)
                            .then(() => {
                                setIsEnviandoComando(false);
                            })
                            .catch(() => {
                                setIsEnviandoComando(false);
                            });
                    }}
                    isLoading={isEnviandoComando}
                />
            </Box>
        </Box>
    );
};

export default Console;
