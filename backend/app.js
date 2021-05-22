const express = require("express");
const dotenv = require("dotenv");

const bookRoutes = require("../backend/routes/bookRoutes");
const errorController = require("../backend/controllers/errorController");

dotenv.config({});

const app = express();

app.use("/api/v1/books", bookRoutes);

// Global error handling middleware
app.use(errorController);

module.exports = app;
