import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState } from "react";
import { Usuario } from "../../../common/types";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ModalNovoUsuario from "../Modals/NovoUsuario";
import dayjs from "dayjs";
import ModalEditarUsuario from "../Modals/EditarUsuario";

interface AbaUsuariosProps {
    usuarios: Usuario[];
    onUpdate?: () => void;
}

export const AbaUsuarios: React.FC<AbaUsuariosProps> = ({
    usuarios,
    onUpdate,
}) => {
    const [isModalAberto, setIsModalAberto] = useState<boolean>(false);
    const [usuarioEditando, setUsuarioEditando] = useState<Usuario | undefined>(
        undefined
    );

    const handleEditarUsuario = (usuario: Usuario) => {
        setUsuarioEditando(usuario);
    };

    const columns = [
        { field: "id", headerName: "ID", width: 300 },
        { field: "usuario", headerName: "Nome", flex: 1 },
        {
            field: "email",
            headerName: "Email",
            flex: 0.8,
        },
        {
            field: "createdAt",
            headerName: "Data criação",
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.value as string).format("DD/MM/YYYY HH:mm:ss"),
        },
        {
            field: "updatedAt",
            headerName: "Última atualização",
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.value as string).format("DD/MM/YYYY HH:mm:ss"),
        },
        {
            field: "options",
            headerName: "",
            width: 80,
            sortable: false,
            filterable: false,
            renderCell: (params: GridValueGetterParams) => (
                <strong>
                    <IconButton
                        onClick={() => {
                            handleEditarUsuario(params.row);
                        }}
                    >
                        <EditIcon htmlColor="gainsboro" />
                    </IconButton>
                </strong>
            ),
        },
    ] as GridColDef[];

    return (
        <Box>
            {usuarioEditando && (
                <ModalEditarUsuario
                    open={!!usuarioEditando}
                    usuario={usuarioEditando!}
                    onClose={() => {
                        onUpdate?.();
                        setUsuarioEditando(undefined);
                    }}
                />
            )}
            <ModalNovoUsuario
                open={isModalAberto}
                onClose={() => {
                    onUpdate?.();
                    setIsModalAberto(false);
                }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    sx={{ mb: 3 }}
                    onClick={() => {
                        setIsModalAberto(true);
                    }}
                >
                    <AddIcon fontSize="large" htmlColor="gainsboro" />
                    <Typography
                        sx={{
                            color: "gainsboro",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            marginRight: "0.5rem",
                        }}
                    >
                        Novo usuário
                    </Typography>
                </Button>
            </Box>
            <div style={{ height: "70vh", width: "100%" }}>
                <DataGrid
                    pageSizeOptions={[10, 20, 50, 100]}
                    rows={usuarios}
                    columns={columns}
                />
            </div>
        </Box>
    );
};
