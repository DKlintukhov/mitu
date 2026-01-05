import WebSocket, { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

const pairs = [
    "btcusdt",
    "ethusdt",
    "ltcusdt",
    "bnbusdt",
    "xrpusdt",
    "adausdt",
    "dogeusdt",
    "solusdt",
];

const streams = pairs.map((s) => `${s}@ticker`).join('/');
const binanceUrl =`wss://stream.binance.com:9443/stream?streams=${streams}`;

const binanceSocket = new WebSocket(binanceUrl);

binanceSocket.onmessage = (event) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(event.data);
        }
    });
};

binanceSocket.onclose = () => {
    console.log("Соединение с биржей закрыто");
};

binanceSocket.onerror = (err) => {
    console.error(err);
};

console.log(`WebSocket сервер запущен на порту ${PORT}`);

wss.on("connection", () => {
    console.log("новый клиент подключился");

    wss.on("close", () => {
        console.log("клиент отключился");
    });
});
