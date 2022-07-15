import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema,
  SALT_WORK_FACTOR = 10;

//Create Schema
const userSchema = new Schema({
  id: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  mail: { type: String, required: true },
  name: { type: String, required: true },
  website: String,
  bio: String,
  location: String,
  profilImage: String,
  bannerImage: String,
  joinedDate: { type: Date, default: Date.now },
  //following: [{ type: Schema, ref: "user" }],
  //followers: [{ type: Schema, ref: "user" }],
  //chirps: [{ type: Schema, ref: "chirp" }],
});


userSchema.pre("save", function (next) {
  const user = this;
  // only hash the password if it has been modified
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (
  candidatePassword: string | Buffer,
  password: string,
  cb: any,
) {
  bcrypt.compare(candidatePassword, password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


//Compile model from schema
export const user = mongoose.model("user", userSchema);
