const { authJwt } = require("../middleware");
const controller = require("../controllers/usuario.controller");

const prefixo = "/api/usuario";

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
        `${prefixo}/permissoes`,
        [authJwt.verifyToken],
        controller.permissoes
    );
    app.get(
        `${prefixo}/servidores`,
        [authJwt.verifyToken],
        controller.servidores
    );
    app.get(
        `${prefixo}/meu-usuario`,
        [authJwt.verifyToken],
        controller.meuUsuario
    );
};
