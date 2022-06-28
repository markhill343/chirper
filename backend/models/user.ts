//declare model user
export {};

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  chrips: [{ type: mongoose.Schema.Types.ObjectId, ref: "chirp" }],
});

const user1 = mongoose.model("user", userSchema);

module.exports = user1;
