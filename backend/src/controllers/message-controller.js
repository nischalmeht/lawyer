const TryCatch = require("../utils/TryCatch");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class MessageController {
  static sendMessage = TryCatch(async (req, res, next) => {
    const { text, chatId } = req.body;
    const sender = req.user._id;
    let image = null;

    if (!chatId || (!text && !req.file)) {
      return res.status(400).json({
        success: false,
        message: "Chat ID and either text or image are required",
      });
    }

    // if (req.file) {
    //   const result = await cloudinary.uploader.upload(req.file.path);
    //   image = {
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //   };
    // }

    const newMessage = await Message.create({
      chat: chatId,
      sender,
      text,
      image,
    });

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        latestMessage: newMessage,
      },
      { new: true }
    );

    io.to(chatId).emit("newMessage", newMessage);
    chat.members.forEach((member) => {
      if (member.toString() !== sender.toString()) {
        const receiverSocketId = getReceiverSocketId(member.toString());
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("messageReceived", {
            ...newMessage._doc,
            chat: chat._doc, // Send full chat object for updating sidebar
          });
        }
      }
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });
  });
}

module.exports = MessageController;
