const register = require("./routes/register");
const login = require("./routes/login");
const connect = require("./routes/connect");
const continue_ = require("./routes/continue");
const user_page = require("./routes/user_page");
const app = require("./sessions").app;
const port = 3000;

app.use("/register", register);
app.use("/", login);
app.use("/connect", connect);
app.use("/continue", continue_);
app.use("/user_page", user_page);

app.listen(port);
