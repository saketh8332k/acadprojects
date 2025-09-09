var express = require("express");
const cors = require("cors");
require("dotenv").config();
const User =require("./model")
//use the express
var app = express();
const PORT = process.env.PORT||8000;

const connectDB = require("./connectDB");

connectDB();
app.use(express.json());

app.use(
  cors({
    // Allow requests from multiple origins, including your GitHub Pages site
    origin:"*",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"], // Methods you want to allow
    allowedHeaders: ["Content-Type", "Authorization"], // Headers to allow
    credentials: true, // If you want to allow cookies/credentials
  })
);

//Database connection Establishment

//writing registration page route to push the data
// Register endpoint (no changes here)
app.post("/register", async (req, res) => {
    const {
      username,
      password,
      confirmPassword,
      email
    } = req.body;
  
    if (!username || !password || !confirmPassword || !email) {
      return res.status(422).json({ error: "Please fill the fields properly!!!" });
    }
  
    try {
      const userExist = await User.findOne({ username });
      if (userExist) {
        return res.status(422).json({ error: "Username Already Exists!!!" });
      }
  
      const newUser = new User({
        username,
        password,
        confirmPassword,
        email
      });
  
      await newUser.save();
      res.status(201).json({ message: "User Registered Successfully..." });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "An error occurred while processing your request..." });
    }
  });
  
  // Login endpoint (updated to use email)
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(422).json({ error: "Please provide both email and password!" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "No record exists for this email..." });
      }
  
      if (user.password === password) {
        res.status(200).json({ message: "Login Successfully"});
      } else {
        res.status(401).json({ error: "Password is incorrect..." });
      }
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "An error occurred while processing your request..." });
    }
  });
  //Server Connection Establishment
app.listen(PORT, (error) => {
  if (error) {
    console.log("Failed to connect server");
  } else {
    console.log(`Server started and Server running on ${PORT}`);
  }
});