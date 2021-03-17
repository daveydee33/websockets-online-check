const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws, req) => {
  const ip1 = req.socket.remoteAddress;
  const ip2 = (req.headers["x-forwarded-for"] || "").split(/\s*,\s*/)[0]; // if behind a reverse proxy like NGINX
  console.log(`IPs:  -->${ip1}<-- -->${ip2}<--`);

  ws.on("open", () => {
    console.log("connected");
    ws.send(Date.now());
  });

  ws.on("close", () => {
    console.log("disconnected");
  });

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    console.log(`Roundtrip time: ${Date.now() - message} ms`);

    ws.send(Date.now());
  });

  ws.send("Response 😎");
});
