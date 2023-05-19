/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} Sequelize
 */
module.exports = (sequelize, Sequelize) => {
    const atributos = {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: Sequelize.STRING,
        },
        ram: {
            type: Sequelize.INTEGER,
            defaultValue: 512,
            allowNull: false,
        },
        porta: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        id_arquivo_jar: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        args: {
            type: Sequelize.STRING,
        },
    };

    const servidores = sequelize.define("servidores", atributos);

    servidores.associate = (models) => {
        servidores.belongsToMany(models.usuarios, {
            through: "servidores_usuarios",
            foreignKey: "id_servidor",
        });
    };

    return servidores;
};
