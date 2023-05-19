import { Alert, Box, Grid, TextField } from "@mui/material";
import { EditarServidor, editarServidorSchema } from "../../../common/schemas";
import { useState } from "react";
import { useSnackbar } from "notistack";
import Abas, { Aba } from "../../../components/Abas";
import { Servidor } from "../../../common/types";
import FormModal from "../../../components/FormModal";
import { ServidoresAdminService } from "../../../services/admin.service";

const AbaGeral: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={16}>
                <TextField fullWidth name="nome" label="Nome" />
            </Grid>
            <Grid item xs={16}>
                <TextField fullWidth type="number" name="porta" label="Porta" />
            </Grid>
            <Grid item xs={16} mb={2}>
                <TextField
                    fullWidth
                    type="number"
                    name="ram"
                    label="RAM (MB)"
                />
            </Grid>
        </Grid>
    );
};

const abas: Aba[] = [
    {
        value: "geral",
        label: "Geral",
        element: <AbaGeral />,
    },
    {
        value: "configuracoes",
        label: "Configurações",
        element: <div>Configurações</div>,
    },
    {
        value: "inicializacao",
        label: "Inicialização",
        element: <div>Inicialização</div>,
    },
];

interface IProps {
    servidor: Servidor;
    onClose: () => void;
}

const ModalEditarServidor: React.FC<IProps> = ({ servidor, onClose }) => {
    const [isEnviando, setIsEnviando] = useState<boolean>(false);
    const [resposta, setResposta] = useState<string | null>(null);
    const snackbar = useSnackbar();

    const handleSubmit = async (values: EditarServidor) => {
        setIsEnviando(true);
        try {
            await ServidoresAdminService.editar(values);
            snackbar.enqueueSnackbar("Servidor editado com sucesso!", {
                variant: "success",
            });
        } catch (e: any) {
            setResposta(e.response?.data?.message ?? e.message);
        } finally {
            setIsEnviando(false);
        }
    };

    const [aba, setAba] = useState<string>(abas[0].value);

    return (
        <FormModal
            open={true}
            onClose={onClose}
            onSubmit={handleSubmit}
            schema={editarServidorSchema}
            title={`Editar "${servidor.nome}"`}
            isLoading={isEnviando}
        >
            <Abas
                sx={{ marginBottom: "1rem" }}
                abas={abas}
                selecionada={aba}
                trocarAba={setAba}
                variant="fullWidth"
            />
            <Box
                sx={{
                    height: "fit-content",
                    width: "100%",
                    pb: 3,
                }}
            >
                {resposta && (
                    <Alert severity="error" onClose={() => setResposta(null)}>
                        {resposta}
                    </Alert>
                )}
            </Box>
        </FormModal>
    );
};

export default ModalEditarServidor;
