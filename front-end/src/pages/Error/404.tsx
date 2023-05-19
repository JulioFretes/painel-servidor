import { Box, Typography } from "@mui/material";
import React from "react";

const styles = {
    pagina: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
        width: "100%",
        backgroundImage:
            "url(https://pt.org.br/wp-content/themes/pt_2016/assets//images/404.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    typography: {
        userSelect: "none",
        textShadow: "2px 2.4px 5px #000",
    },
};

const NotFound: React.FC = () => {
    return (
        <Box sx={styles.pagina}>
            <Typography sx={styles.typography} variant="h2">
                Não encontrado
            </Typography>
        </Box>
    );
};

export default NotFound;
