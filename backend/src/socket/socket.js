const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Map of userId -> socketId
const userSocketMap = {}; // Stores { userId: { socketId: string, status: string } }

const getOnlineUsers = () => {
  const onlineUsers = {};
  for (const userId in userSocketMap) {
  onlineUsers[userId] = userSocketMap[userId].status;
  }
  return onlineUsers;
};

const getRecieverSocketId = (recieverId) => {
  const user = userSocketMap[recieverId];
  return user ? user.socketId : undefined;
};

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = { socketId: socket.id, status: "online" };
    console.log(`User ${userId} mapped to socket ${socket.id} with status online`);
  }

  io.emit("getOnlineUser", getOnlineUsers());

  if (userId) {
    socket.join(userId);
  }

  socket.on("typing", (data) => {
    console.log(`User ${data.userId} is typing in chat ${data.chatId}`);
    socket.to(data.chatId).emit("userTyping", {
      chatId: data.chatId,
      userId: data.userId,
    });
  });

  socket.on("stopTyping", (data) => {
    console.log(`User ${data.userId} stopped typing in chat ${data.chatId}`);
    socket.to(data.chatId).emit("userStoppedTyping", {
      chatId: data.chatId,
      userId: data.userId,
    });
  });

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${userId} joined chat room ${chatId}`);
  });

  socket.on("leaveChat", (chatId) => {
    socket.leave(chatId);
    console.log(`User ${userId} left chat room ${chatId}`);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);

    if (userId) {
      userSocketMap[userId].status = "offline";
      console.log(`User ${userId} status updated to offline`);

      // Remove user from map after a delay (e.g., 5 minutes) to allow for re-connection
      // and to truly mark them offline if they don't re-connect
      setTimeout(() => {
        if (userSocketMap[userId] && userSocketMap[userId].status === "offline") {
          delete userSocketMap[userId];
          console.log(`User ${userId} removed from online users after timeout`);
          io.emit("getOnlineUser", getOnlineUsers());
        }
      }, 300000); // 5 minutes

      io.emit("getOnlineUser", getOnlineUsers());
    }
  });

  socket.on("setUserStatus", ({ userId, status }) => {
    if (userSocketMap[userId]) {
      userSocketMap[userId].status = status;
      console.log(`User ${userId} status set to ${status}`);
      io.emit("userStatusChanged", { userId, status });
    }
  });

  socket.on("connect_error", (error) => {
    console.log("Socket connection Error", error);
  });
});

// Export for CommonJS consumers
module.exports = {
  app,
  server,
  io,
  getRecieverSocketId,
  userSocketMap,
};
