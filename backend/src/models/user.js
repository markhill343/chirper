import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  mail: String,
  bio: String,
  location: String,
  profilImage: String,
  joinedDate: { type: Date, default: Date.now },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  chirps: [{ type: mongoose.Schema.Types.ObjectId, ref: "chirp" }],
});

export const user = mongoose.model("user", userSchema);
