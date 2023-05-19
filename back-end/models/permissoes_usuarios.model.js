/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} Sequelize
 */
module.exports = (sequelize, Sequelize) => {
    const atributos = {
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        id_permissao: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
    };

    const permissoes_usuarios = sequelize.define(
        "permissoes_usuarios",
        atributos
    );

    permissoes_usuarios.associate = (models) => {
        permissoes_usuarios.belongsTo(models.usuarios, {
            foreignKey: "id_usuario",
            as: "usuarios",
        });
        permissoes_usuarios.belongsTo(models.permissoes, {
            foreignKey: "id_permissao",
            as: "permissoes",
        });
    };

    return permissoes_usuarios;
};
