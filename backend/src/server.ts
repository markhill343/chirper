/**
 * @author Markus Hillreiner <markus.hillreiner@hs-augsburg.de>
 * @copyright 2022
 * @license MIT
 */

//Set constants for the application
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

//to do create the models
import { user } from "./models/user";
import { chirp } from "./models/chirp";
import { randomUUID } from 'crypto';

//Define backend server
const PORT = 8080,
  SERVER = `localhost:${PORT}`,
  app = express();

// Connecting to the database
console.log("Connecting to ChirperDB...");
mongoose.connect("mongodb://127.0.0.1:27017/chirper", {
  authSource: "admin",
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
app.use('*', cors());

//Test function
app.get("/", function (req, res) {
  res.send("hello, world!");
});

//register function
app.post("/register", async (req, res) => {
  console.log("New registration request---------------------------------------");
  const newUser = new user({
    id: randomUUID(),
    username: req.body.Username._value,
    password: req.body.Password._value,
    mail: req.body.Email._value,
    name: req.body.Name._value,
    bio: "Generic Bio",
  });
  console.log("Registering user: " + newUser.username);
  newUser.save(function (err) {
    if (err) {
      res.status(500);
    }else{
      res.status(200);
      console.log("User registered" + newUser);
      const data = { Username: newUser.username, Name: newUser.name, Email: newUser.mail, Bio: newUser.bio, joinedDate: newUser.joinedDate };
      console.log("User registered" + data.Username);
      res.send(newUser);
      res.end();
    }
  });
});

//login function
app.post("/login", (req, res) => {
  console.log("login request");
    user.findOne({ username: req.body.Username._value }, (err, user ) => {
      
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      } else if (!user) {
        console.log("User not found");
        res.status(404).send("User not found");
      } else {
        user.comparePassword(req.body.Password._value, user.password, (err, isMatch) => {
        if (isMatch) {
          console.log("User found");
          res.send(user);
          console.log(`found user: ${user}`);
          res.end();
        } else {
          console.log("Wrong password");
          res.status(401).send("Wrong password");
        }
      });
      }
    });
});

//function for only getting the basic user data
app.post("/getuserwithoutdetail", (req, res) => {
  console.log(req.body);
  user.findOne({ username: req.body.username }, (err: any, user: any) => {
    if (err) throw err;
    res.send(user);
  });
});

//function for getting the user data with more details for the user profile
app.post("/getuserwithdetails", (req, res) => {
  console.log("Retrieving user details for " + req.body.username);
  user
    .findOne({ username: req.body.username }, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error');
      } else if (!user) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        res.status(200);
      }
    })
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

//get the chirp from database
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

//update username or user password
app.post("/updateUser", (req, res) => {
  user.findOne({ username: req.body.Username }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error');
    } else if (!user) {
      console.log('User not found');
      res.status(404).send('User not found');
    } else {
      res.status(200);
      console.log('User found' + user);
      user.password = req.body.Password;
      user.username = req.body.NewUsername;
      user.save();
      user.updateOne(
        { password: req.body.Password, username: req.body.newUsername },
        function (err, user) {
          if (err) {
            console.log(err);
            res.status(500).send('Error');
          } else {
            console.log('User updated');
            res.send(user.password);
          }
        }
      );
    }
  });
});


// create a new chirp
app.post("/newChirp", async (req, res) => {
  console.log("New chirp request---------------------------------------");
  const testUser = user.findOne({username: "peterlustig123"});
  const newChirp = new chirp({
    text: req.body.chirpContent.text,
    chirpId: randomUUID(),
    isReply: "false",
    bio: "Generic Bio",
  });

  console.log("Creating chirp: " + newChirp.text);
  newChirp.save();
  newChirp.save(function (err) {
      res.status(200);
      console.log("Chirp created" + newChirp);
      res.send(newChirp);
  
});
});

//add reply to a existing chirp
app.post("/addreply", async (req, res) => {
  await chirp
    .create(req.body.chirpContent)
    .then(async (newChirp) => {
      chirp.findById(newChirp.parent).exec((err, t) => {
        if (err) throw err;

        //t.replies.push(newChirp._id);
        t.save();
      });
      await user.findOne(
        { username: req.body.username },
        async (err: any, currentUser: { chirp: any[]; save: () => any; }) => {
          if (err) {
            console.log(err);
          }
          await currentUser.chirp.push(newChirp._id);
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

//follow or unfollow a user
app.post("/followorunfollow", (req, res) => {
  const currentUserId = req.body.currentUserId;
  const userIdToFollow = req.body.userIdToFollow;
  const follow = req.body.follow;

  user.findById(currentUserId).exec((error, currentUser) => {
    if (error) {
      console.log(error);
    }

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
  res.status(200).send("success");
});

//delete a chirp
app.post("/removeChirp", async (req) => {
  const chirpId = req.body.chirpId;

  await chirp.findById(chirpId, (err: any, t: { isReply: any; parent: any; }) => {
    if (t.isReply) {
      chirp.findById(t.parent, async (err: any, parentChirp: { replies: any[]; save: () => void; }) => {
        await parentChirp.replies.splice(
          parentChirp.replies.indexOf(chirpId),
          1
        );
        parentChirp.save();
      });
    }
  });
  chirp.findOneAndDelete({ _id: chirpId }, (err: any) => {
    if (err) throw err;
  });
});

//like or unlike a chirp
app.post("/likeorunlike", (req) => {
  const currentUserId = req.body.currentUserId;
  const chirpId = req.body.chirpId;
  const like = req.body.like;
  user.findById(currentUserId, (err: any, currentUser: { likedchirp: any[]; save: () => void; likedChirps: any[]; }) => {
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
    chirp.findById(chirpId, (err: any, chirp: { likedUsers: any[]; save: () => void; }) => {
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

//get bookmarks for user (chirps they bookedmarked)
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

//starting the server
app.listen(PORT);
console.log(`Running on ${SERVER}`);
