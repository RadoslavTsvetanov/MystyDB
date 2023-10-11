const net = require("net");
const { Client } = require("./ClientForDBClass");
function main() {
  const client = new net.Socket();
  const Requests = {
    CREATE_DB: 1,
    CREATE_COLLECTION: 2,
    GET_ALL_FROM_COLLECTION: 3,
    GET_FROM_COLLECTION: 4,
    DELETE_FROM_COLLECTION: 5,
    DROP_DB: 6,
    UPDATE_ITEM_FROM_COLLECTION: 7,
  };
  // Connect to the server
  const port = 8080;
  const host = "127.0.0.1";
  client.connect(port, host, () => {
    console.log(`Connected to ${host}:${port}`);
  });

  // Send data to the server
  const dataToSend = JSON.stringify({
    REQUEST: Requests.CREATE_DB,
  });
  client.write(dataToSend);
  const db_client = new Client("hi", client);
  // Handle data received from the server
  client.on("data", (data) => {
    console.log(`Received data from server: ${data}`);
  });

  // Handle the connection being closed
  client.on("close", () => {
    console.log("Connection closed");
  });
}

main();
