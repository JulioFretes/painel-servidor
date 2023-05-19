"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     */
    async up(queryInterface, _Sequelize) {
        // create admin user
        await queryInterface.bulkInsert(
            "usuarios",
            [
                {
                    id: "1",
                    usuario: "admin",
                    email: "admin@localhost",
                    senha: "$2a$10$aa8Ok2jeDDoKxVnbib6OleU7gMg7XnAzWZaWu63DzSFPr56RHdJHq",
                    createdAt: new Date(0),
                    updatedAt: new Date(0),
                },
            ],
            {
                updateOnDuplicate: [
                    "id",
                    "usuario",
                    "email",
                    "senha",
                    "updatedAt",
                ],
            }
        );

        // add admin permission
        await queryInterface.bulkInsert(
            "permissoes_usuarios",
            [
                {
                    id_usuario: 1,
                    id_permissao: "admin",
                    createdAt: new Date(0),
                    updatedAt: new Date(0),
                },
            ],
            {
                updateOnDuplicate: ["id_usuario", "id_permissao", "updatedAt"],
            }
        );

        // create test jar
        await queryInterface.bulkInsert(
            "arquivos_jar",
            [
                {
                    id: 1,
                    download:
                        "https://papermc.io/api/v2/projects/paper/versions/1.16.5/builds/777/downloads/paper-1.16.5-777.jar",
                    nome: "Paper",
                    versao_minecraft: "1.16.5",
                    versao_build: "777",
                    suporta_plugins: true,
                    suporta_mods: false,
                    createdAt: new Date(0),
                    updatedAt: new Date(0),
                },
            ],
            {
                updateOnDuplicate: [
                    "id",
                    "download",
                    "nome",
                    "versao_minecraft",
                    "versao_build",
                    "suporta_plugins",
                    "suporta_mods",
                    "updatedAt",
                ],
            }
        );

        // create test server
        await queryInterface.bulkInsert(
            "servidores",
            [
                {
                    id: "00000000-0000-0000-0000-000000000000",
                    nome: "Test Server",
                    ram: 1024,
                    porta: 25565,
                    id_arquivo_jar: 1,
                    args: "",
                    createdAt: new Date(0),
                    updatedAt: new Date(0),
                },
            ],
            {
                updateOnDuplicate: [
                    "id",
                    "nome",
                    "ram",
                    "porta",
                    "id_arquivo_jar",
                    "args",
                    "updatedAt",
                ],
            }
        );

        // set test server owner
        await queryInterface.bulkInsert(
            "servidores_usuarios",
            [
                {
                    id_servidor: "00000000-0000-0000-0000-000000000000",
                    id_usuario: 1,
                    createdAt: new Date(0),
                    updatedAt: new Date(0),
                },
            ],
            {
                updateOnDuplicate: ["id_servidor", "id_usuario", "updatedAt"],
            }
        );
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     */
    async down(queryInterface, _Sequelize) {
        await queryInterface.bulkDelete("permissoes_usuarios", {
            id_usuario: "1",
        });
        await queryInterface.bulkDelete("servidores", {
            id: "00000000-0000-0000-0000-000000000000",
        });
        await queryInterface.bulkDelete("arquivos_jar", {
            id: 1,
        });
        await queryInterface.bulkDelete("usuarios", {
            id: "1",
        });
    },
};
