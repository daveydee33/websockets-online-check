const WebSockets = require("ws");
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8080;
const INDEX = "client/index.htm";

const server = express()
  .use(express.static(path.join(__dirname, "client")))
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new WebSockets.Server({ server });

wss.on("connection", (ws, req) => {
  const ip1 = req.socket.remoteAddress;
  const ip2 = (req.headers["x-forwarded-for"] || "").split(/\s*,\s*/)[0]; // if behind a reverse proxy like NGINX
  console.log(`|${ip1}|${ip2}|Connected`);

  ws.on("open", () => {
    console.log("opened"); // isn't logging?  #TODO
  });

  ws.on("close", () => {
    console.log(`|${ip1}|${ip2}|Disconnected`);
  });

  ws.on("message", (message) => {
    const { clientTime } = JSON.parse(message);
    console.log(`|${ip1}|${ip2}|Time To Server: ${Date.now() - clientTime} ms`);

    ws.send(
      JSON.stringify({
        clientTime,
        serverTime: Date.now(),
      })
    );
  });
});
