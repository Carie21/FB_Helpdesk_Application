const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoDBStore = require("connect-mongodb-session")(session);

var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/my_db",
  collection: "mySessions",
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "Hello world!')",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

module.exports.app = app;
module.exports.session = session;
