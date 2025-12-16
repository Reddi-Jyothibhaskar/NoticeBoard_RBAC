const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});

module.exports = mongoose.model("Notice", noticeSchema);