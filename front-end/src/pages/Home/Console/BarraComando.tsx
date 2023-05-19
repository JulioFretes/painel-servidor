import {
    ButtonBase,
    InputBase,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";
import { useEffect } from "react";

interface IProps {
    onSubmit: Function;
    isLoading?: boolean;
}

const BarraComando = ({ onSubmit, isLoading = false }: IProps) => {
    const submit = () => {
        const input = document.getElementById("barraComando");
        if (
            (input as any)?.value &&
            String((input as any)?.value) !== "undefined" &&
            String((input as any)?.value).trim() !== ""
        ) {
            onSubmit((input! as any).value!);
            (input! as any).value = "";
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (!e.shiftKey) submit();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 0,
                margin: 0,
                backgroundColor: "#1f1f1f",
                borderRadius: "0 0 8px 8px",
            }}
        >
            <Typography
                sx={{
                    marginRight: "10px",
                    ml: "10px",
                    userSelect: "none",
                }}
            >
                {"$"}
            </Typography>
            <InputBase
                placeholder="Digite um comando..."
                sx={{
                    outline: "none",
                    userSelect: "none",
                    width: "100%",
                    "&:focus-within": {
                        outline: "none",
                    },
                }}
                id="barraComando"
                disabled={isLoading}
            />
            <ButtonBase
                sx={{
                    borderRadius: "5px !important",
                    fontSize: "1rem",
                    color: "#ffffff91 !important",
                    padding: "10px !important",
                    cursor: "pointer !important",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    width: "fit-content",
                }}
                onClick={submit}
            >
                {isLoading ? (
                    <CircularProgress
                        sx={{
                            color: "white !important",
                        }}
                        size={20}
                    />
                ) : (
                    <span style={{ userSelect: "none" }}>{">"}</span>
                )}
            </ButtonBase>
        </Box>
    );
};

export default BarraComando;
