const BookCategory = require("../models/bookCategoryModel");
const catchAsync = require("../utils/catchAsync");

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
