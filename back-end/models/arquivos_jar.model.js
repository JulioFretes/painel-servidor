/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} Sequelize
 */
module.exports = (sequelize, Sequelize) => {
    const atributos = {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        download: {
            type: Sequelize.STRING,
        },
        versao_minecraft: {
            type: Sequelize.STRING,
        },
        versao_build: {
            type: Sequelize.STRING,
        },
        nome: {
            type: Sequelize.STRING,
        },
        suporta_plugins: {
            type: Sequelize.BOOLEAN,
        },
        suporta_mods: {
            type: Sequelize.BOOLEAN,
        },
    };

    return sequelize.define("arquivos_jar", atributos);
};
