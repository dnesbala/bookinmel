const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User should have a name"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "User should have a phone number"],
      unique: true,
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
      type: String,
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
