const chirpSchema = new Schema({
  text: String,
  createdDate: { type: Date, default: Date.now },
  tweetId: String,
  isReply: Boolean,
  author: { type: Schema.Types.ObjectId, ref: "user" },
});

const chirp1 = mongoose.model("chirp", chirpSchema);

module.exports = chirp;
