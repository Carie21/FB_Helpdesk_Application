const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../database").User;

router.get("/", (req, res) => {
  res.render("login.ejs");
});

router.post("/", (req, res) => {
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
module.exports = router;
