import { Alert, Box, Grid } from "@mui/material";
import { editarUsuarioSchema } from "../../../common/schemas";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Usuario } from "../../../common/types";
import FormModal from "../../../components/FormModal";
import { UsuariosAdminService } from "../../../services/admin.service";

interface IProps {
    open: boolean;
    usuario: Usuario;
    onClose: () => void;
}

const ModalEditarUsuario: React.FC<IProps> = ({ open, onClose, usuario }) => {
    const snackbar = useSnackbar();
    const [isEnviando, setIsEnviando] = useState<boolean>(false);
    const [resposta, setResposta] = useState<string | null>(null);

    const handleSubmit = async (values: Usuario) => {
        setIsEnviando(true);
        try {
            await UsuariosAdminService.editar(values);
            snackbar.enqueueSnackbar("Usuário alterado com sucesso!", {
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
            title={`Editar ${usuario.usuario}`}
            schema={editarUsuarioSchema}
            isLoading={isEnviando}
        >
            <Grid container spacing={2}>
                <span>to-do</span>
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

export default ModalEditarUsuario;
