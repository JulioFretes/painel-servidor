/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} Sequelize
 */
module.exports = (sequelize, Sequelize) => {
    const atributos = {
        id_servidor: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
    };

    const servidores_usuarios = sequelize.define(
        "servidores_usuarios",
        atributos
    );

    servidores_usuarios.associate = (models) => {
        servidores_usuarios.belongsTo(models.servidores, {
            foreignKey: "id_servidor",
            as: "servidores",
        });
        servidores_usuarios.belongsTo(models.usuarios, {
            foreignKey: "id_usuario",
            as: "usuarios",
        });
    };

    return servidores_usuarios;
};
