const express = require("express");
const router = express.Router();
const continue_ = require("./continue");
const User = require("../database").User;
const app = require("../sessions").session;
router.get("/", (req, res) => {
  res.render("connect.ejs");
});
router.post("/", (req, res) => {
  res.redirect("/continue");
});

module.exports = router;
