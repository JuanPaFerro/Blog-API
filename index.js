const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to mongo"))
  .catch((err) => console.log(error));

app.use("/", (req, res) => {
  console.log("hey");
});

app.listen("5000", () => {
  console.log("running the api");
});
