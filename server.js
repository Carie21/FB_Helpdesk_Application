const register = require("./routes/register");
const login = require("./routes/login");
const connect = require("./routes/connect");
const continue_ = require("./routes/continue");
const user_page = require("./routes/user_page");
const logout = require("./routes/logout");
const app = require("./sessions").app;
const port = 3000;

const isAuth = (req, res, next) => {
  if (req.session.isAuth === true) {
    next();
  } else {
    res.redirect("/");
  }
};

app.use("/register", register);
app.use("/", login);
app.use("/connect", isAuth, connect);
app.use("/continue", isAuth, continue_);
app.use("/user_page", isAuth, user_page);
app.use("/logout", isAuth, logout);

app.listen(port);
