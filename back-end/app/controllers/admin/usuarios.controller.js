const { usuarios: usuarios_db } = require("../../../models");

/**
 * Retorna todos os usuários
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.listarUsuarios = async (req, res) => {
    const queryParams = req.query;
    let usuarios;

    if (queryParams) usuarios = await usuarios_db.findAll(queryParams);
    else usuarios = await usuarios_db.findAll();

    return res.status(200).send(usuarios);
};

/**
 * Retorna as informações do usuário
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.informacoesUsuario = async (req, res) => {
    const id_usuario = req.params.id_usuario;
    if (!id_usuario)
        return res.status(400).send({
            message: "Nenhum id de usuário foi enviado!",
        });

    const usuario = await usuarios_db.findOne({
        where: {
            id: id_usuario,
        },
    });

    return res.status(200).send(usuario);
};

/**
 * Edita as informações do usuário
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.editarUsuario = async (req, res) => {
    const id_usuario = req.params.id_usuario;
    if (!id_usuario)
        return res.status(400).send({
            message: "Nenhum id de usuário foi enviado!",
        });

    const usuario = await usuarios_db.findOne({
        where: {
            id: id_usuario,
        },
    });

    if (!usuario)
        return res.status(404).send({
            message: "Usuário não encontrado!",
        });

    const usuarioAtualizado = await usuarios_db.update(
        { ...req.body, id: id_usuario },
        {
            where: {
                id: id_usuario,
            },
        }
    );

    return res.status(200).send(usuarioAtualizado);
};

/**
 * Deleta o usuário
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.deletarUsuario = async (req, res) => {
    const id_usuario = req.params.id_usuario;
    if (!id_usuario)
        return res.status(400).send({
            message: "Nenhum id de usuário foi enviado!",
        });

    const usuario = await usuarios_db.findOne({
        where: {
            id: id_usuario,
        },
    });

    if (!usuario)
        return res.status(404).send({
            message: "Usuário não encontrado!",
        });

    const usuarioDeletado = await usuarios_db.destroy({
        where: {
            id: id_usuario,
        },
    });

    return res.status(200).send(usuarioDeletado);
};

/**
 * Tenta criar um usuário com as informações enviadas
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.criarUsuario = async (req, res) => {
    let usuario;
    try {
        usuario = await usuarios_db.create(req.body);
    } catch (error) {
        return res.status(400).send({ ...error });
    }

    return res.status(200).send(usuario);
};
