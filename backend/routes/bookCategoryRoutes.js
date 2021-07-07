const express = require("express");
const bookCategoryController = require("../controllers/bookCategoryController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(bookCategoryController.getBookCategory)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    bookCategoryController.createBookCategory
  );

router.use(authController.protect, authController.restrictTo("admin"));

router
  .route("/:id")
  .patch(bookCategoryController.updateBookCategory)
  .delete(bookCategoryController.deleteBookCategory);

module.exports = router;
