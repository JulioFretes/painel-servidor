import { io } from "socket.io-client";

const WS_URL = import.meta.env.VITE_WS_URL;

const socket = io(WS_URL, { transports: ["websocket"], autoConnect: false });

const connect = (userId: string, rota: string | null) => {
    try {
        socket.io.opts.query = {
            userId,
            rota,
        };

        socket.connect();
    } catch (error) {
        console.error("Erro na conexão com cliente ws", error);
    }
};

function disconnect() {
    if (socket.connected) socket.disconnect();
}

function startServerLogListener(handler: Function) {
    socket.on("newLog", (message) => {
        handler(message);
    });
}

function stopServerLogListener(handler: Function) {
    socket.off("newLog", (message) => {
        handler(message);
    });
}

export { connect, disconnect, startServerLogListener, stopServerLogListener };
