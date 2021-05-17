const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A book name is required."],
  },
  price: {
    type: Number,
    required: [true, "A book must have a price."],
    min: 1,
  },
  description: {
    type: String,
    required: [true, "A book must have a description."],
  },
  photo: String,
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  category: String,
  isbn: String,
  author: String,
  publisher: String,
  publishedYear: Date,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
