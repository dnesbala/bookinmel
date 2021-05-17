const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({});

const app = express();

// DATABASE Connection
mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => console.log("Connected to DB successfully"))
  .catch((err) => console.log(err));

// Listening to SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.status(200).send("Homepage");
});
