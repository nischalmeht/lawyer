const Chat = require("../models/chatModel");
const Messages = require("../models/messageModel");
const { io } = require("../socket/socket");

class ChatController {
  static sendMessage = TryCatch(async (req, res) => {
    const senderId = req.user ? req.user._id : null;
    const { chatId, text } = req.body;
    const imageFile = req.file;

    if (!senderId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    if (!chatId) {
      return res.status(400).json({ message: "ChatId Required" });
    }
    if (!text && !imageFile) {
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

    if (imageFile) {
      messageData.image = {
        url: imageFile.path,
        publicId: imageFile.filename,
      };
      messageData.messageType = "image";
      messageData.text = text || "";
    } else {
      messageData.text = text;
      messageData.messageType = "text";
    }

    const message = new Messages(messageData);
    const savedMessage = await message.save();

    const latestMessageText = imageFile ? "📷 Image" : text;

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

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", savedMessage);
    }

    const senderSocketId = getRecieverSocketId(senderId.toString());
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", savedMessage);
    }

    if (isReceiverInChatRoom && senderSocketId) {
      io.to(senderSocketId).emit("messagesSeen", {
        chatId,
        seenBy: otherUserId,
        messageIds: [savedMessage._id],
      });
    }

    res.status(201).json({
      message: savedMessage,
      sender: senderId,
    });
  });
  static getAllChats = TryCatch(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
      res.status(400).json({
        message: " UserId missing",
      });
      return;
    }
  })

}

module.exports = ChatController;