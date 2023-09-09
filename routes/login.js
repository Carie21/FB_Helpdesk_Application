const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../database").User;
const session = require("../sessions").session;

router.get("/", (req, res) => {
  if (req.session.remember) {
    res.redirect("/connect");
  } else {
    console.log(req.session.id, " ", req.session);
    res.render("login.ejs");
  }
});

router.post("/", (req, res) => {
  User.exists({ email: req.body.email }).then((doc) => {
    if (doc === null) {
      res.render("login.ejs");
    } else {
      User.findOne({ email: req.body.email }).then((docs) => {
        if (docs.password === req.body.password) {
          req.session.user = req.body.email;
          if (req.body.remember == "ok") {
            req.session.remember = true;
          } else {
            req.session.remember = false;
          }
          req.session.isAuth = true;
          req.session.email = req.body.email;
          console.log(req.session.email);
          res.redirect("/connect");
        } else {
          res.redirect("/");
        }
      });
    }
  });
});
module.exports = router;
