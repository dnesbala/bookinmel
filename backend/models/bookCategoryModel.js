const mongoose = require("mongoose");

const Book = require("./bookModel");

const bookCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
      unique: true,
    },
    booksQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtual: true },
  }
);

// Calculate total number of books in the category
bookCategorySchema.pre("save", async function (next) {
  const matchedBooks = await Book.find({ category: this.name });
  this.booksQuantity = matchedBooks.length;
  next();
});

const BookCategory = mongoose.model("BookCategory", bookCategorySchema);

module.exports = BookCategory;
