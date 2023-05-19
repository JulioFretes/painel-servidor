/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} Sequelize
 */
module.exports = (sequelize, Sequelize) => {
    const atributos = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        senha: {
            type: Sequelize.STRING,
        },
    };

    const usuarios = sequelize.define("usuarios", atributos);

    usuarios.associate = (models) => {
        usuarios.belongsToMany(models.permissoes, {
            through: "permissoes_usuarios",
            foreignKey: "id_usuario",
        });
        usuarios.belongsToMany(models.servidores, {
            through: "servidores_usuarios",
            foreignKey: "id_usuario",
        });
    };

    return usuarios;
};
