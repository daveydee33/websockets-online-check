const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws, req) => {
  const ip1 = req.socket.remoteAddress;
  const ip2 = (req.headers["x-forwarded-for"] || "").split(/\s*,\s*/)[0]; // if behind a reverse proxy like NGINX
  console.log(`IPs:  -->${ip1}<-- -->${ip2}<--`);

  ws.on("open", () => {
    console.log("connected");
    // ws.send(Date.now());
  });

  ws.on("close", () => {
    console.log("disconnected");
  });

  ws.on("message", (message) => {
    const { clientTime } = JSON.parse(message);
    console.log(`Time To Server: ${Date.now() - clientTime} ms`);

    ws.send(
      JSON.stringify({
        clientTime,
        serverTime: Date.now(),
      })
    );
  });
});
