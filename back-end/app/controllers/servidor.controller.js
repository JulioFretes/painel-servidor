const { spawn } = require("child_process");
const websocket = require("../../websocket.js");
const {
    servidores: servidores_db,
    arquivos_jar: arquivos_jar_db,
    servidores_usuarios: servidores_usuarios_db,
} = require("../../models");
const {
    escreverArquivo,
    lerArquivo,
    arquivoExiste,
} = require("../middleware/files.js");
const files = require("../middleware/files.js");

/**
 * @type {Object.<string, import("child_process").ChildProcessWithoutNullStreams>}
 */
let instanciasServidores = {};

/**
 * Inicia o servidor especificado
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.iniciar = async (req, res) => {
    const { serverId } = req.body;
    console.warn("Iniciando servidor", serverId);
    if (!serverId)
        return res.status(400).send({ message: "serverId é obrigatório" });
    if (isOnline(serverId))
        return res.status(409).send({ message: "Servidor já está rodando" });

    websocket.enviarLogs({
        message: `Iniciando servidor...`,
    });

    const { dataValues: dadosServidor } = await servidores_db.findByPk(
        serverId
    );

    escreverArquivo(
        `${process.env.SERVERS_DIRECTORY}/${serverId}/eula.txt`,
        "eula=true",
        false
    );

    lerArquivo(
        `${process.env.SERVERS_DIRECTORY}/${serverId}/server.properties`,
        (err, data) => {
            if (err) {
                console.error("Erro ao ler arquivo: ", err);
                return;
            }
            let result = data.replace(
                /server-port=\d+/g,
                `server-port=${dadosServidor.porta}`
            );

            escreverArquivo(
                `${process.env.SERVERS_DIRECTORY}/${serverId}/server.properties`,
                result,
                false
            );
        }
    );

    const downloadLink = (
        await arquivos_jar_db.findByPk(dadosServidor.id_arquivo_jar)
    ).dataValues.download;

    try {
        files.baixar(
            downloadLink,
            `${process.env.SERVERS_DIRECTORY}/${serverId}`,
            "server.jar"
        );
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            error: `Erro ao baixar jar ${downloadLink}: ${e.message}`,
        });
    }

    instanciasServidores[serverId] = spawn(
        `java`,
        [
            `-Xmx${dadosServidor.ram}M`,
            `-jar`,
            `${process.env.SERVERS_DIRECTORY}/${serverId}/server.jar`,
            `nogui`,
        ],
        {
            cwd: `${process.env.SERVERS_DIRECTORY}/${serverId}/server.jar`
                .split("/")
                .slice(0, -1)
                .join("/"),
        }
    );

    instanciasServidores[serverId].stdout.on("data", (data) => {
        escreverArquivo(
            `${process.env.SERVERS_DIRECTORY}/${serverId}/logs/painel.log`,
            data.toString(),
            true
        );

        websocket.enviarLogs({
            message: data.toString(),
            serverId,
        });
    });

    instanciasServidores[serverId].stderr.on("data", (data) => {
        console.error(data.toString());
        websocket.enviarLogs({
            message: `[STDERR] ${data.toString()}`,
            serverId,
        });
    });

    instanciasServidores[serverId].on("close", (code) => {
        console.warn(`Servidor ${serverId} fechado. Código de saída: ${code}`);
        websocket.enviarLogs({
            message: `[${new Date().toLocaleTimeString()}] Servidor fechado. Código de saída: ${code}`,
            serverId,
        });
    });

    return res.status(200).send({
        message: "Iniciando servidor",
        ...dadosServidor,
    });
};

/**
 * Roda o comando stop no servidor especificado
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.parar = (req, res) => {
    const { serverId } = req.body;

    return this.rodarComando(
        { ...req, body: { serverId, comando: "stop" } },
        res
    );
};

/**
 * Reinicia o servidor especificado
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.reiniciar = (req, res) => {
    const { serverId } = req.body;

    this.rodarComando(
        { ...req, body: { serverId, comando: "stop" } },
        async () => {
            // wait server close
            while (isOnline(serverId)) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            // start server
            this.iniciar(req, res);
        }
    );
};

/**
 * Finaliza o servidor especificado
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.kill = (req, res) => {
    const { serverId } = req.body;
    try {
        instanciasServidores[serverId].kill();
        instanciasServidores[serverId] = null;
        return res.status(200).send({ message: "Processo finalizado" });
    } catch (e) {
        return res.status(500).send({
            message: e.message + ". O servidor está rodando?",
        });
    }
};

/**
 * Roda um comando no servidor especificado
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.rodarComando = (req, res) => {
    const { comando, serverId } = req.body;

    if (!comando || !serverId)
        return res
            .status(400)
            .send({ message: "comando e serverId são obrigatórios" });

    const cmd = String(comando).trim();
    try {
        instanciasServidores[serverId].stdin.write(`${cmd}\n`);
    } catch (e) {
        return res.status(500).send({
            message: "Erro ao rodar comando, o servidor está online?",
            error: e,
        });
    }
    return res.status(200).send({ message: cmd });
};

/**
 * Retorna as últimas linhas do log do servidor especificado
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getLogs = (req, res) => {
    const serverId = req.params.serverId;
    const linhas = req.query.linhas > 0 ? req.query.linhas : 1048576;

    if (!serverId)
        return res.status(400).send({ message: "serverId é obrigatório" });

    if (
        !arquivoExiste(
            `${process.env.SERVERS_DIRECTORY}/${serverId}/logs/painel.log`
        )
    )
        escreverArquivo(
            `${process.env.SERVERS_DIRECTORY}/${serverId}/logs/painel.log`,
            "",
            false
        );

    lerArquivo(
        `${process.env.SERVERS_DIRECTORY}/${serverId}/logs/painel.log`,
        (err, data) => {
            const msg =
                data?.split("\n").slice(-linhas).join("\n") +
                (isOnline(serverId) ? "" : "❗ Servidor offline");

            if (!err)
                return res.send({
                    message: data ? msg : "Nenhum log encontrado\n" + msg,
                    timestamp: new Date().getTime(),
                });
            else
                return res.status(200).send({
                    message: "[STDERR] Houve um erro ao carregar logs",
                    error: err,
                    timestamp: new Date().getTime(),
                });
        }
    );
};

exports.getInfoJarFile = async (req, res) => {
    const id = req.params.id;

    if (!id) return res.status(400).send({ message: "id é obrigatório" });

    arquivos_jar_db.findByPk(id).then((jarFile) => {
        res.status(200).json(jarFile);
    });
};

exports.getInfoJarFiles = async (_req, res) => {
    arquivos_jar_db.findAll().then((jarFiles) => {
        res.status(200).json(jarFiles);
    });
};

/**
 * Edita os dados de inicialização de um servidor
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.editarInicializacao = async (req, res) => {
    if (!req.params.id)
        return res.status(400).send({
            message: "Nenhum id de servidor foi enviado!",
        });

    let servidor = await servidores_usuarios_db.findOne({
        where: {
            id_servidor: req.params.id,
            id_usuario: req._decodedToken.id,
        },
        include: {
            model: servidores_db,
            as: "servidores",
        },
    });
    servidor = servidor?.dataValues?.servidores?.dataValues;
    if (!servidor)
        return res.status(400).send({
            message: "Nenhum servidor foi encontrado!",
        });
    const { nome, porta, args, id_arquivo_jar } = req.body;
    servidor = {
        nome: nome != null ? nome : servidor.nome,
        porta: porta != null ? porta : servidor.porta,
        args: args != null ? args : servidor.args,
        id_arquivo_jar:
            id_arquivo_jar != null ? id_arquivo_jar : servidor.id_arquivo_jar,
    };

    const servidorAtualizado = await servidores_db.update(servidor, {
        where: {
            id: req.params.id,
        },
    });

    return res.status(200).send(servidorAtualizado);
};

/**
 * Verifica se o servidor especificado está rodando
 * @param {string} serverId
 * @returns {boolean}
 */
const isOnline = (serverId) => {
    return (
        instanciasServidores[serverId] &&
        instanciasServidores[serverId].exitCode == null
    );
};
