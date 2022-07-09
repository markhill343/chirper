import mongoose from "mongoose";
const Schema = mongoose.Schema.Types;

//Create Schema
const chirpSchema = new mongoose.Schema({
  text: String,
  createdDate: { type: Date, default: Date.now },
  tweetId: String,
  isReply: Boolean,
  author: { type: Schema.ObjectId, ref: "user" },
  likedUsers: [{ type: Schema.ObjectId, ref: "user" }],
  replies: [{ type: Schema.ObjectId, ref: "chirp" }],
  child: { type: Schema.ObjectId, ref: "chirp" },
  parent: { type: Schema.ObjectId, ref: "chirp" },
  retweeters: [{ type: Schema.ObjectId, ref: "chirp" }],
});

export const chirp = mongoose.model("chirp", chirpSchema);
