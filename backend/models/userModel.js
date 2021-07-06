const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User should have a name"],
  },
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "User should have a phone number"],
  },
  password: {
    type: String,
    required: [true, "User should have a password"],
    minLength: [8, "Password should be atleast 8 characters long"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "User should confirm a password"],
    validate: {
      validator: function (value) {
        return this.password == value;
      },
    },
  },
  addressLine1: {
    type: String,
    required: [true, "User should add an address"],
  },
  addressLine2: {
    type: String,
  },
  zipCode: {
    type: Number,
    required: [true, "User should add a ZIP code"],
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "author", "user"],
      message:
        "{VALUE} not supported. Role should be either admin, author or user only",
    },
    default: "user",
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
