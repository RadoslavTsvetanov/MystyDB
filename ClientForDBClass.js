const net = require("net");

class Client {
  constructor(port, host) {
    this.port = port;
    this.host = host;
    this.client = new net.Socket();
    this.requests = {
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
  }
  connect() {
    this.client.connect(this.port, this.host, () => {
      console.log(`Connected to ${this.host}:${this.port}`);
    });

    this.client.on("data", (data) => {
      console.log(`Received data from server: ${data}`);
    });

    this.client.on("close", () => {
      console.log("Connection closed");
    });
  }

  sendData(data) {
    this.client.write(JSON.stringify(data));
  }

  create_db() {
    const REQUEST = {
      REQUEST: this.requests.CREATE_DB,
    };
    this.sendData(REQUEST);
  }

  delete_db() {
    const REQUEST = {
      REQUEST: this.requests.DROP_DB,
    };
    // drysty
    this.sendData(REQUEST);
  }

  get_whole_collection(data) {
    const REQUEST = {
      REQUEST: this.requests.GET_ALL_FROM_COLLECTION,
      COLLECTION_NAME: `${data.collection_name}.json`,
    };
    this.sendData(REQUEST);
  }

  create_collection(data) {
    const REQUEST = {
      REQUEST: this.requests.CREATE_COLLECTION,
      NAME: data.name,
    };
    this.sendData(REQUEST);
  }

  add_item_to_collection(data) {
    const REQUEST = {
      REQUEST: this.requests.ADD_ITEM_TO_COLLECTION,
      ITEM: data.item,
      COLLECTION_NAME: `${data.collection_name}.json`,
    };
    this.sendData(REQUEST);
  }

  get_from_collection(data) {
    const REQUEST = {
      REQUEST: this.requests.GET_FROM_COLLECTION,
      FILTER: data.filter,
      COLLECTION_NAME: `${data.collection_name}.json`,
      ONLY_FIRST: data.only_first,
    };

    this.sendData(REQUEST);
  }

  update_item_in_collection(data) {
    const REQUEST = {
      REQUEST: this.requests.UPDATE_ITEM_FROM_COLLECTION,
      FILTER: data.filter,
      NEW_ITEM: data.new_item,
      COLLECTION_NAME: `${data.collection_name}.json`,
      ONLY_FIRST: data.only_first,
    };
    this.sendData(REQUEST);
  }
  delete_from_collection(data) {
    const REQUEST = {
      REQUEST: this.requests.DELETE_FROM_COLLECTION,
      FILTER: data.filter,
      COLLECTION_NAME: `${data.collection_name}.json`,
      ONLY_FIRST: data.only_first,
    };
    this.sendData(REQUEST);
  }

  delete_collection(collectionName) {
    const REQUEST = {
      REQUEST: this.requests.DELETE_COLLECTION,
      COLLECTION_NAME: `${collectionName}.json`,
    };
    this.sendData(REQUEST);
  }

  closeConnection() {
    this.client.end();
  }
}

module.exports = {
  Client,
};
