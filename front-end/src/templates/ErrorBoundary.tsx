import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface IProps {
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<IProps> {
    state = { error: undefined, errorInfo: undefined } as {
        error: Error | undefined;
        errorInfo: React.ErrorInfo | undefined;
    };

    expandido = false;

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error);
        this.setState({ error, errorInfo });
    }

    render() {
        return this.state.error
            ? this.props.fallback ?? (
                  <Box
                      sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100dvh",
                      }}
                  >
                      <Typography variant="h4">
                          Ocorreu um erro inesperado
                      </Typography>
                      <Typography variant="h6">
                          {this.state.error.toString()}
                      </Typography>
                      <Box
                          sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: this.expandido
                                  ? "grey.800"
                                  : "transparent",
                              borderRadius: 2,
                              padding: 2,
                              width: "max-content(80%)",
                          }}
                      >
                          {this.expandido && (
                              <Typography variant="body2">
                                  {this.state.errorInfo?.componentStack
                                      .split("\n")
                                      .map((line) => line.trim())
                                      .filter((line) => line)
                                      .map((line) => (
                                          <div>{line}</div>
                                      ))}
                              </Typography>
                          )}
                          <Button
                              variant="contained"
                              sx={{
                                  mt: this.expandido ? 1 : 0,
                              }}
                              onClick={() => {
                                  this.expandido = !this.expandido;
                                  this.forceUpdate();
                              }}
                          >
                              {this.expandido
                                  ? "Ocultar detalhes"
                                  : "Mostrar detalhes"}
                          </Button>
                      </Box>
                  </Box>
              )
            : this.props.children;
    }
}
