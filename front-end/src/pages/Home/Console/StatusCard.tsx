import { Typography, Box } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import LanguageIcon from "@mui/icons-material/Language";
import MemoryIcon from "@mui/icons-material/Memory";
import SaveIcon from "@mui/icons-material/Save";
import { Status, Servidor } from "../../../common/types";
import CustomCard from "../../../components/CustomCard";

const statusEmoji = (status: Status) => {
    switch (status) {
        case "online":
            return "🟢 Online";
        case "offline":
            return "🔴 Offline";
        case "starting":
            return "🟡 Iniciando...";
        case "stopping":
            return "🟡 Parando...";
        case "restarting":
            return "🟡 Reiniciando...";
        case "killing":
            return "🟡 Parando forçadamente...";
        case "errored":
            return "⭕ Erro";
    }
};

const StatusCard = () => {
    const estatisticas = {
        nome: "Submundo(TM)",
        cpu: 0.0,
        RAM: {
            total: 8192,
            usado: 1500,
        },
        Armazenamento: {
            total: 50000,
            usado: 15000,
        },
        status: "online",
        ip: "example.com",
    } as Servidor;

    return (
        <CustomCard
            title={
                <>
                    <StorageIcon fontSize="medium" sx={{ mr: 1 }} />
                    <Typography variant="h6">{estatisticas.nome}</Typography>
                </>
            }
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                    title="Status"
                >
                    <Typography
                        fontWeight={"bold"}
                        variant="body1"
                        sx={{
                            textTransform: "uppercase",
                            userSelect: "none",
                        }}
                    >
                        {statusEmoji(estatisticas.status as Status)}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body1">{estatisticas.ip}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                    title="Uso de CPU"
                >
                    <MemoryIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography
                        sx={{
                            userSelect: "none",
                        }}
                        variant="body1"
                    >
                        {estatisticas?.cpu?.toFixed(2)}%{" "}
                        {estatisticas?.cpu ||
                            (Number(estatisticas?.cpu?.toFixed(2)) > 80.0 &&
                                "🔥")}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                    title="Uso de memória RAM"
                >
                    <Typography
                        sx={{
                            userSelect: "none",
                            filter: "saturate(0%) brightness(170%)",
                        }}
                        variant="body1"
                    >
                        🧠 {estatisticas?.RAM?.usado.toFixed(2)}
                        MB / {estatisticas?.RAM?.total.toFixed(2)}
                        MB
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                    title="Armazenamento em disco"
                >
                    <SaveIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography
                        sx={{
                            userSelect: "none",
                        }}
                        variant="body1"
                    >
                        {estatisticas?.Armazenamento?.usado.toFixed(2)}
                        MB / {estatisticas?.Armazenamento?.total.toFixed(2)}
                        MB
                    </Typography>
                </Box>
            </Box>
        </CustomCard>
    );
};

export default StatusCard;
