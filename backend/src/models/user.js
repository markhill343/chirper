import mongoose from "mongoose";
const Schema = mongoose.Schema.Types;

//Create Schema
export const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  mail: String,
  website: String,
  bio: String,
  location: String,
  profilImage: String,
  bannerImage: String,
  joinedDate: { type: Date, default: Date.now },
  following: [{ type: Schema.ObjectId, ref: "user" }],
  followers: [{ type: Schema.ObjectId, ref: "user" }],
  chirps: [{ type: Schema.ObjectId, ref: "chirp" }],
});

//Compile model from schema
export const user = mongoose.model("user", userSchema);
