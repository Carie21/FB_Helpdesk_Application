const express = require("express");
const router = express.Router();
const User = require("../database").User;
const app = require("../sessions").session;
router.get("/", (req, res) => {
  res.render("connect.ejs");
});
router.post("/", (req, res) => {
  res.render("continue.ejs");
});

module.exports = router;
