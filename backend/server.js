const express = require("express");
const dotenv = require("dotenv");

dotenv.config({});

const app = express();

// Listening to SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.status(200).send("Homepage");
});
