const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.register = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    password,
    passwordConfirm,
    addressLine1,
    addressLine2,
    zipCode,
  } = req.body;

  const user = await User.create({
    name,
    email,
    phone,
    password,
    passwordConfirm,
    addressLine1,
    addressLine2,
    zipCode,
  });

  if (!user) return next(new AppError("Registration failed.", 400));

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.status(200).json({
    status: "success",
    token,
    data: user,
  });
});
