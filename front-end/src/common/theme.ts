import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#5865f2",
            dark: "#1e1f22",
            light: "#2b2d31",
        },
        secondary: {
            main: "#313338",
        },
        text: {
            primary: "#fff",
            secondary: "#989aa2",
            disabled: "#e0e1e5",
        },
        error: {
            main: "#ed143d",
        },
    },
    components: {
        MuiModal: {
            styleOverrides: {
                root: {
                    borderRadius: "5px !important",
                },
                backdrop: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    color: "gainsboro",
                },
                row: {
                    "&:hover": {
                        backgroundColor: "#2b2d31",
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#1e1f22",
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#1e1f22",
                    },
                    "&:nth-of-type(even)": {
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                    },
                },
                cell: {
                    "&.MuiDataGrid-cell:focus": {
                        outline: "1px solid gainsboro",
                    },
                },
                columnHeader: {
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#313338",
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: "#2b2d31",
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    "&.MuiFilledInput-underline:after": {
                        border: "1px solid #2b2d31 !important",
                    },
                    color: "gainsboro",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.MuiInputLabel-shrink": {
                        color: "rgba(255, 255, 255, 0.6)",
                    },
                    color: "gainsboro",
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    "&.MuiInput-underline:after": {
                        border: "1px solid gainsboro !important",
                    },
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    backgroundColor: "#313338",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "#1e1f22",
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#1e1f22",
                    },
                    "&.Mui-selected:focus": {
                        backgroundColor: "#1e1f22",
                    },
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "#1e1f22",
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#1e1f22",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    "&.MuiPaper-elevation": {
                        backgroundColor: "#313338",
                        borderRadius: "5px",
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: "#313338",
                },
                indicator: {
                    backgroundColor: "gainsboro",
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        color: "gainsboro",
                    },
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    color: "crimson",
                },
            },
        },
    } as any,
});

export default theme;
