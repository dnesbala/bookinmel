const BookCategory = require("../models/bookCategoryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getBookCategory = catchAsync(async (req, res, next) => {
  const bookCategories = await BookCategory.find();

  res.status(200).json({
    status: "success",
    results: bookCategories.length,
    data: { bookCategories },
  });
});

exports.createBookCategory = catchAsync(async (req, res, next) => {
  const newCategory = await BookCategory.create(req.body);

  res.status(201).json({
    status: "success",
    data: { data: newCategory },
  });
});

exports.updateBookCategory = catchAsync(async (req, res, next) => {
  const newCategory = await BookCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!newCategory)
    return next(new AppError("No book category found for the given ID.", 404));

  res.status(201).json({
    status: "success",
    data: newCategory,
  });
});

exports.deleteBookCategory = catchAsync(async (req, res, next) => {
  const bookCategory = await BookCategory.findByIdAndDelete(req.params.id);

  if (!bookCategory)
    return next(new AppError("No book category found for the given ID.", 404));

  res.status(204).json({
    status: "success",
    data: `${bookCategory.name} deleted successfully.`,
  });
});
