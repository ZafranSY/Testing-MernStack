const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myFirstdb");
//api for signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }
    
    const user = await userModel.create({ name, email, password });
    res.status(201).json("success");
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//api for login
app.post("/login", async (req, res) => {
  //   const chech = userModel.findOne({ email: req.body.email });
  //   if (!checl) console.log("username not found");
  const { email, password } = req.body;
  userModel.findOne({ email, password }).then((user) => {
    if (user) {
      if (user.password == password) {
        res.json("success");
      } else {
        res.json("the password or email is incorrect!");
      }
    } else {
      res.json("no acconnt existed");
    }
  });
});
const port = 5002;
app.listen(port, () => {
  console.log(`server running on port  ${port}`);
});
app.use(cors({ origin: "http://localhost:5173" })); // Adjust port as needed
