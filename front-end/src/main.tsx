import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./common/theme";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemeProvider theme={theme}>
        <SnackbarProvider>
            <React.StrictMode>
                <BrowserRouter basename="/">
                    <Router />
                </BrowserRouter>
            </React.StrictMode>
        </SnackbarProvider>
    </ThemeProvider>
);
