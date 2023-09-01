const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cookieparser = require("cookie-parser");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieparser());
app.use(
  session({
    secret: "Richpanel please hire me :')",
    resave: false,
    saveUninitialized: false,
  })
);
mongoose.connect("mongodb://localhost:27017/userdb", {
  useNewUrlParser: true,
});
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("logged out");
  });
  res.redirect("/");
});
app.post("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/connect");
  } else {
    User.exists({ email: req.body.email }).then((doc) => {
      if (doc === null) {
        res.render("login.ejs");
      } else {
        User.findOne({ email: req.body.email }).then((docs) => {
          if (docs.password === req.body.password) {
            req.session.user = req.body.email;
            res.redirect("/connect");
          } else {
            res.render("login.ejs");
          }
        });
      }
    });
  }
});
app.get("/continue", (req, res) => {
  if (req.session.user) {
    res.render("continue.ejs");
  } else res.redirect("/");
});
app.get("/connect", (req, res) => {
  if (req.session.user) {
    res.render("connect.ejs");
  } else res.redirect("/");
});
app.post("/connect", (req, res) => {
  res.redirect("/continue");
});
app.get("/register", (req, res) => {
  res.render("signup.ejs");
});
app.post("/register", (req, res) => {
  User.exists({ email: req.body.email }).then((doc) => {
    if (doc === null) {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      if (req.body.remember === "on") {
        req.session.user = req.body.email;
      }

      newUser.save();
      res.render("login.ejs");
    } else {
      res.redirect("/");
    }
  });
});

app.listen(port);
