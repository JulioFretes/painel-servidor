import { Box } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import AuthService from "../services/auth.service";
import { Suspense, useEffect } from "react";
import TelaCarregamento from "../templates/TelaCarregamento";
import UsuarioService from "../services/usuario.service";

interface IProps {
    permissao?: string | Array<string>;
}

export function PrivateRoutes({ permissao }: IProps) {
    const location = useLocation();
    const next = location.pathname;
    const usuario = AuthService.getUsuarioAtual();

    useEffect(() => {
        if (usuario) {
            const testarLogin = async () => {
                UsuarioService.getMeuUsuario().then((response) => {
                    if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem("usuario");
                        window.location.href = `/login?next=${next}`;
                    }
                });
            };

            testarLogin();
        }
        return () => {};
    }, []);

    if (!usuario) {
        window.location.href = `/login?next=${next}`;
        return null;
    }

    if (permissao) {
        if (Array.isArray(permissao)) {
            if (
                permissao.filter((p) => usuario.permissoes?.indexOf(p) !== -1)
                    .length === 0
            )
                return <Navigate to="/forbidden" />;
        } else {
            if (usuario.permissoes?.indexOf(permissao) === -1)
                return <Navigate to="/forbidden" />;
        }
    }

    return (
        <Suspense fallback={<TelaCarregamento />}>
            <Box
                style={{
                    maxHeight: "100svh",
                    overflow: "hidden",
                }}
            >
                <Header />
                <Box
                    sx={{
                        height: "calc(100dvh - 60px)",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Suspense>
    );
}
