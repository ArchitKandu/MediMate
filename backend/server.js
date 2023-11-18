const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is Called!");
});

app.use("/api/user", userRoutes);
// app.use("/api/medicine", medicineRoutes);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(5000, console.log("Server Started on PORT 5000!"));
