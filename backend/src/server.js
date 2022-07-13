/**
 * @author Markus Hillreiner <markus.hillreiner@hs-augsburg.de>
 * @copyright 2022
 * @license MIT
 */

//Set constants for the application
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

//to do create the models
import { user } from "./models/user.js";
import { chirp } from "./models/chirp.js";

const PORT = 8080,
  SERVER = `localhost:${PORT}`,
  app = express();

// Connecting to the database
console.log("Connecting to ChirperDB...");
mongoose.connect("mongodb://127.0.0.1:27017/chirper", {
  authSource: "admin",
  useNewUrlParser: true,
  user: "admin",
  pass: "markistdoof",
});

//get errors on the console
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to ChirperDB");
});

// Define cors and body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Test function
app.get("/", function (req, res) {
  res.send("hello, world!");
});

//login function
app.post("/login", (req, res) => {
  console.log("login request");
  try {
    user.findOne({ username: req.body.Username._value }, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      } else if (!user) {
        console.log("User not found");
        res.status(404).send("User not found");
      } else {
        if (user.password === req.body.Password._value) {
          console.log("User found");
          res.send(user);
          console.log(`found user: ${user}`);
        } else {
          console.log("Wrong password");
          res.status(401).send("Wrong password");
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

//register function
app.post("/register", async (req, res) => {
  console.log("register request");
  console.log(req.body.Name._value);

  const newUser = new user({
    name: req.body.Name._value,
    username: req.body.Username._value,
    password: req.body.Password._value,
    mail: req.body.Email._value,
    bio: "Generic Bio",
  });
  newUser.save(function (err) {
    if (err) return console.error(err);
  });
  res.send(newUser);
});

app.post("/getuserwithoutdetail", (req, res) => {
  console.log(req.body);
  user.findOne({ username: req.body.username }, (err, user) => {
    if (err) throw err;

    res.send(user);
  });
});

app.post("/getuserwithdetails", (req, res) => {
  console.log("Retrieving user details for " + req.body.username);
  user
    .findOne({ username: req.body.username })
    .populate({
      path: "chirps",
      options: {
        sort: { createdDate: -1 },
      },
      populate: [
        {
          path: "author",
          model: "user",
        },
        {
          path: "parent",
          model: "chirp",
          populate: {
            path: "author",
            model: "user",
          },
        },
      ],
    })
    .exec()
    .then((user) => {
      res.send(user);
      console.log("Found user details for " + req.body.username);
    });
});

app.post("/getthechirp", (req, res) => {
  chirp
    .findOne({ _id: req.body.chirpId })
    .populate("author")
    .populate({
      path: "replies",
      populate: [
        {
          path: "author",
          model: "user",
        },
        {
          path: "parent",
          model: "chirp",
          populate: {
            path: "author",
            model: "user",
          },
        },
      ],
    })
    .populate({
      path: "parent",
      populate: {
        path: "author",
        model: "user",
      },
    })
    .exec((err, chirp) => {
      if (err) throw err;

      console.log(chirp);
      res.send(chirp);
    });
});

app.post("/updateUser", (req, res) => {
  console.log(req.body);
  user.update(
    { _id: req.body.userId },
    { $set: req.body.newInfos },
    (err, result) => {
      if (err) throw err;

      console.log(result);

      res.send(result);
    }
  );
});

//get users
app.post("/users", (req, res) => {
  console.log("get users request");
  console.log(req.body);
  user.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.send(user);
  });
});

//new chirp
app.post("/newchirp", async (req, res) => {
  await chirp
    .create(req.body.cirpContent)
    .then(async (newChirp) => {
      await user.findOne(
        { username: req.body.username },
        async (err, currentUser) => {
          if (err) {
            console.log(err);
          }
          await currentUser.chirps.push(newChirp._id);
          await currentUser.save();
          await chirp
            .findOne({ _id: newChirp._id })
            .populate("author")
            .exec(async (err, result) => {
              if (err) throw err;
              await console.log(result);
              await res.send(result);
            });
        }
      );
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/addreply", async (req, res) => {
  await chirp
    .create(req.body.chirpContent)
    .then(async (newChirp) => {
      chirp.findById(newChirp.parent).exec((err, t) => {
        if (err) throw err;

        t.replies.push(newChirp._id);
        t.save();
      });
      await user.findOne(
        { username: req.body.username },
        async (err, currentUser) => {
          if (err) {
            console.log(err);
          }

          await currentUser.chirp.push(chirp._id);
          await currentUser.save();

          await chirp
            .findOne({ _id: newChirp._id })
            .populate("author")
            .exec(async (err, result) => {
              if (err) throw err;
              await console.log(result);
              await res.send(result);
            });
        }
      );
    })
    .catch((e) => {
      throw e;
    });
});

app.post("/api/getChirpPage", (req, res) => {
  // res.send('succes')
  const page = Number(req.body.page);
  const s = (page - 1) * Number(req.body.chirpPerPage);
  const l = Number(req.body.chirpPerPage);
  chirp
    .find({})
    // .skip(s)
    // .limit(l)
    .sort({ createdDate: -1 })
    .populate({
      path: "author",
    })
    .exec((err, chirps) => {
      if (err) throw err;

      console.log(chirps);
      res.send(chirps);
      console.log(s, l);
      console.log(req.body);
    });
});

app.post("/followorunfollow", (req, res) => {
  const currentUserId = req.body.currentUserId;
  const userIdToFollow = req.body.userIdToFollow;
  const follow = req.body.follow;

  console.log(currentUserId, userIdToFollow, follow);

  user.findById(currentUserId).exec((error, currentUser) => {
    if (error) {
      console.log(error);
    }

    console.log(`current user : ${currentUser}`);
    if (follow) {
      currentUser.following.push(userIdToFollow);
      currentUser.save();
    } else {
      currentUser.following.splice(
        currentUser.following.indexOf(userIdToFollow),
        1
      );
      currentUser.save();
    }
    user.findById(userIdToFollow).exec((error, userToFollow) => {
      if (error) {
        console.log(error);
      }

      console.log(`user to follow: ${userToFollow}`);

      if (follow) {
        userToFollow.followers.push(currentUserId);
        userToFollow.save();
      } else {
        userToFollow.followers.splice(
          userToFollow.followers.indexOf(currentUserId),
          1
        );
        userToFollow.save();
      }
    });
  });

  res.send("success");
});

app.post("/removeChirp", async (req, res) => {
  const chirpId = req.body.chirpId;

  await chirp.findById(chirpId, (err, t) => {
    if (t.isReply) {
      chirp.findById(t.parent, async (err, parentChirp) => {
        await parentChirp.replies.splice(
          parentChirp.replies.indexOf(chirpId),
          1
        );
        parentChirp.save();
      });
    }
  });

  chirp.findOneAndDelete({ _id: chirpId }, (err, removed) => {
    if (err) throw err;

    console.log(`document have been removed: ${removed}`);
  });
});

app.post("/likeorunlike", (req, res) => {
  const currentUserId = req.body.currentUserId;
  const chirpId = req.body.chirpId;
  const like = req.body.like;
  user.findById(currentUserId, (err, currentUser) => {
    if (err) {
      console.log(err);
    }

    if (like) {
      currentUser.likedchirp.push(chirpId);
      currentUser.save();
    } else {
      currentUser.likedChirps.splice(
        currentUser.likedChirps.indexOf(chirpId),
        1
      );
      currentUser.save();
    }

    chirp.findById(chirpId, (err, chirp) => {
      if (err) {
        console.log(err);
      }

      if (like) {
        chirp.likedUsers.push(currentUserId);
        chirp.save();
      } else {
        chirp.likedUsers.splice(chirp.likedUsers.indexOf(currentUserId), 1);
        chirp.save();
      }
    });
  });
});

app.post("/getbookmarks", (req, res) => {
  user
    .findOne({ username: req.body.username })
    .populate({
      path: "bookmarks",
      populate: [
        {
          path: "author",
          model: "user",
        },
        {
          path: "parent",
          model: "chirp",
          populate: {
            path: "author",
            model: "user",
          },
        },
      ],
    })
    .exec((err, u) => {
      if (err) throw err;
      res.send(u.bookmarks);
    });
});

app.listen(PORT);
console.log(`Running on ${SERVER}`);
