const axios = require("axios");
const Chat = require("../models/chatModel");
const Messages = require("../models/messageModel");
const { io, getRecieverSocketId } = require("../socket/socket");
const TryCatch = require("../utils/TryCatch");

class ChatController {
  static sendMessage = TryCatch(async (req, res) => {
    const senderId = req.user ? req.user._id : null;    
    const { chatId, text, image } = req.body;
    // const imageFile = req.file;

    if (!senderId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    if (!chatId) {
      return res.status(400).json({ message: "ChatId Required" });
    }
    if (!text && !image) {
      return res.status(400).json({ message: "Either text or image is required" });
    }
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const isUserInChat = chat.users.some(
      (userId) => userId.toString() === senderId.toString()
    );
    if (!isUserInChat) {
      return res.status(403).json({ message: "You are not a participant of this chat" });
    }

    const otherUserId = chat.users.find(
      (userId) => userId.toString() !== senderId.toString()
    );
    if (!otherUserId) {
      return res.status(401).json({ message: "No other user" });
    }

    // socket setup
    const receiverSocketId = getRecieverSocketId(otherUserId.toString());
    let isReceiverInChatRoom = false;

    if (receiverSocketId) {
      const receiverSocket = io.sockets.sockets.get(receiverSocketId);
      if (receiverSocket && receiverSocket.rooms.has(chatId)) {
        isReceiverInChatRoom = true;
      }
    }

    let messageData = {
      chatId,
      sender: senderId,
      seen: isReceiverInChatRoom,
      seenAt: isReceiverInChatRoom ? new Date() : undefined,
    };

    if (image) {
      messageData.image = {
        url: image.url,
        publicId: image.publicId,
      };
      messageData.messageType = "image";
      messageData.text = text || "";
    } else {
      messageData.text = text;
      messageData.messageType = "text";
    }

    const message = new Messages(messageData);
    const savedMessage = await message.save();

    const latestMessageText = image ? "📷 Image" : text;

    await Chat.findByIdAndUpdate(
      chatId,
      {
        latestMessage: {
          text: latestMessageText,
          sender: senderId,
        },
        updatedAt: new Date(),
      },
      { new: true }
    );

    // emit to sockets
    io.to(chatId).emit("newMessage", savedMessage);

    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", savedMessage);
    // }

    // const senderSocketId = getRecieverSocketId(senderId.toString());
    // if (senderSocketId) {
    //   io.to(senderSocketId).emit("newMessage", savedMessage);
    // }
    // 
    // if (isReceiverInChatRoom && senderSocketId) {
    //   io.to(senderSocketId).emit("messagesSeen", {
    //     chatId,
    //     seenBy: otherUserId,
    //     messageIds: [savedMessage._id],
    //   });
    // }

    res.status(201).json({
      message: savedMessage,
      sender: senderId,
    });
  });
  static getAllChats = TryCatch(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
      res.status(400).json({
        message: " UserId missing",
      });
      return;
    }
  })
  static createNewChat = TryCatch(async (req, res) => {
      const userId = req.user._id;
      const { otherUserId } = req.body;
  
      if (!otherUserId) {
        res.status(400).json({
          message: "Other userid is required",
        });
        return;
      }
  
      const existingChat = await Chat.findOne({
        users: { $all: [userId, otherUserId], $size: 2 },
      });
  
      if (existingChat) {
        res.json({
          message: "Chat already exitst",
          chatId: existingChat._id,
        });
        return;
      }
  
      const newChat = await Chat.create({
        users: [userId, otherUserId],
      });
  
      res.status(201).json({
        message: "New Chat created",
        chatId: newChat._id,
      });
    }
  );

  static async _getMessagesByChatLogic(userId, chatId) {
    if (!userId) {
      return { status: 401, message: "Unauthorized" };
    }

    if (!chatId) {
      return { status: 400, message: "ChatId Required" };
    }

    const chat = await Chat.findById(chatId);
  
    if (!chat) {
      return { status: 404, message: "Chat not found" };
    }

    const isUserInChat = chat.users.some(
      (id) => id.toString() === userId.toString()
    );

    if (!isUserInChat) {
      return { status: 403, message: "You are not a participant of this chat" };
    }

    const messagesToMarkSeen = await Messages.find({
      chatId: chatId,
      sender: { $ne: userId },
      seen: false,
    });

    await Messages.updateMany(
      {
        chatId: chatId,
        sender: { $ne: userId },
        seen: false,
      },
      {
        seen: true,
        seenAt: new Date(),
      }
    );

    const messages = await Messages.find({ chatId }).sort({ createdAt: 1 });

    const otherUserId = chat.users.find((id) => id.toString() !== userId.toString());

    try {
      const { data } = await axios.get(
        `${process.env.USER_SERVICE}/api/users${otherUserId}`
      );

      return { status: 200, messages, user: data };
    } catch (error) {
      console.log(error);
      return { status: 200, messages, user: { _id: otherUserId, name: "Unknown User" } };
    }
  }

  static getMessagesByChat = TryCatch(
    async (req, res) => {
      const userId = req.user?._id;
      const { chatId } = req.params;

      const result = await ChatController._getMessagesByChatLogic(userId, chatId);

      if (result.status !== 200) {
        return res.status(result.status).json({ message: result.message });
      }

      res.json({
        messages: result.messages,
        user: result.user,
      });
    }
  );
}

module.exports = ChatController;