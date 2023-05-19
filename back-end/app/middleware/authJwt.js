const jwt = require("jsonwebtoken");

/**
 * Verifica se o usuário está autenticado
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
verifyToken = (req, res, next) => {
    const token = req.headers["authorization"].replace("Bearer ", "");

    if (!token) {
        return res.status(401).send({
            message: "Nenhum token enviado!",
        });
    }

    jwt.verify(token, process.env.JWT_SIGNATURE, (err, decodedToken) => {
        if (err) {
            return res.status(401).send({
                message: "Token inválido!",
            });
        }
        // todo: assinar um novo token de escopo aqui
        req._decodedToken = decodedToken;
        next();
    });
};

/**
 * Verifica se o usuário tem todas as permissões fornecidas
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @param {Array<string>} permissoes
 */
temPermissoes = (req, res, next, permissoes) => {
    if (!req._decodedToken.permissoes)
        return res.status(403).send({
            message: "Forbidden!",
        });
    if (
        !permissoes.every((p) =>
            JSON.parse(
                Buffer.from(req._decodedToken.permissoes, "base64").toString()
            ).includes(p)
        )
    )
        return res.status(403).send({
            message: "Forbidden!",
        });
    next();
};

/**
 * Verifica se o usuário tem uma das permissões fornecidas
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @param {Array<string>} permissoes
 */
temUmaPermissao = (req, res, next, permissoes) => {
    if (!req._decodedToken.permissoes)
        return res.status(403).send({
            message: "Forbidden!",
        });
    if (
        !permissoes.some((p) =>
            JSON.parse(
                Buffer.from(req._decodedToken.permissoes, "base64").toString()
            ).includes(p)
        )
    )
        return res.status(403).send({
            message: "Forbidden!",
        });
    next();
};

const authJwt = {
    verifyToken: verifyToken,
    temPermissoes: temPermissoes,
    temUmaPermissao: temUmaPermissao,
};
module.exports = authJwt;
