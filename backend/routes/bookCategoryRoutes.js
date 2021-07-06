const express = require("express");
const bookCategoryController = require("../controllers/bookCategoryController");

const router = express.Router();

router
  .route("/")
  .get(bookCategoryController.getBookCategory)
  .post(bookCategoryController.createBookCategory);

router
  .route("/:id")
  .patch(bookCategoryController.updateBookCategory)
  .delete(bookCategoryController.deleteBookCategory);

module.exports = router;
