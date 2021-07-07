const express = require("express");
const bookController = require("../controllers/bookController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    bookController.createBook
  );

router.get("/featured/:count", bookController.getFeaturedBooks);

router.use(authController.protect, authController.restrictTo("admin"));

router
  .route("/:id")
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
