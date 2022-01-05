const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;

app.use(express.static("public"));

io.on("connection", socket => {
  socket.join("room1");
  const joinedUsers = io.sockets.adapter.rooms.get("room1");
  if (joinedUsers.size > 1) {
    socket.emit("ada user lain", [...joinedUsers]);
  }

  socket.on("offer", ({ offer, to: targetId, from }) => {
    io.to(targetId).emit("offer", { offer, from });
  });

  socket.on("answer", ({ answer, to: targetId, from }) => {
    io.to(targetId).emit("answer", { answer, from });
  });
  
  socket.on("ice candidate", ({ iceCandidate, to: targetId }) => {
    io.to(targetId).emit("ice candidate", iceCandidate );
  });
  
});

server.listen(PORT);