const { usuario: usuarios_db } = require("../../models");

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
verificarDuplicado = (req, res, next) => {
    let usuario = req.body.usuario || "";
    let email = req.body.email || "";

    usuarios_db
        .findOne({
            where: {
                usuario,
            },
        })
        .then((user) => {
            if (user) {
                res.status(400).send({
                    message: "Nome de usuário já cadastrado!",
                });
                return;
            }

            usuarios_db
                .findOne({
                    where: {
                        email,
                    },
                })
                .then((user) => {
                    if (user) {
                        res.status(400).send({
                            message: "Email já cadastrado!",
                        });
                        return;
                    }

                    next();
                });
        });
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
existePermissao = (req, res, next) => {
    if (req.body.permissoes) {
        for (let i = 0; i < req.body.permissoes.length; i++) {
            if (!permissoes.includes(req.body.permissoes[i])) {
                res.status(400).send({
                    message:
                        "Failed! Role does not exist = " +
                        req.body.permissoes[i],
                });
                return;
            }
        }
    }

    next();
};

const validarRegistro = {
    verificarDuplicado,
    existePermissao,
};

module.exports = validarRegistro;
