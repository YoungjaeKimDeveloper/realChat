import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// io는 서버 자체를 의미하기때문에
io.on("connection", (socket) => {
  // socket -> socket을 받는 client를 의미함
  console.log(`Socket has been connectted ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Client disconnected ${socket.id}`);
  });
});

export { io, app, server };
