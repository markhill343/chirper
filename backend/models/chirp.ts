//declare model chirp
export {};

const mongoose = require('mongoose');

const chirpSchema = new mongoose.Schema({
  text: String,
  createdDate: { type: Date, default: Date.now },
  tweetId: String,
  isReply: Boolean,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const chirp1 = mongoose.model("chirp", chirpSchema);

module.exports = chirp1;
