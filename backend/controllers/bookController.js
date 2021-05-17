const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  const books = await Book.find({});

  res.status(200).json({
    status: "success",
    results: books.length,
    data: { books },
  });
};
