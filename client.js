const net = require("net");
const { Client } = require("./ClientForDBClass");
function main() {
  const client = new net.Socket();

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
  // // });
  // db_client.add_item_to_collection({
  //   item: { name: "test" },
  //   collection_name: "test",
  // });
  // db_client.get_whole_collection({
  //   filter: {
  //     name: "test",
  //   },
  //   collection_name: "test",
  //   only_first: true,
  // });
  // db_client.get_from_collection({
  //   filter: { name: "test" },
  //   collection_name: "test",
  //   only_first: true,
  // });

  // db_client.update_item_in_collection({
  //   filter: { name: "hi3" },
  //   collection_name: "test",
  //   new_item: { name: "hi5" },
  //   only_first: true,
  // });
  db_client.closeConnection();
}

main();
