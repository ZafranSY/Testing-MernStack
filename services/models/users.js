const mongoose = require("mongoose");
//login schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("users", UserSchema);
module.exports = userModel;
