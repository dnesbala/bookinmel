const express = require("express");
const bookCategoryController = require("../controllers/bookCategoryController");

const router = express.Router();

router
  .route("/")
  .get(bookCategoryController.getBookCategory)
  .post(bookCategoryController.createBookCategory);

module.exports = router;
