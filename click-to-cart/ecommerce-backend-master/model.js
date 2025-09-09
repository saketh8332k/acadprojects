const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'Passwords do not match'
    }
  }
}, { timestamps: true });

// Remove confirmPassword before saving the user document
userSchema.pre('save', function(next) {
  this.confirmPassword = undefined;
  next();
});

// Create User model based on schema
const Client = mongoose.model("Client", userSchema);

module.exports = Client;
