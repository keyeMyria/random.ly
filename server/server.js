const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMsg } = require("./utils/message");
const { isRealString } = require("./utils/validation");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

io.on("connection", client => {
  console.log("New User Connected.");

  // client.emit("newMessage", generateMsg("ADMIN", "Welcome to the Chat room."));
  // client.broadcast.emit("newMessage", generateMsg("ADMIN", "<User> joined"));

  client.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback("Display Name or Room Name is not valid.");
    }
    client.join(params.room);
    // client.leave(params.room);

    // io.emit() -> io.to('room').emit();
    // client.broadcast.emit() -> client.broadcast.to('room').emit();
    // client.emit()

    client.emit(
      "newMessage",
      generateMsg("ADMIN", "Welcome to the Chat room.")
    );
    client.broadcast
      .in(params.room)
      .emit("newMessage", generateMsg("ADMIN", `${params.name} joined`));

    callback();
  });

  client.on("createMessage", (msg, callback) => {
    io.emit("newMessage", generateMsg(msg.from, msg.text));
    callback("Succesfull");
  });

  client.on("disconnect", () => {
    console.log("User Disconnected.");
  });
});
