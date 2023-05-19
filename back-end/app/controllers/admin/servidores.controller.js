const {
    servidores: servidores_db,
    servidores_usuarios: servidores_usuarios_db,
    arquivos_jar: arquivos_jar_db,
} = require("../../../models");
const files = require("../../middleware/files.js");

/**
 * Retorna todos os servidores
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.listarServidores = async (req, res) => {
    const queryParams = req.query;
    let servidores;

    if (queryParams) servidores = await servidores_db.findAll(queryParams);
    else servidores = await servidores_db.findAll();

    return res.status(200).send(servidores);
};

/**
 * Retorna todos os servidores do usuário
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.listarServidoresUsuario = async (req, res) => {
    const id_usuario = req.params.id_usuario;
    if (!id_usuario)
        return res.status(400).send({
            message: "Nenhum id de usuário foi enviado!",
        });

    const servidoresUsuario = await servidores_usuarios_db.findAll({
        where: {
            id_usuario,
        },
    });

    const idsServidores = servidoresUsuario.map(
        (servidor) => servidor.id_servidor
    );

    const servidores = await servidores_db.findAll({
        where: {
            id: idsServidores,
        },
    });

    return res.status(200).send(servidores);
};

/**
 * Retorna todos os servidores do usuário
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.informacoesServidor = async (req, res) => {
    const id_servidor = req.params.id_servidor;
    if (!id_servidor)
        return res.status(400).send({
            message: "Nenhum id de servidor foi enviado!",
        });

    const servidor = await servidores_db.findOne({
        where: {
            id: id_servidor,
        },
    });

    return res.status(200).send(servidor);
};

/**
 * Edita os dados de um servidor
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.editarServidor = async (req, res) => {
    if (!req.params.id)
        return res.status(400).send({
            message: "Nenhum id de servidor foi enviado!",
        });

    const servidor = await servidores_db.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!servidor)
        return res.status(400).send({
            message: "Nenhum servidor foi encontrado com esse id!",
        });

    const servidorAtualizado = await servidores_db.update(req.body, {
        where: {
            id: req.params.id,
        },
    });

    return res.status(200).send(servidorAtualizado);
};

/**
 * Deleta um servidor
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.deletarServidor = async (req, res) => {
    const id_servidor = req.params.id_servidor;
    if (!id_servidor)
        return res.status(400).send({
            message: "Nenhum id de servidor foi enviado!",
        });

    const servidor = await servidores_db.findOne({
        where: {
            id: id_servidor,
        },
    });

    if (!servidor)
        return res.status(400).send({
            message: "Nenhum servidor foi encontrado com esse id!",
        });

    const servidorDeletado = await servidores_db.destroy({
        where: {
            id: id_servidor,
        },
    });

    return res.status(200).send(servidorDeletado);
};

/**
 * Cria um novo servidor com os dados enviados no body
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.criarServidor = async (req, res) => {
    const { nome, ram, porta, id_arquivo_jar, usuario } = req.body;

    if (!nome || !ram || !porta)
        return res.status(400).send({
            message: "Parâmetros inválidos, nome, ram e porta são obrigatórios",
        });

    const { dataValues: servidor } = await servidores_db.create(req.body);

    if (usuario) {
        await servidores_usuarios_db.create({
            id_servidor: servidor.id,
            id_usuario: usuario,
        });
    }

    const server_jar = id_arquivo_jar
        ? await arquivos_jar_db.findByPk(id_arquivo_jar)
        : await arquivos_jar_db.findOne({
              where: {
                  tipo: "vanilla",
              },
              order: [["createdAt", "DESC"]],
          });

    const serverDirectory = `${process.env.SERVERS_DIRECTORY}/${servidor.id}`;
    fs.mkdirSync(serverDirectory);
    fs.writeFileSync(
        `${serverDirectory}/server.properties`,
        `server-port=${porta}`
    );

    try {
        files.baixar(
            server_jar.dataValues.download,
            `${process.env.SERVERS_DIRECTORY}/${serverId}`,
            "server.jar"
        );
    } catch (e) {
        console.error(e);
        return res.status(201).send({
            ...servidor,
            error: `Erro ao baixar jar ${downloadLink}: ${e.message}`,
        });
    }

    return res.status(201).send(servidor);
};
