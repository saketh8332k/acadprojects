const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect to MongoDB successfully");
  } catch (error) {
    console.log("Connection failed");
  }
};
module.exports = connectDB;