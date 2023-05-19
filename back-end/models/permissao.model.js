/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} Sequelize
 */
module.exports = (sequelize, Sequelize) => {
    const atributos = {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        descricao: {
            type: Sequelize.STRING,
        },
    };

    const permissoes = sequelize.define("permissoes", atributos);

    permissoes.associate = (models) => {
        permissoes.belongsToMany(models.usuarios, {
            through: "permissoes_usuarios",
            foreignKey: "id_permissao",
        });
    };

    return permissoes;
};
