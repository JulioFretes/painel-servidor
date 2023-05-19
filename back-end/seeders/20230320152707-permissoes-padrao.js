"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     */
    async up(queryInterface, _Sequelize) {
        queryInterface.bulkInsert(
            "permissoes",
            [
                {
                    id: "admin",
                    descricao: "Administrador",
                    createdAt: new Date(0),
                    updatedAt: new Date(0),
                },
                {
                    id: "moderador",
                    descricao: "Moderador",
                    createdAt: new Date(0),
                    updatedAt: new Date(0),
                },
                {
                    id: "super",
                    descricao: "Super Usuário",
                    createdAt: new Date(0),
                    updatedAt: new Date(0),
                },
            ],
            {
                updateOnDuplicate: ["id", "descricao", "updatedAt"],
            }
        );
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     */
    async down(queryInterface, Sequelize) {
        queryInterface.bulkDelete("permissoes", {
            id: {
                [Sequelize.Op.in]: ["admin", "moderador", "super"],
            },
        });
    },
};
