const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
const websocket = require("./websocket");

let server;
let websocketServer;
let credentials;
const usarHttps = process.env.USAR_HTTPS === "true";

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
app.use(
    rateLimit({
        maxHeadersSize: 1024,
        message:
            "Seja bem-vindo ao sistema de prevenção de requisições maliciosas.",
        windowMs: 1000,
        max: 12,
    })
);
app.use(helmet());

if (usarHttps) {
    const privateKey = fs
        .readFileSync(`${process.env.KEYS_DIR}/privkey.pem`)
        .toString();
    const certificate = fs
        .readFileSync(`${process.env.KEYS_DIR}/cert.pem`)
        .toString();
    credentials = { key: privateKey, cert: certificate };
    server = https.createServer(credentials, app);
    websocketServer = https.createServer(credentials, app);
} else {
    server = http.createServer(app);
    websocketServer = http.createServer(app);
}

server.listen(process.env.API_PORT, () => {
    console.warn(
        `✅ API online na porta ${process.env.API_PORT}/${
            usarHttps ? "https" : "http"
        }`
    );
});

websocketServer.listen(process.env.WS_PORT, () => {
    console.warn(
        `✅ Web Socket online na porta ${process.env.WS_PORT}/${
            usarHttps ? "wss" : "ws"
        }`
    );
});

websocket.initWebsockets(websocketServer);

require("./models");
require("./routes")(app);
