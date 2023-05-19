import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Modal,
    Typography,
} from "@mui/material";
import ZodForm from "./ZodForm";

interface IProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    title: string;
    children: React.ReactNode;
    sx?: any;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
    schema: any;
    isLoading?: boolean;
}

const FormModal: React.FC<IProps> = ({
    open,
    onClose,
    title,
    children,
    sx,
    confirmButtonLabel,
    cancelButtonLabel,
    onSubmit,
    schema,
    isLoading,
}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    ...sx,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: 24,
                    width: "80%",
                    height: "80%",
                    backgroundColor: "primary.dark",
                    overflow: "auto",
                    borderRadius: "1rem",
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            p: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: "center",
                                userSelect: "none",
                                textTransform: "uppercase",
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Divider
                        sx={{
                            backgroundColor: "darkslategray",
                            mb: 2,
                        }}
                        variant="fullWidth"
                    />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ZodForm
                            sx={{ display: "grid", height: "100%" }}
                            schema={schema}
                            onSubmit={onSubmit}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    flexGrow: 1,
                                }}
                            >
                                {children}
                            </Box>
                            <Box
                                sx={{
                                    mt: "auto",
                                    height: "fit-content",
                                }}
                            >
                                <Divider
                                    sx={{
                                        backgroundColor: "darkslategray",
                                    }}
                                    variant="fullWidth"
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        gap: "1rem",
                                        p: 2,
                                    }}
                                >
                                    <Button fullWidth onClick={() => onClose()}>
                                        {cancelButtonLabel || "Cancelar"}
                                    </Button>
                                    <Button fullWidth type="submit">
                                        {isLoading && (
                                            <CircularProgress
                                                size="1rem"
                                                sx={{ mr: 2 }}
                                            />
                                        )}
                                        <span>
                                            {confirmButtonLabel || "Confirmar"}
                                        </span>
                                    </Button>
                                </Box>
                            </Box>
                        </ZodForm>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default FormModal;
