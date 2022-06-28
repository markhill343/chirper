const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  mail: String,
  bio: String,
  location: String,
  profilImage: String,
  joinedDate: { type: Date, default: Date.now },
  following: [{ type: Schema.Types.ObjectId, ref: "user" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "user" }],
  chrips: [{ type: Schema.Types.ObjectId, ref: "chirp" }],
});

const user1 = mongoose.model("user", userSchema);

module.exports = user;
