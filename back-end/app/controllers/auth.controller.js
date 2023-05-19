const {
    usuarios: usuarios_db,
    permissoes_usuarios: permissoes_usuarios_db,
    servidores_usuarios: servidores_usuarios_db,
    servidores: servidores_db,
    Sequelize,
} = require("../../models");

const Op = Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Registra as permissões do usuário
 * @param {string} usuario
 * @param {Array<string>} permissoes
 */
async function registrarPermissoes(usuarioId, permissoes) {
    permissoes.map(async (permissao) => {
        await permissoes_usuarios_db.create({
            id_usuario: usuarioId,
            id_permissao: permissao,
        });
    });
}

/**
 * Cria um novo usuário
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.signup = async (req, res) => {
    try {
        /**
         * @type {Array<string>}
         */
        const permissoes = req.body.permissoes || ["default"];

        if (!req.body.usuario || !req.body.senha || !req.body.servidor)
            return res.status(400).send(req.body);

        const {
            usuario,
            email,
            id: id_usuario,
        } = await usuarios_db.create({
            usuario: req.body.usuario,
            email: req.body.email || "",
            senha: bcrypt.hashSync(req.body.senha, 8),
        });

        await registrarPermissoes(id_usuario, permissoes);

        await servidores_usuarios_db.create({
            id_usuario: id_usuario,
            id_servidor: req.body.servidor,
        });

        return res.status(201).send({
            id_usuario: id_usuario,
            usuario: usuario,
            email: email,
            permissoes: permissoes,
            servidor: req.body.servidor,
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

/**
 * Faz o login do usuário
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.signin = async (req, res) => {
    try {
        const db = await usuarios_db.findOne({
            where: {
                usuario: req.body.usuario,
            },
        });

        const usuario = db?.dataValues;

        const isSenhaCorreta = bcrypt.compareSync(
            req.body.senha,
            String(usuario?.senha)
        );

        if (!usuario || !isSenhaCorreta) {
            return res.status(404).send({
                message: "Usuário ou senha incorretos.",
            });
        }

        const permissoesUsuario = (
            await permissoes_usuarios_db.findAll({
                where: {
                    id_usuario: usuario.id,
                },
            })
        ).map((p) => p.dataValues.idPermissao);

        const idsServidoresUsuario = (
            await servidores_usuarios_db.findAll({
                where: {
                    id_usuario: usuario.id,
                },
            })
        ).map((s) => s.dataValues.id_servidor);

        const servidoresUsuario = (
            await servidores_db.findAll({
                where: {
                    id: {
                        [Op.or]: idsServidoresUsuario,
                    },
                },
            })
        ).map((s) => s.dataValues);

        const permissoes = Buffer.from(
            JSON.stringify(permissoesUsuario || ["default"])
        ).toString("base64");

        const token = jwt.sign(
            { id: usuario.id, permissoes },
            process.env.JWT_SIGNATURE,
            {
                expiresIn: 86400, // 24 hours
            }
        );

        return res.status(200).send({
            Usuario: {
                id: usuario.id,
                nome: usuario.usuario,
                email: usuario.email,
                servidores: servidoresUsuario,
            },
            session: permissoes,
            token,
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

/**
 * Faz o logout do usuário
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 */
exports.signout = (_req, res) => {
    return res.status(205).clearCookie("session");
};
