class Client {
  constructor(port, host) {
    this.port = port;
    this.host = host;
    this.client = new net.Socket();
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
    this.client.write(data);
  }

  sendRequest1() {
    this.sendData("Request 1 data");
  }

  sendRequest2() {
    this.sendData("Request 2 data");
  }

  closeConnection() {
    this.client.end();
  }
}

module.exports = {
  Client,
};
