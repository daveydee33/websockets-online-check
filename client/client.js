// const url = "ws://localhost:5000";
var url = location.origin.replace(/^http/, "ws");
const connection = new WebSocket(url);

connection.onopen = () => {
  const sendRequest = () => {
    connection.send(
      JSON.stringify({
        clientTime: Date.now(),
      })
    );
  };

  setInterval(sendRequest, 1000);
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (e) => {
  const { clientTime, serverTime } = JSON.parse(e.data);
  const now = Date.now();
  const clientToServer = serverTime - clientTime;
  const serverToClient = now - serverTime;
  const totalRoundTrip = now - clientTime;

  document.querySelector(".clientToServer").innerHTML = clientToServer;
  document.querySelector(".serverToClient").innerHTML = serverToClient;
  document.querySelector(".totalRoundTrip").innerHTML = totalRoundTrip;
  console.log(
    `Total RT: ${totalRoundTrip}, Client-to-Server: ${clientToServer}, Server-to-Client: ${serverToClient}.`
  );
};
