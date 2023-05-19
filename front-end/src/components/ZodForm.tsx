import React, { useState } from "react";
import { z } from "zod";

interface IProps {
    children: React.ReactNode;
    onSubmit: (values: any) => void;
    schema: z.ZodSchema<any>;
    sx?: React.CSSProperties;
}

/**
 * SEMPRE vai retornar **String** para os valores dos campos,
 * use **coerce** no schema para converter os valores
 */
const ZodForm = ({ children, onSubmit, schema, sx }: IProps) => {
    const [valores, setValores] = useState<Record<string, string>>({});
    const [erros, setErros] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!value)
            return setValores({
                ...Object.keys(valores).reduce((acc, key) => {
                    if (key !== name) {
                        acc[key] = valores[key];
                    }
                    return acc;
                }, {} as Record<string, any>),
                [name]: " ",
            });
        if (erros[name]) {
            setErros(
                Object.keys(erros).reduce((acc, key) => {
                    if (key !== name) {
                        acc[key] = erros[key];
                    }
                    return acc;
                }, {} as Record<string, string>)
            );
        }
        setValores({ ...valores, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const { error } = schema.safeParse(valores) as any;
        if (error) {
            console.warn(error.formErrors.fieldErrors);
            setErros(error.formErrors.fieldErrors);
        } else {
            onSubmit(
                Object.keys(valores).reduce((acc, key) => {
                    if (valores[key] !== " ") acc[key] = valores[key];
                    return acc;
                }, {} as Record<string, any>)
            );
        }
    };

    function mapChildrenWithProps(children: React.ReactNode): React.ReactNode {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                if (
                    (child.props.defaultValue || child.props.value) &&
                    !valores[child.props.name]
                ) {
                    setValores({
                        [child.props.name]:
                            child.props.value ?? child.props.defaultValue,
                        ...valores,
                    });
                }
                if (child.props.name && erros[child.props.name]) {
                    const hasErro = erros[child.props.name].length > 0;
                    if (hasErro) {
                        child = React.cloneElement(child, {
                            onChange: handleChange,
                            error: hasErro,
                            helperText: erros[child.props.name],
                        } as any);
                    } else {
                        child = React.cloneElement(child, {
                            onChange: handleChange,
                        } as any);
                    }
                }
                if (child.props.children) {
                    child = React.cloneElement(child, {
                        children: mapChildrenWithProps(child.props.children),
                        onChange: handleChange,
                    } as any);
                }
            }
            return child;
        });
    }

    const childrenWithProps = mapChildrenWithProps(children);

    return (
        <form onSubmit={handleSubmit} style={sx}>
            {childrenWithProps}
        </form>
    );
};

export default ZodForm;
