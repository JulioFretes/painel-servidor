import { Box, Typography } from "@mui/material";
import React from "react";

const styles = {
    pagina: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        width: "100%",
    },
};

const Forbidden: React.FC = () => {
    return (
        <Box sx={styles.pagina}>
            <Typography variant="h1" sx={{ userSelect: "none" }}>
                403
            </Typography>
            <Typography variant="h4" sx={{ userSelect: "none" }}>
                Acesso negado
            </Typography>
        </Box>
    );
};

export default Forbidden;
