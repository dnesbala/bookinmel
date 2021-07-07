const Book = require("../models/bookModel");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find({});

  res.status(200).json({
    status: "success",
    results: books.length,
    data: { books },
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newBook,
    },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!book) return next(new AppError("No book found for the given ID.", 404));

  res.status(200).json({
    status: "success",
    data: book,
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) return next(new AppError("No book found for the given ID.", 404));

  res.status(204).json({
    status: "success",
    message: `${book.name} deleted successfully.`,
  });
});

exports.getFeaturedBooks = catchAsync(async (req, res, next) => {
  const featuredBooks = await Book.find({ isFeatured: true }).limit(
    +req.params.count
  );

  if (!featuredBooks) return next(new AppError("Something went wrong.", 400));

  res.status(200).json({
    status: "success",
    results: featuredBooks.length,
    data: {
      books: featuredBooks,
    },
  });
});
