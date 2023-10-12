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
  const db_client = new Client("8080", "127.0.0.1");
  db_client.connect();
  // db_client.create_collection({
  //   name: "test",
  // });
  db_client.add_item_to_collection({
    item: { name: "test" },
    collection_name: "test",
  });
  db_client.closeConnection();
}

main();
