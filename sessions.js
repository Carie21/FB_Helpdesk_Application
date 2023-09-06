const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "Richpanel please hire me :')",
    resave: false,
    saveUninitialized: false,
  })
);

module.exports.app = app;
module.exports.session = session;
