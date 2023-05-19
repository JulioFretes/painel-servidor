const { validarRegistro } = require("../middleware");
const controller = require("../controllers/auth.controller");

const prefixo = "/api/auth";

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

    app.post(
        `${prefixo}/signup`,
        [validarRegistro.verificarDuplicado, validarRegistro.existePermissao],
        controller.signup
    );

    app.post(`${prefixo}/signin`, controller.signin);

    app.get(`${prefixo}/signout`, controller.signout);
};
