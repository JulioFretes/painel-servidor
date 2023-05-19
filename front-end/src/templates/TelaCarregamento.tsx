import { Box, CircularProgress, Typography } from "@mui/material";

const TelaCarregamento: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100dvh",
                flexDirection: "column",
                mt: -4,
                position: "absolute",
                zIndex: 999,
            }}
        >
            <CircularProgress size={200} />
            <Typography variant="h4" sx={{ mt: 2 }}>
                Aguarde, carregando dados...
            </Typography>
        </Box>
    );
};

export default TelaCarregamento;
