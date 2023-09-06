const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../database").User;

router.get("/", (req, res) => {
  res.render("signup.ejs");
});

router.post("/", (req, res) => {
  User.exists({ email: req.body.email }).then((doc) => {
    if (doc === null) {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      newUser.save();
      res.render("login.ejs");
    } else {
      res.redirect("/");
    }
  });
});
module.exports = router;
