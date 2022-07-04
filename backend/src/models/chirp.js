import mongoose from "mongoose";

const chirpSchema = new mongoose.Schema({
  text: String,
  createdDate: { type: Date, default: Date.now },
  tweetId: String,
  isReply: Boolean,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

export const chirp = mongoose.model("chirp", chirpSchema);
