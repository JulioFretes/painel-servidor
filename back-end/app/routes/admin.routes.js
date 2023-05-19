const servidorController = require("../controllers/admin/servidores.controller");
const usuarioController = require("../controllers/admin/usuarios.controller");
const permissoesController = require("../controllers/admin/permissoes.controller");
const { verifyToken, temPermissoes } = require("../middleware/authJwt");

const isAdmin = (req, res, next) => {
    temPermissoes(req, res, next, ["admin"]);
};

const prefixo = "/api/admin";

/**
 * @param {import('express').Express} app
 */
module.exports = (app) => {
    app.use((_req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        `${prefixo}/servidor`,
        [verifyToken, isAdmin],
        servidorController.listarServidores
    );
    app.get(
        `${prefixo}/servidor/usuario/:id_usuario`,
        [verifyToken, isAdmin],
        servidorController.listarServidoresUsuario
    );
    app.get(
        `${prefixo}/servidor/:idServidor`,
        [verifyToken, isAdmin],
        servidorController.informacoesServidor
    );
    app.put(
        `${prefixo}/servidor`,
        [verifyToken, isAdmin],
        servidorController.editarServidor
    );
    app.delete(
        `${prefixo}/servidor/:idServidor`,
        [verifyToken, isAdmin],
        servidorController.deletarServidor
    );
    app.post(
        `${prefixo}/servidor`,
        [verifyToken, isAdmin],
        servidorController.criarServidor
    );

    app.get(
        `${prefixo}/usuario`,
        [verifyToken, isAdmin],
        usuarioController.listarUsuarios
    );
    app.get(
        `${prefixo}/usuario/:id_usuario`,
        [verifyToken, isAdmin],
        usuarioController.informacoesUsuario
    );
    app.put(
        `${prefixo}/usuario`,
        [verifyToken, isAdmin],
        usuarioController.editarUsuario
    );
    app.delete(
        `${prefixo}/usuario/:id_usuario`,
        [verifyToken, isAdmin],
        usuarioController.deletarUsuario
    );
    app.post(
        `${prefixo}/usuario`,
        [verifyToken, isAdmin],
        usuarioController.criarUsuario
    );

    app.get(
        `${prefixo}/permissao/usuario/:id_usuario`,
        [verifyToken, isAdmin],
        permissoesController.listarPermissoesUsuario
    );
};
