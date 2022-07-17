import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Create Schema
const chirpSchema = new mongoose.Schema({
  text: String,
  createdDate: { type: Date, default: Date.now },
  chirpId: String,
  isReply: Boolean,
  author: { type: Schema.Types.ObjectId, ref: "user" },
  likedUsers: [{ type: Schema.Types.ObjectId, ref: "user" }],
  replies: [{ type: Schema.Types.ObjectId, ref: "chirp" }],
  child: { type: Schema.Types.ObjectId, ref: "chirp" },
  parent: { type: Schema.Types.ObjectId, ref: "chirp" },
  rechirpers: [{ type: Schema.Types.ObjectId, ref: "chirp" }],
});

export const chirp = mongoose.model("chirp", chirpSchema);
