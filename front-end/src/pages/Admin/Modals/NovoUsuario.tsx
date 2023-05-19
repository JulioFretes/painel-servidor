import { Alert, Box, Grid, TextField } from "@mui/material";
import { NovoUsuario, novoUsuarioSchema } from "../../../common/schemas";
import { useState } from "react";
import { useSnackbar } from "notistack";
import FormModal from "../../../components/FormModal";
import { UsuariosAdminService } from "../../../services/admin.service";

interface IProps {
    open: boolean;
    onClose: () => void;
}

const ModalNovoUsuario: React.FC<IProps> = ({ open, onClose }) => {
    const snackbar = useSnackbar();
    const [isEnviando, setIsEnviando] = useState<boolean>(false);
    const [resposta, setResposta] = useState<string | null>(null);

    const handleSubmit = async (values: NovoUsuario) => {
        setIsEnviando(true);
        try {
            await UsuariosAdminService.criar(values);
            snackbar.enqueueSnackbar("Usuário criado com sucesso!", {
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
            title="Novo usuário"
            schema={novoUsuarioSchema}
            isLoading={isEnviando}
        >
            <Grid container spacing={2}>
                <Grid item xs={16} mb={2}>
                    <TextField
                        fullWidth
                        name="usuario"
                        label="Nome de usuário para login"
                    />
                </Grid>
                <Grid item xs={16} mb={2}>
                    <TextField fullWidth name="email" label="Email" />
                </Grid>
                <Grid item xs={16} mb={2}>
                    <TextField
                        type="password"
                        fullWidth
                        name="senha"
                        label="Senha"
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

export default ModalNovoUsuario;
