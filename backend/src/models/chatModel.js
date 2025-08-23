const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(
  {
    users: [{ type: String, required: true }],
    latestMessage: {
      text: String,
      sender: String,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', schema);

module.exports = Chat;
