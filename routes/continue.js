const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../database").User;

router.get("/", (req, res) => {
  res.render("continue.ejs");
});

router.post("/", (req, res) => {
  res.render("user_page.ejs");
});

module.exports = router;
