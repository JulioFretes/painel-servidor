const { authJwt } = require("../middleware");
const controller = require("../controllers/servidor.controller");

const prefixo = "/api/servidor";

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

    app.post(`${prefixo}/iniciar`, [authJwt.verifyToken], controller.iniciar);
    app.post(`${prefixo}/parar`, [authJwt.verifyToken], controller.parar);
    app.post(
        `${prefixo}/reiniciar`,
        [authJwt.verifyToken],
        controller.reiniciar
    );
    app.post(`${prefixo}/kill`, [authJwt.verifyToken], controller.kill);
    app.post(
        `${prefixo}/rodar-comando`,
        [authJwt.verifyToken],
        controller.rodarComando
    );
    app.get(
        `${prefixo}/logs/:serverId`,
        [authJwt.verifyToken],
        controller.getLogs
    );
    app.get(
        `${prefixo}/jar-files/info`,
        [authJwt.verifyToken],
        controller.getInfoJarFiles
    );
    app.get(
        `${prefixo}/jar-file/info/:id`,
        [authJwt.verifyToken],
        controller.getInfoJarFile
    );
    app.put(
        `${prefixo}/inicializacao/:id`,
        [authJwt.verifyToken],
        controller.editarInicializacao
    );
};
