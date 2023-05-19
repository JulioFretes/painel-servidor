import { Box, Button } from "@mui/material";
import { ArquivoJar } from "../common/types";
import { useState } from "react";
import CustomModal from "./CustomModal";
import Abas from "./Abas";

interface IProps {
    open: boolean;
    onSubmit: (file: ArquivoJar) => void;
    onClose: () => void;
    jars: ArquivoJar[];
    defaultValue?: number;
}

const ModalJarFile: React.FC<IProps> = ({ open, onSubmit, jars, onClose }) => {
    const abas = [
        {
            label: "Vanilla",
            value: "vanilla",
            element: (
                <ListaArquivos
                    jars={jars.filter((jar) => {
                        return !jar.suporta_mods && !jar.suporta_plugins;
                    })}
                    onSelect={onSubmit}
                />
            ),
        },
        {
            label: "Plugins",
            value: "plugins",
            element: (
                <ListaArquivos
                    jars={jars.filter((jar) => {
                        return !!jar.suporta_plugins;
                    })}
                    onSelect={onSubmit}
                />
            ),
        },
        {
            label: "Modpacks",
            value: "modpacks",
            element: (
                <ListaArquivos
                    jars={jars.filter((jar) => {
                        return !!jar.suporta_mods;
                    })}
                    onSelect={onSubmit}
                />
            ),
        },
    ];

    const [abaSelecionada, setAbaSelecionada] = useState<string>(abas[0].value);

    if (!jars) return null;
    return (
        <CustomModal
            onClose={onClose}
            onSubmit={(v) => {
                onSubmit(v as ArquivoJar);
            }}
            open={open}
            title="Selecione um arquivo"
            customButtons={
                <Button fullWidth onClick={onClose}>
                    Cancelar
                </Button>
            }
        >
            <Abas
                selecionada={abaSelecionada}
                trocarAba={setAbaSelecionada}
                abas={abas}
                variant="fullWidth"
            />
        </CustomModal>
    );
};

interface PropsArquivos {
    jars: ArquivoJar[];
    onSelect: (jar: ArquivoJar) => void;
}

const ListaArquivos: React.FC<PropsArquivos> = ({ jars, onSelect }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {jars.map((jar) => (
                <Button
                    onClick={() => {
                        onSelect(jar);
                    }}
                    key={jar.id}
                    value={jar.id}
                >
                    {jar.nome} {jar.versao_minecraft}
                </Button>
            ))}
        </Box>
    );
};

export default ModalJarFile;
