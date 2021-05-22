const express = require("express");
const dotenv = require("dotenv");

const bookRoutes = require("../backend/routes/bookRoutes");
const errorController = require("../backend/controllers/errorController");

dotenv.config({});

const app = express();

app.use("/api/v1/books", bookRoutes);

app.all("*", (req, res, next) => {
  res.status(401).json({
    status: "fail",
    message: `URL NOT FOUND: ${req.protocol}://${req.get("host")}${req.url}`,
  });
  next();
});

// Global error handling middleware
app.use(errorController);

module.exports = app;
