class Socket {
  constructor(io) {
    try {
      this.io = io;
      io.on("connection", socket => {
        this.sendConnectedNotice(socket);
        socket.on("disconnect", () => {});
      });
    } catch (err) {}
  }

  static getInstance(io) {
    if (!this.instance) {
      this.instance = new Socket(io);
    }
    return this.instance;
  }

  sendConnectedNotice(socket){
    try {
      socket.emit("connected-event", "socket connected");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  //send data { id, lat, lng, at } to clientt
  sendUpdateVehicle(data){
    try {
      this.io.emit("vehicle-update", data);
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };

}

module.exports = Socket;
