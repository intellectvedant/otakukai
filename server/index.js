import express from "express";
import connection from "./database/db.js";
import dotenv from "dotenv";
import customRouter from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { Server } from "socket.io";
import http from "http";
import message from "./model/message.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: [
      "cce456a77fa9107e16797246ebf74d591c638a5463a6918475cb31e7979313c8a45346349af824773bf159266b965d84c17139ecbd27e3ed61f893a6cfebe933",
    ], // Change this to a secret key
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// routes
app.use("/", customRouter);

// Database Connection
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
connection(USERNAME, PASSWORD);

// http server
const server = http.createServer(app);

// Server
const PORT = 8000;
server.listen(PORT, () =>
  console.log(`Server is running successfully on port ${PORT}`)
);

// socket.io
const io = new Server(server, {
  path: "/socket.io",
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("login", (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  socket.on("message", (message) => {
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  const recipientSocketid = onlineUsers[message.receiver];
  if (recipientSocketid) {
    io.to(recipientSocketid).emit("notification", {
      message: "New message received!",
    });
  }

  socket.on("disconnect", () => {
    const userId = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );
    delete onlineUsers[userId];
    io.emit("onlineUsers", Object.keys(onlineUsers));
    console.log("User disconnected");
  });
});
