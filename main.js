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
    ADD_ITEM_TO_COLLECTION: 8,
    DELETE_COLLECTION: 9,
  };
  let db = new DB("./db");
  const server = net.createServer((socket) => {
    function send_response(response) {
      socket.write(JSON.stringify(response));
    }
    // Handle incoming connections

    // Set encoding for text data (optional)
    socket.setEncoding("utf8");

    // Handle data received from clients
    socket.on("data", (data) => {
      const real_data = JSON.parse(data);
      console.log(`Received data: ${data}`);

      switch (real_data.REQUEST) {
        case Requests.CREATE_COLLECTION:
          db.create_collection(real_data.NAME);
          // Code to execute when expression matches value1
          break;

        case Requests.CREATE_DB:
          db.create_db("db");
          // Code to execute when expression matches value2
          break;

        // Additional cases...

        case Requests.DELETE_FROM_COLLECTION:
          db.delete_from_collection();
          break;

        case Requests.DROP_DB:
          db.drop_db();
          break;

        case Requests.GET_ALL_FROM_COLLECTION:
          let response1 = db.gett_all_items_from_db(real_data.COLLECTION_NAME);
          send_response(response1);
          break;

        case Requests.GET_FROM_COLLECTION:
          const response2 = db.get_from_db(
            real_data.FILTER,
            real_data.COLLECTION_NAME,
            real_data.ONLY_FIRST
          );
          send_response(response2);
          break;

        case Requests.UPDATE_ITEM_FROM_COLLECTION:
          db.update_item_from_db(
            real_data.FILTER,
            real_data.NEW_ITEM,
            real_data.COLLECTION_NAME,
            real_data.ONLY_FIRST
          );
          break;

        case Requests.DELETE_COLLECTION:
          db.delete_collection(real_data.COLLECTION_NAME);
          break;

        case Requests.ADD_ITEM_TO_COLLECTION:
          db.add_element_to_collection(
            real_data.ITEM,
            real_data.COLLECTION_NAME
          );
          break;

        default:
          console.log("IMVALID REQUEST TYPE");
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
