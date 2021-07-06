const mongoose = require("mongoose");

const bookCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required."],
    unique: true,
  },
});

const BookCategory = mongoose.model("BookCategory", bookCategorySchema);

module.exports = BookCategory;
