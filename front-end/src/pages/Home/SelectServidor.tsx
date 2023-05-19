import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Servidor } from "../../common/types";

interface IProps {
    servidores: Servidor[];
    trocarServidor: (id: string) => void;
    servidorSelecionado: string;
}

const SelecionarServidor: React.FC<IProps> = ({
    servidores,
    servidorSelecionado,
    trocarServidor,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1rem",
                mr: 0,
                ml: "auto",
            }}
        >
            <Typography
                sx={{
                    fontSize: "1rem !important",
                    marginRight: "1rem !important",
                    userSelect: "none",
                }}
                variant="body1"
            >
                Servidor:
            </Typography>
            <Select
                value={servidorSelecionado}
                onChange={(e) => trocarServidor(e.target.value as string)}
                variant="standard"
            >
                {servidores.map((servidor) => (
                    <MenuItem key={servidor.id} value={servidor.id}>
                        {servidor.nome}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

export default SelecionarServidor;
