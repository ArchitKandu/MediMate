const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is Called!");
});

const server = app.listen(5000, console.log("Server Started on PORT 5000!"));
