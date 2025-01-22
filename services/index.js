const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myFirstdb");
app.post("/signup", (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
const port = 5002;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
