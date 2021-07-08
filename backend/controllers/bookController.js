const Book = require("../models/bookModel");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");

exports.getAllBooks = catchAsync(async (req, res, next) => {
  let prevPageNumber = 0;
  let pageNumber = 1;
  let nextPageNumber;
  const limitValue = 10;
  let skipValue = 0;

  const bookCount = await Book.countDocuments();
  if (bookCount > limitValue) {
    nextPageNumber = pageNumber + 1;
  }

  if (req.query.page > 1) {
    pageNumber = +req.query.page;
    skipValue = (pageNumber - 1) * limitValue;
    if (skipValue === 0) {
      nextPageNumber = 0;
    }
  }

  const books = await Book.find({}).limit(limitValue).skip(skipValue);

  res.status(200).json({
    status: "success",
    results: books.length,
    ...(prevPageNumber > 0 && {
      prev: `http://127.0.0.1:3000/api/v1/book?page=${prevPageNumber}`,
    }),
    ...(nextPageNumber > 0 && {
      next: `http://127.0.0.1:3000/api/v1/book?page=${nextPageNumber}`,
    }),
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
