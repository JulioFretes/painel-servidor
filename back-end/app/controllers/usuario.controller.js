const {
    permissoes_usuarios: permissoes_usuarios_db,
    servidores_usuarios: servidores_usuarios_db,
    servidores: servidores_db,
    usuarios: usuarios_db,
} = require("../../models");

/**
 * Retorna as permissoes do usuário que fez a requisição
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.permissoes = async (req, res) => {
    permissoes_usuarios_db
        .findAll({
            where: {
                id_usuario: req._decodedToken.id,
            },
        })
        .then((permissoes) => {
            res.status(200).json(permissoes);
        });
};

/**
 * Retorna os servidores do usuário que fez a requisição
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.servidores = async (req, res) => {
    servidores_usuarios_db
        .findAll({
            where: {
                id_usuario: req._decodedToken.id,
            },
        })
        .then((servidores) => {
            const idsServidores = servidores.map(
                (servidor) => servidor.id_servidor
            );

            servidores_db
                .findAll({
                    where: {
                        id: idsServidores,
                    },
                })
                .then(
                    (servidores) => {
                        res.status(200).json(servidores);
                    },
                    (err) => {
                        res.status(500).json(err);
                    }
                );
        });
};

/**
 * Retorna os dados do usuário que fez a requisição
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.meuUsuario = async (req, res) => {
    usuarios_db.findByPk(req._decodedToken.id).then((usuario) => {
        res.status(200).json(usuario);
    });
};
