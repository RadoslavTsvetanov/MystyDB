const { DB } = require("./dbfunctions");
const net = require("net");
function main() {
  const Requests = {
    CREATE_DB: 1,
    CREATE_COLLECTION: 2,
    GET_ALL_FROM_COLLECTION: 3,
    GET_FROM_COLLECTION: 4,
    DELETE_FROM_COLLECTION: 5,
    DROP_DB: 6,
    UPDATE_ITEM_FROM_COLLECTION: 7,
  };
  let db = new DB("./db");
  const server = net.createServer((socket) => {
    // Handle incoming connections

    // Set encoding for text data (optional)
    socket.setEncoding("utf8");

    // Handle data received from clients
    socket.on("data", (data) => {
      const real_data = JSON.parse(data);
      console.log(`Received data: ${data}`);

      switch (real_data.REQUEST) {
        case Requests.CREATE_COLLECTION:
          // Code to execute when expression matches value1
          break;

        case Requests.CREATE_DB:
          db.create_db("db");
          // Code to execute when expression matches value2
          break;

        // Additional cases...

        default:
        // Code to execute when expression doesn't match any case
      }

      // Respond to the client
      socket.write("Server: Data received.");
    });

    // Handle client disconnect
    socket.on("end", () => {
      console.log("Client disconnected");
    });
  });

  const port = 8080;
  const host = "127.0.0.1";
  server.listen(port, host, () => {
    console.log(`Server is listening on ${host}:${port}`);
  });
}

main();
