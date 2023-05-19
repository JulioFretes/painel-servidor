import { ButtonBase } from "@mui/material";
import { BoxProps } from "@mui/material/Box/";
import CustomCard from "../../../components/CustomCard";
import ServidorService from "../../../services/servidor.service";

const styles = {
    botao: {
        border: "2px solid rgb(175, 175, 175)",
        borderRadius: "8px",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
        height: "fit-content",
        width: "fit-content",
        textTransform: "uppercase",
        fontSize: "0.9rem",
        padding: "0.3rem 0.7rem",
        boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
        margin: "0 0.3rem",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
    },
    desativado: {
        color: "rgba(175, 175, 175, 0.5)",
        borderColor: "rgba(175, 175, 175, 0.5)",
        cursor: "not-allowed",
        "&:hover": {
            backgroundColor: "rgba(100, 100, 100, 0.15)",
            borderColor: "rgba(175, 175, 175, 0.6)",
        },
    },
};

interface IProps {
    serverId: string;
}

const BotoesAcoes: React.FC<BoxProps & IProps> = ({ serverId }) => {
    const handleIniciar = () => {
        ServidorService.iniciar(serverId);
    };
    const handleParar = () => {
        ServidorService.parar(serverId);
    };
    const handleReiniciar = () => {
        ServidorService.reiniciar(serverId);
    };
    const handleKill = () => {
        ServidorService.kill(serverId);
    };

    return (
        <CustomCard>
            <ButtonBase onClick={handleIniciar} sx={styles.botao}>
                Iniciar
            </ButtonBase>
            <ButtonBase
                onClick={handleParar}
                sx={{
                    ...styles.botao,
                    backgroundColor: "red !important",
                    borderColor: "transparent !important",
                    "&:hover": {
                        backgroundColor: "#c01818 !important",
                    },
                }}
                color="primary"
            >
                Parar
            </ButtonBase>
            <ButtonBase
                onClick={handleReiniciar}
                sx={styles.botao}
                color="primary"
            >
                Reiniciar
            </ButtonBase>
            <ButtonBase
                onClick={handleKill}
                sx={{
                    ...styles.botao,
                    backgroundColor: "darkred !important",
                    borderColor: "transparent !important",
                    "&:hover": {
                        backgroundColor: "#a70f0f !important",
                        borderColor: "transparent !important",
                    },
                }}
                color="primary"
            >
                Kill
            </ButtonBase>
        </CustomCard>
    );
};

export default BotoesAcoes;
