// Set constants for the application
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

//to do create the models
import { user } from "./models/user.js";
import { chirp } from "./models/chirp.js";

const PORT = 8080,
  SERVER = `localhost:${PORT}`,
  app = express();

app.use(morgan("combined"));
app.use(express.json());

console.log("Connecting to ChirperDB...");

// Connecting to the database
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

//Backend function start here

app.get("/", function (req, res) {
  res.send("hello, world!");
});

//login function
app.post("/login", (req, res) => {
  console.log("login request");
  console.log(req.body);
  user.findOne(
    {
      $and: [
        {
          $or: [
            { mail: req.body.usernameOrEmail },
            { username: req.body.usernameOrEmail },
          ],
        },
        { password: req.body.password },
      ],
    },
    (err, user) => {
      if (err) throw err;

      console.log(`found user: ${user}`);
      res.send({ foundUser: user });
    }
  );
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

  /*

  user.countDocuments({ username: req.body.Username._value }, (err, count) => {
    if (err) console.log(err);

    if (count === 0) {
      user
        .create({
          name: req.body.name_value,
          username: req.body.username_value,
          password: req.body.password_value,
        })
        .then((newUser) => {
          console.log(`newUser created: ${newUser}`);
          res.send(newUser);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      res.send(false);
    }
  });
  */
});

//get users
app.post("/api/users", (req, res) => {
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
app.post("/api/newchirp", async (req, res) => {
  await chirp
    .create(req.body.cirpContent)
    .then(async (newChirp) => {
      await user.findOne(
        { username: req.body.username },
        async (err, currentUser) => {
          if (err) {
            console.log(err);
          }
          await currentUser.chrips.push(newChirp._id);
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

app.listen(PORT);
console.log(`Running on ${SERVER}`);
