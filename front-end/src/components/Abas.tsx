import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import React from "react";

export type Aba = {
    label: string;
    value: string;
    element: JSX.Element;
};

interface IProps {
    selecionada: string;
    abas: Aba[];
    trocarAba: (aba: string) => void;
    children?: React.ReactNode;
    sx?: React.CSSProperties;
    variant?: "standard" | "scrollable" | "fullWidth";
}

const Abas: React.FC<IProps> = ({
    selecionada,
    abas,
    trocarAba,
    children,
    sx,
    variant,
}) => {
    return (
        <TabContext value={selecionada}>
            <TabList
                onChange={(_event, newValue) => {
                    trocarAba(newValue);
                }}
                variant={variant ?? "standard"}
                sx={sx}
            >
                {abas.map((aba) => (
                    <Tab key={aba.value} label={aba.label} value={aba.value} />
                ))}

                {children}
            </TabList>
            {abas.map((aba) => (
                <TabPanel key={aba.value} value={aba.value}>
                    {aba.element}
                </TabPanel>
            ))}
        </TabContext>
    );
};

export default Abas;
