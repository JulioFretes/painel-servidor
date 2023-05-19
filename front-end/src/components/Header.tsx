import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthService from "../services/auth.service";
import { Box, Grid, IconButton, Typography } from "@mui/material";

const Header: React.FC = () => {
    return (
        <Box
            sx={{
                background: "#1e1e1e",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 1rem",
                justifySelf: "flex-start",
                top: "0",
                left: "0",
                right: "0",
            }}
        >
            <Grid
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 1rem",
                    width: "100em",
                }}
            >
                <Box
                    sx={{
                        userSelect: "none",
                        color: "#fff",
                        marginRight: "1rem",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    <Typography variant="h4">O painel</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "fit-content",
                    }}
                >
                    <IconButton
                        color="inherit"
                        sx={{
                            background: "none",
                            border: "none",
                            color: "#fff",
                        }}
                        onClick={() => {
                            AuthService.logout();
                        }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Grid>
        </Box>
    );
};

export default Header;
