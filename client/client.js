const url = "ws://localhost:8080";
const connection = new WebSocket(url);

connection.onopen = () => {
  connection.send(
    JSON.stringify({
      clientTime: Date.now(),
    })
  );
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (e) => {
  const { clientTime, serverTime } = JSON.parse(e.data);
  const now = Date.now();
  console.log(`Time Client-to-Server: ${serverTime - clientTime} ms`);
  console.log(`Time Server-to-Client: ${now - serverTime} ms`);
  console.log(`Total Roundtrip Time: ${now - clientTime}`);
};
