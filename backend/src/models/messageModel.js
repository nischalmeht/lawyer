const mongoose = require('mongoose');
const { Schema } = mongoose;

// Message schema (CommonJS)
const schema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: String,
  required: true,
    },
    text: String,
    image: {
      url: String,
      publicId: String,
    },
    messageType: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    seenAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const Messages = mongoose.model('Messages', schema);

module.exports = Messages;
