/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} Sequelize
 */
module.exports = (sequelize, Sequelize) => {
    const atributos = {
        id_socket: {
            type: Sequelize.STRING,
        },
        usuario: {
            type: Sequelize.STRING,
        },
        rota: {
            type: Sequelize.STRING,
        },
    };

    return sequelize.define("websockets", atributos);
};
