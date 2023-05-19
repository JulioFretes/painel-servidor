const { websockets: websockets_db } = require("./models");
const { Server } = require("socket.io");

let io;

function initWebsockets(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.WEBSITE_URL,
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        try {
            let req = socket.handshake.query;
            if (!req.userId) return socket.disconnect();

            websockets_db
                .destroy({
                    where: {
                        usuario: req.userId,
                        rota: req.rota || null,
                    },
                })
                .then(() => {
                    websockets_db.create({
                        id_socket: socket.id,
                        usuario: req.userId,
                        rota: req.rota || null,
                    });
                });
        } catch (e) {
            console.error("Erro na conexao com websocket: ", e);
        }

        socket.on("disconnect", () => {
            try {
                websockets_db.destroy({
                    where: {
                        id_socket: socket.id,
                    },
                });
            } catch (e) {
                console.error("Erro na desconexao com websocket: ", e);
            }
        });
    });
}

const enviarLogs = ({ message, serverId }) => {
    emitirEvento({
        timestamp: new Date().getTime(),
        evento: "newLog",
        rota: `logs_${serverId}`,
        message,
    });
};

const enviarErro = ({ message, serverId }) => {
    emitirEvento({
        timestamp: new Date().getTime(),
        evento: "newError",
        rota: `logs_${serverId}`,
        message,
    });
};

const emitirEvento = ({ timestamp, evento, rota, message }) => {
    try {
        websockets_db
            .findAll({
                where: {
                    rota,
                },
            })
            .then((results) => {
                const sockets = JSON.stringify(results, null, 2);
                JSON.parse(sockets).forEach((socket) => {
                    io.to(socket.id_socket).emit(evento, {
                        timestamp,
                        message,
                    });
                });
            });
    } catch (e) {
        console.error("Erro ao emitir evento websocket: ", e);
    }
};

module.exports = {
    initWebsockets,
    enviarLogs,
    enviarErro,
};
