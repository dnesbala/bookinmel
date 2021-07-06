const express = require("express");
const dotenv = require("dotenv");

const bookRoutes = require("../backend/routes/bookRoutes");
const bookCategoryRoutes = require("../backend/routes/bookCategoryRoutes");
const userRoutes = require("../backend/routes/userRoutes");
const errorController = require("../backend/controllers/errorController");

dotenv.config({});

const app = express();

app.use(express.json());

app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/bookCategory", bookCategoryRoutes);
app.use("/api/v1/user", userRoutes);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `URL NOT FOUND: ${req.protocol}://${req.get("host")}${req.url}`,
  });
  next();
});

// Global error handling middleware
app.use(errorController);

module.exports = app;
