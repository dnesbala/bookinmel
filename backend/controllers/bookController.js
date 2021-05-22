const Book = require("../models/bookModel");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find({});

  // res.status(200).json({
  //   status: "success",
  //   results: books.length,
  //   data: { books },
  // });

  // Testing Error
  return next(new AppError("Custom Error", 400));
});
