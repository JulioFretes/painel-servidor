import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import React, { useEffect } from "react";
import {
    Inicializacao as TInicializacao,
    inicializacaoSchema,
} from "../../common/schemas";
import { ArquivoJar, Servidor } from "../../common/types";
import ZodForm from "../../components/ZodForm";
import IconButton from "@mui/material/IconButton";
import ServidorService from "../../services/servidor.service";
import ModalJarFile from "../../components/ModalJarFile";
import { useSnackbar } from "notistack";

interface IProps {
    servidor: Servidor;
    onSubmit?: (data: TInicializacao) => void;
}

const Inicializacao: React.FC<IProps> = ({ servidor, onSubmit }) => {
    const snackbar = useSnackbar();
    const [isEnviando, setIsEnviando] = React.useState<boolean>(false);
    const [isModalAberto, setIsModalAberto] = React.useState<boolean>(false);
    const [arquivoJar, setArquivoJar] = React.useState<ArquivoJar>();
    const [jars, setJars] = React.useState<ArquivoJar[]>([]);
    const handleSubmit = (data: TInicializacao) => {
        setIsEnviando(true);
        ServidorService.editarInicializacao({
            ...data,
            id_arquivo_jar: arquivoJar?.id,
        })
            .then(() => {
                snackbar.enqueueSnackbar("Parâmetros salvos", {
                    variant: "success",
                });
                onSubmit?.(data);
            })
            .catch((e) => {
                console.error(e);
                snackbar.enqueueSnackbar("Erro ao salvar parâmetros", {
                    variant: "error",
                });
            })
            .finally(() => setIsEnviando(false));
    };

    useEffect(() => {
        const carregarArquivoJar = async () => {
            const { data } = await ServidorService.getJarFiles();
            setJars(data);
            setArquivoJar(
                data.find((j: ArquivoJar) => j.id === servidor.id_arquivo_jar)!
            );
        };

        carregarArquivoJar().catch(console.error);
    }, [servidor.id_arquivo_jar]);

    return (
        servidor && (
            <>
                {isModalAberto && (
                    <ModalJarFile
                        open={isModalAberto}
                        onClose={() => setIsModalAberto(false)}
                        onSubmit={(j: ArquivoJar) => {
                            setIsModalAberto(false);
                            setArquivoJar(j);
                        }}
                        jars={jars}
                        defaultValue={servidor.id_arquivo_jar}
                    />
                )}
                <ZodForm onSubmit={handleSubmit} schema={inicializacaoSchema}>
                    <Grid
                        container
                        sx={{
                            flexDirection: "column",
                            alignContent: "center",
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <TextField
                            name="id"
                            value={servidor.id}
                            sx={{ display: "none" }}
                        />
                        <Grid item>
                            <TextField
                                name="nome"
                                label="Nome"
                                defaultValue={servidor.nome ?? ""}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name="porta"
                                label="Porta"
                                defaultValue={servidor.porta}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name="args"
                                label="Args"
                                defaultValue={servidor.args}
                                disabled
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name="id_arquivo_jar"
                                value={arquivoJar?.id ?? 0}
                                sx={{ display: "none" }}
                            />
                            <TextField
                                label="Arquivo JAR"
                                name="arquivo_jar"
                                fullWidth
                                value={
                                    arquivoJar
                                        ? `${arquivoJar.nome} (${arquivoJar.versao_minecraft})`
                                        : `Nenhum arquivo selecionado`
                                }
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => {
                                                setIsModalAberto(true);
                                            }}
                                        >
                                            <FileOpenIcon htmlColor="gainsboro" />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button fullWidth type="submit" variant="contained">
                                {isEnviando && <CircularProgress size={24} />}
                                <span>Salvar</span>
                            </Button>
                        </Grid>
                    </Grid>
                </ZodForm>
            </>
        )
    );
};

export default Inicializacao;
