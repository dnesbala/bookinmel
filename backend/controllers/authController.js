const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const sendToken = (user, res, statusCode) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  const cookieOptions = {
    expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

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

  sendToken(user, res, 201);
});

exports.login = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password)
    return next(new AppError("Phone and password should be provided.", 400));

  const user = await User.findOne({ phone });

  if (!user) return next(new AppError("User doesnot exist.", 400));

  if (!(await user.correctPassword(password, user.password)))
    return next(new AppError("Either phone or password is incorrect.", 400));

  sendToken(user, res, 200);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return next(
      new AppError("You are not logged in. Please log in again.", 401)
    );
  const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedPayload.id);
  if (!user)
    return next(
      new AppError(
        "The user belonging to the token no longer exists. Please log in again.",
        401
      )
    );

  req.user = user;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    console.log(...roles);
    if (!roles.includes(req.user.role))
      return next(
        new AppError(
          "You donot have permission to perform this operation.",
          403
        )
      );
    next();
  };
