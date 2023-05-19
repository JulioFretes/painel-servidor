import { Alert, Box, Grid, TextField } from "@mui/material";
import { NovoServidor, novoServidorSchema } from "../../../common/schemas";
import { useState } from "react";
import { useSnackbar } from "notistack";
import FormModal from "../../../components/FormModal";
import { ServidoresAdminService } from "../../../services/admin.service";

interface IProps {
    open: boolean;
    onClose: () => void;
}

const ModalNovoServidor: React.FC<IProps> = ({ open, onClose }) => {
    const snackbar = useSnackbar();
    const [isEnviando, setIsEnviando] = useState<boolean>(false);
    const [resposta, setResposta] = useState<string | null>(null);

    const handleSubmit = async (values: NovoServidor) => {
        setIsEnviando(true);
        try {
            await ServidoresAdminService.criar(values);
            snackbar.enqueueSnackbar("Servidor criado com sucesso!", {
                variant: "success",
            });
            onClose();
        } catch (e: any) {
            setResposta(e.response?.data?.message ?? e.message);
        } finally {
            setIsEnviando(false);
        }
    };

    return (
        <FormModal
            onSubmit={handleSubmit}
            open={open}
            onClose={onClose}
            title="Novo servidor"
            schema={novoServidorSchema}
            isLoading={isEnviando}
        >
            <Grid container spacing={2}>
                <Grid item xs={16}>
                    <TextField fullWidth name="nome" label="Nome" />
                </Grid>
                <Grid item xs={16}>
                    <TextField
                        fullWidth
                        type="number"
                        name="porta"
                        label="Porta"
                    />
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

export default ModalNovoServidor;
