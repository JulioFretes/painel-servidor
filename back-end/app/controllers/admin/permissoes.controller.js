const {
    permissoes: permissoes_db,
    permissoes_usuarios: permissoes_usuarios_db,
} = require("../../../models");

/**
 * Retorna todas as permissões
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.listarPermissoes = async (req, res) => {
    const queryParams = req.query;
    let permissoes;

    if (queryParams) permissoes = await permissoes_db.findAll(queryParams);
    else permissoes = await permissoes_db.findAll();

    return res.status(200).send(permissoes);
};

/**
 * Retorna todas as permissões do usuário
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.listarPermissoesUsuario = async (req, res) => {
    const id_usuario = req.params.id_usuario;
    if (!id_usuario)
        return res.status(400).send({
            message: "Nenhum id de usuário foi enviado!",
        });

    const permissoesUsuario = await permissoes_usuarios_db.findAll({
        where: {
            id_usuario,
        },
    });

    const permissoes = permissoesUsuario.map(
        (permissao) => permissao.id_permissao
    );

    return res.status(200).send(permissoes);
};
