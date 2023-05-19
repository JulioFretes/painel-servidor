import React, { useState } from "react";
import loginBg from "../assets/login-bg.jpg";
import AuthService from "../services/auth.service";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { loginSchema } from "../common/schemas";
import ZodForm from "../components/ZodForm";

interface IProps {
    next?: string;
}

const Login: React.FC<IProps> = () => {
    const next = window.location.search.split("=")[1];

    const [isCarregando, setCarregando] = useState<boolean>(false);
    const [erro, setErro] = useState<string | null>(null);

    const handleLogin = async (formValue: {
        usuario: string;
        senha: string;
    }) => {
        const { usuario, senha } = formValue;

        setErro(null);
        setCarregando(true);

        await AuthService.login(usuario, senha).then(
            (_res) => {
                window.location.href = next || "/";
            },
            (error) => {
                const res =
                    error?.response?.data?.message ||
                    error.message ||
                    error.toString();

                setCarregando(false);
                setErro(res);
            }
        );
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(${loginBg})`,
                height: "100svh",
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: "30rem",
                    height: "35rem",
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backdropFilter: "blur(15px)",
                }}
            >
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="img"
                    style={{
                        width: "10rem",
                        height: "10rem",
                        borderRadius: "50%",
                        marginBottom: "2rem",
                    }}
                />
                <ZodForm schema={loginSchema} onSubmit={handleLogin}>
                    <Grid container spacing={2} sx={{ padding: 5 }}>
                        <Grid item xs={12}>
                            <TextField
                                name="usuario"
                                label="Usuário"
                                type="text"
                                variant="filled"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="senha"
                                label="Senha"
                                type="password"
                                variant="filled"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                }}
                                disabled={isCarregando}
                                fullWidth
                                variant="contained"
                            >
                                {isCarregando && (
                                    <CircularProgress
                                        sx={{ mr: 2 }}
                                        size={20}
                                    />
                                )}
                                <span>Entrar</span>
                            </Button>
                        </Grid>
                    </Grid>

                    {erro && (
                        <Alert
                            onClose={() => setErro(null)}
                            severity="error"
                            sx={{
                                color: "crimson !important",
                                backgroundColor: "transparent !important",
                                width: "fit-content",
                                margin: "auto",
                                alignSelf: "center",
                                position: "absolute",
                                left: 0,
                                right: 0,
                                textShadow:
                                    "1px 1.2px 1.2px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <Typography>Erro: {erro}</Typography>
                        </Alert>
                    )}
                </ZodForm>
            </Box>
        </Box>
    );
};

export default Login;
