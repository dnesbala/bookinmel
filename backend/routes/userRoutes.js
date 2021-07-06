const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
