const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/userdb", {
  useNewUrlParser: true,
});
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = new mongoose.model("User", userSchema);
module.exports.User = User;
