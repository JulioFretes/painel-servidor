import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState } from "react";
import { Servidor } from "../../../common/types";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ModalNovoServidor from "../Modals/NovoServidor";
import dayjs from "dayjs";
import ModalEditarServidor from "../Modals/EditarServidor";

interface AbaServidoresProps {
    servidores: Servidor[];
    onUpdate?: () => void;
}

export const AbaServidores: React.FC<AbaServidoresProps> = ({
    servidores,
    onUpdate,
}) => {
    const [isModalNovoAberto, setIsModalNovoAberto] = useState<boolean>(false);
    const [servidorEditando, setServidorEditando] = useState<
        Servidor | undefined
    >(undefined);

    const columns = [
        { field: "id", headerName: "ID", width: 300 },
        { field: "nome", headerName: "Nome", flex: 1 },
        {
            field: "porta",
            headerName: "Porta",
            width: 100,
        },
        {
            field: "createdAt",
            headerName: "Data criação",
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
                            setServidorEditando(params.row);
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
            <ModalNovoServidor
                open={isModalNovoAberto}
                onClose={() => {
                    onUpdate?.();
                    setIsModalNovoAberto(false);
                }}
            />
            {servidorEditando && (
                <ModalEditarServidor
                    onClose={() => {
                        onUpdate?.();
                        setServidorEditando(undefined);
                    }}
                    servidor={servidorEditando}
                />
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    sx={{ mb: 3 }}
                    onClick={() => {
                        setIsModalNovoAberto(true);
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
                        Novo servidor
                    </Typography>
                </Button>
            </Box>
            <div style={{ height: "70vh", width: "100%" }}>
                <DataGrid
                    pageSizeOptions={[10, 20, 50, 100]}
                    rows={servidores}
                    columns={columns}
                />
            </div>
        </Box>
    );
};
