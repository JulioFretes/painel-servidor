import { z } from "zod";

const mensagensPadrao = {
    required_error: "O campo é obrigatório",
    invalid_type_error: "Erro de tipagem",
};

export const loginSchema = z.object(
    {
        usuario: z.string().min(1, "O campo é obrigatório"),
        senha: z.string().min(1, "O campo é obrigatório"),
    },
    mensagensPadrao
);
export type Login = z.infer<typeof loginSchema>;

export const registrarSchema: any = z.object(
    {
        usuario: z
            .string()
            .min(3, "O campo deve conter no mínimo 3 caracteres"),
        senha: z.string().min(8, "O campo deve conter no mínimo 8 caracteres"),
        confirmarSenha: z
            .string()
            .min(1, "O campo é obrigatório")
            .refine((value) => {
                return value === registrarSchema.shape.senha;
            }),
        email: z.string().optional(),
    },
    mensagensPadrao
);
export type Registrar = z.infer<typeof registrarSchema>;

export const novoServidorSchema = z.object(
    {
        nome: z
            .string()
            .min(3, "O campo deve ter no mínimo 3 caracteres")
            .max(20, "O campo deve ter no máximo 20 caracteres"),
        ram: z.coerce.number().min(1024, "Deve ser maior ou igual a 1024MB"),
        args: z.coerce.string().optional(),
        porta: z.coerce
            .number({
                ...mensagensPadrao,
                invalid_type_error: "A porta deve ser um número",
            })
            .refine((value) => {
                return (
                    value > 1000 &&
                    value < 49151 &&
                    ![8080, 5176, 3000, 3001, 8081].includes(value)
                );
            }, "Essa porta não pode ser usada"),
        id_arquivo_jar: z.coerce.number().positive().int().optional(),
    },
    mensagensPadrao
);
export type NovoServidor = z.infer<typeof novoServidorSchema>;

export const editarServidorSchema = novoServidorSchema.extend({
    id: z.string().min(1, "O campo é obrigatório"),
});
export type EditarServidor = z.infer<typeof editarServidorSchema>;

export const inicializacaoSchema = editarServidorSchema.omit({
    ram: true,
});
export type Inicializacao = z.infer<typeof inicializacaoSchema>;

export const novoUsuarioSchema = z.object(
    {
        usuario: z.string().min(3, "O campo deve ter no mínimo 3 caracteres"),
        email: z.string().email().optional(),
        senha: z.string().min(8, "O campo deve ter no mínimo 8 caracteres"),
    },
    mensagensPadrao
);
export const editarUsuarioSchema = novoUsuarioSchema
    .omit({
        senha: true,
    })
    .extend({
        id: z.string().min(1, "O campo é obrigatório"),
        permissoes: z.array(z.string()).optional(),
        servidores: z.array(z.string()).optional(),
    });
export type NovoUsuario = z.infer<typeof novoUsuarioSchema>;
